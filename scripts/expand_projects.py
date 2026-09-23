# -*- coding: utf-8 -*-
"""Build data/projects.json + icons from CoinGecko (top + trending)."""
from __future__ import annotations

import hashlib
import json
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_JSON = ROOT / "data" / "projects.json"
ICON_DIR = ROOT / "assets" / "icons"
ICON_DIR.mkdir(parents=True, exist_ok=True)

UA = {"User-Agent": "EVALUATOR/1.0 (evaluator.watch)"}


def get(url: str):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=40) as r:
        return json.loads(r.read().decode("utf-8"))


def download_icon(coin_id: str, image_url: str, symbol: str) -> str:
    """Save icon as {symbol}.png; return logo key (filename without .png)."""
    key = symbol.lower().replace(" ", "")
    # avoid collisions for weird symbols
    dest = ICON_DIR / f"{key}.png"
    if dest.exists() and dest.stat().st_size > 200:
        return key
    try:
        req = urllib.request.Request(image_url, headers=UA)
        data = urllib.request.urlopen(req, timeout=30).read()
        if len(data) > 200 and not data[:20].lstrip().startswith(b"<"):
            dest.write_bytes(data)
            return key
    except Exception:
        pass
    # tiny SVG placeholder as PNG-less fallback: write 1x1 and use tint letter in UI
    return key


def tint_for(symbol: str) -> str:
    h = hashlib.md5(symbol.encode()).hexdigest()
    r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
    # keep readable mid tones
    r = 40 + r % 180
    g = 40 + g % 180
    b = 40 + b % 180
    return f"#{r:02X}{g:02X}{b:02X}"


def score_bundle(rank: int, is_new: bool, mcap: float | None):
    # base by market-cap rank
    if rank <= 5:
        base = 92
    elif rank <= 15:
        base = 88
    elif rank <= 40:
        base = 82
    elif rank <= 80:
        base = 76
    elif rank <= 150:
        base = 68
    elif rank <= 250:
        base = 60
    else:
        base = 54

    if is_new:
        base = min(base, 72)
        stability = max(42, base - 18)
        robustness = max(45, base - 12)
        flags = ["short sample"]
        if base >= 65:
            flags.append("high IC, unstable sign")
    else:
        stability = min(96, base + (4 if rank <= 20 else -2))
        robustness = min(95, base + (2 if rank <= 30 else -1))
        flags = []

    predictive = min(96, base + (3 if rank <= 10 else 0))
    logic = min(93, base + (1 if rank <= 50 else -3))
    diversity = max(50, min(88, 90 - rank // 8))

    # meme-ish penalty by symbol heuristics later in curated
    composite = int(
        round(
            predictive * 0.37
            + stability * 0.23
            + robustness * 0.18
            + logic * 0.12
            + diversity * 0.10
        )
    )
    composite = max(40, min(96, composite))

    years = {}
    if not is_new and rank <= 200:
        years = {
            "2022": round((predictive - 70) / 300, 2) if rank <= 100 else None,
            "2023": round((predictive - 55) / 400, 2),
            "2024": round((predictive - 45) / 450, 2),
            "2025": round((predictive - 50) / 420, 2),
        }
    else:
        years = {
            "2022": None,
            "2023": None,
            "2024": round((predictive - 40) / 500, 2),
            "2025": round((predictive - 35) / 480, 2),
        }

    ic = []
    for period, val in years.items():
        if val is None:
            continue
        ic.append({"period": period, "ic": val, "rank": round(val * 0.9, 2)})

    return composite, {
        "predictive": predictive,
        "stability": stability,
        "robustness": robustness,
        "logic": logic,
        "diversity": diversity,
    }, flags, ic


def blurb_for(name: str, rank: int, is_new: bool, cat_hint: str) -> str:
    if is_new:
        return f"Newer listing. Short holdout sample - size with caution. ({cat_hint})"
    if rank <= 10:
        return f"Top-tier liquidity. Core market reference. ({cat_hint})"
    if rank <= 50:
        return f"Liquid mid-major. Watch cycle beta vs peers. ({cat_hint})"
    if rank <= 150:
        return f"Tradeable name. Depth thinner than majors. ({cat_hint})"
    return f"Smaller / newer cap. Noise dominates until sample grows. ({cat_hint})"


def main() -> None:
    markets = []
    for page in (1, 2, 3):
        url = (
            "https://api.coingecko.com/api/v3/coins/markets"
            f"?vs_currency=usd&order=market_cap_desc&per_page=100&page={page}"
            "&sparkline=false&price_change_percentage=24h"
        )
        chunk = get(url)
        markets.extend(chunk)
        time.sleep(1.2)

    trending_ids = set()
    try:
        tr = get("https://api.coingecko.com/api/v3/search/trending")
        for item in tr.get("coins", []):
            c = item.get("item", {})
            if c.get("id"):
                trending_ids.add(c["id"])
        time.sleep(1.0)
    except Exception as e:
        print("trending skip", e)

    # recently added (newer names)
    try:
        recent = get(
            "https://api.coingecko.com/api/v3/coins/list/new"
        )
        # API may be list of {id,symbol,name,activated_at}
        if isinstance(recent, list):
            for c in recent[:40]:
                if c.get("id"):
                    trending_ids.add(c["id"])
        time.sleep(1.0)
    except Exception as e:
        print("new list skip", e)

    seen = set()
    projects = []
    for i, m in enumerate(markets, start=1):
        cid = m["id"]
        if cid in seen:
            continue
        seen.add(cid)
        sym = (m.get("symbol") or "").upper()
        name = (m.get("name") or sym).upper()
        is_new = cid in trending_ids and i > 80
        logo = download_icon(cid, m.get("image") or "", sym)
        time.sleep(0.05)
        score, dims, flags, ic = score_bundle(i, is_new or cid in trending_ids and i > 50, m.get("market_cap"))
        if cid in trending_ids and "short sample" not in flags and i > 40:
            flags = flags + ["narrative velocity"]

        projects.append(
            {
                "id": cid,
                "name": name,
                "ticker": sym,
                "score": score,
                "tint": tint_for(sym),
                "logo": logo,
                "blurb": blurb_for(name, i, is_new, "mcap rank " + str(i)),
                "dims": dims,
                "flags": flags,
                "ic": ic,
                "featured": i <= 3,
                "rank": i,
                "source": "coingecko",
                "trending": cid in trending_ids,
            }
        )

    # ensure trending coins not in top 300 still appear
    missing_tr = [t for t in trending_ids if t not in seen]
    for cid in missing_tr[:25]:
        try:
            time.sleep(1.1)
            detail = get(
                f"https://api.coingecko.com/api/v3/coins/{cid}"
                "?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false"
            )
            sym = (detail.get("symbol") or "").upper()
            name = (detail.get("name") or sym).upper()
            img = (detail.get("image") or {}).get("large") or (detail.get("image") or {}).get("small") or ""
            logo = download_icon(cid, img, sym)
            score, dims, flags, ic = score_bundle(220, True, None)
            flags = list(dict.fromkeys(flags + ["trending", "short sample"]))
            projects.append(
                {
                    "id": cid,
                    "name": name,
                    "ticker": sym,
                    "score": score,
                    "tint": tint_for(sym),
                    "logo": logo,
                    "blurb": blurb_for(name, 220, True, "trending / new"),
                    "dims": dims,
                    "flags": flags,
                    "ic": ic,
                    "featured": False,
                    "rank": 900,
                    "source": "coingecko",
                    "trending": True,
                }
            )
            seen.add(cid)
        except Exception as e:
            print("skip trending", cid, e)

    projects.sort(key=lambda x: (x.get("rank") or 9999))
    OUT_JSON.write_text(json.dumps({"updatedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "projects": projects}, ensure_ascii=True, indent=2), encoding="utf-8")
    print("wrote", OUT_JSON, "n=", len(projects), "icons=", len(list(ICON_DIR.glob('*.png'))) )


if __name__ == "__main__":
    main()
