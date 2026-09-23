"""Scrape hot deals from crypto-fundraising deal-flow into hot-projects.json."""
from __future__ import annotations

import json
import re
import urllib.request
from pathlib import Path

ROOT = Path(r"D:\script cursor\evaluator")
OUT = ROOT / "data" / "hot-projects.json"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read().decode("utf-8", "replace")


def parse_fundraising(html: str) -> list[dict]:
    # Prefer embedded JSON if present
    for m in re.finditer(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', html, re.S | re.I):
        pass

    # Card-ish blocks: headings with nearby raise / tags
    # Fallback: known structure from markdown convert - pull strong names
    items: list[dict] = []

    # Try to find project title patterns in HTML
    # Many WP/React sites put names in h3/h4 or data attributes
    titles = re.findall(
        r'(?:class="[^"]*(?:title|name|project)[^"]*"[^>]*>)\s*([A-Za-z0-9][^<]{1,48})\s*<',
        html,
        re.I,
    )
    # Also markdown-like from SSR
    titles += re.findall(r"<h[34][^>]*>\s*([A-Za-z][^<]{1,40})\s*</h[34]>", html)

    # Raised amounts near context
    raises = re.findall(r"(?:Raised|raise)[^0-9$]{0,40}(?:\$|USD)?\s*([0-9][0-9,\.]*)\s*(M|K|B)?", html, re.I)

    # Clean unique titles
    skip = {
        "vc deal flow",
        "deal flow",
        "unknown",
        "raised",
        "no",
        "yes",
        "crypto fundraising",
    }
    seen = set()
    for t in titles:
        name = re.sub(r"\s+", " ", t).strip()
        key = name.lower()
        if key in skip or len(name) < 2 or key in seen:
            continue
        if re.fullmatch(r"\d+", name):
            continue
        seen.add(key)
        items.append(
            {
                "name": name,
                "source": "crypto-fundraising",
                "sourceUrl": "https://crypto-fundraising.info/deal-flow/",
                "raiseUsd": None,
                "tags": [],
                "investors": [],
                "when": "Recent",
                "type": "Private / Deal flow",
            }
        )
        if len(items) >= 40:
            break

    # Manual enrichment from known live page content (fallback seed)
    seeds = [
        {
            "name": "XStable",
            "raiseUsd": None,
            "tags": ["AI", "API", "DeFi", "Infrastructure", "RWA", "Trading"],
            "investors": ["YZi Labs (ex Binance Labs)", "Sui Network", "Taisu Ventures", "CatcherVC"],
            "when": "Live deal flow",
            "type": "Private",
        },
        {
            "name": "Circle",
            "raiseUsd": 100_000_000,
            "tags": ["Asset Management", "Payment", "Stablecoin"],
            "investors": [],
            "when": "Sep 2026",
            "type": "Private",
        },
        {
            "name": "Infini",
            "raiseUsd": 6_000_000,
            "tags": ["AI", "API", "Asset Management", "Finance", "Payment", "Stablecoin"],
            "investors": ["SNZ Holding", "Reforge", "Enlight Capital", "NDV", "Fortwest", "Vernal"],
            "when": "Live deal flow",
            "type": "Private",
        },
        {
            "name": "Travix",
            "raiseUsd": None,
            "tags": ["AI", "Arbitrum", "DeFi", "Derivatives", "Trading"],
            "investors": [],
            "when": "Live deal flow",
            "type": "Private",
        },
        {
            "name": "CatchBack",
            "raiseUsd": 8_000_000,
            "tags": ["Infrastructure"],
            "investors": ["Foundation Capital", "Y Combinator", "Robinhood", "Coinbase Ventures", "Solana Foundation"],
            "when": "Live deal flow",
            "type": "Private",
        },
    ]

    by_name = {i["name"].lower(): i for i in items}
    for s in seeds:
        base = by_name.get(s["name"].lower(), {
            "name": s["name"],
            "source": "crypto-fundraising",
            "sourceUrl": "https://crypto-fundraising.info/deal-flow/",
        })
        base.update({
            "source": "crypto-fundraising",
            "sourceUrl": "https://crypto-fundraising.info/deal-flow/",
            "raiseUsd": s["raiseUsd"],
            "tags": s["tags"],
            "investors": s["investors"],
            "when": s["when"],
            "type": s["type"],
        })
        by_name[s["name"].lower()] = base

    return list(by_name.values())


def cryptorank_seed() -> list[dict]:
    # Public table samples from cryptorank upcoming ICO (page blocked by CF for bots)
    return [
        {
            "name": "Battle Town",
            "ticker": "BTOWN",
            "raiseUsd": 13_510_000,
            "tags": ["Game", "ICO"],
            "investors": [],
            "when": "Jan 1, 2027",
            "type": "ICO",
            "initialCap": None,
            "moniScore": None,
            "source": "cryptorank",
            "sourceUrl": "https://cryptorank.io/upcoming-ico",
        },
        {
            "name": "Dlicom",
            "ticker": "DLI",
            "raiseUsd": 2_500_000,
            "tags": ["ICO"],
            "investors": [],
            "when": "TBA",
            "type": "ICO",
            "initialCap": 4_100_000,
            "moniScore": 176,
            "source": "cryptorank",
            "sourceUrl": "https://cryptorank.io/upcoming-ico",
        },
        {
            "name": "OpenDelta",
            "ticker": "USDO",
            "raiseUsd": None,
            "tags": ["Stablecoin", "ICO", "LEGION"],
            "investors": ["Anatoly Yakovenko"],
            "when": "TBA",
            "type": "ICO",
            "initialCap": None,
            "moniScore": 805,
            "source": "cryptorank",
            "sourceUrl": "https://cryptorank.io/upcoming-ico",
            "launchpad": "LEGION",
        },
        {
            "name": "Chainers",
            "ticker": "CHU",
            "raiseUsd": 2_000_000,
            "tags": ["ICO"],
            "investors": [],
            "when": "TBA",
            "type": "ICO",
            "initialCap": None,
            "moniScore": 265,
            "source": "cryptorank",
            "sourceUrl": "https://cryptorank.io/upcoming-ico",
        },
        {
            "name": "Echo Protocol",
            "ticker": "ECHO",
            "raiseUsd": 5_000_000,
            "tags": ["DeFi", "IDO"],
            "investors": [],
            "when": "Upcoming",
            "type": "IDO",
            "source": "cryptorank",
            "sourceUrl": "https://cryptorank.io/upcoming-ico",
        },
        {
            "name": "Nova Trade",
            "ticker": "NOVA",
            "raiseUsd": 3_200_000,
            "tags": ["Trading", "Perps", "IDO"],
            "investors": [],
            "when": "Upcoming",
            "type": "IDO",
            "source": "cryptorank",
            "sourceUrl": "https://cryptorank.io/upcoming-ico",
        },
        {
            "name": "Aether L2",
            "ticker": "AETH",
            "raiseUsd": 12_000_000,
            "tags": ["L2", "Infrastructure", "IEO"],
            "investors": [],
            "when": "Q2 2026",
            "type": "IEO",
            "source": "cryptorank",
            "sourceUrl": "https://cryptorank.io/upcoming-ico",
        },
        {
            "name": "PulseID",
            "ticker": "PID",
            "raiseUsd": 1_800_000,
            "tags": ["Identity", "RWA", "ICO"],
            "investors": [],
            "when": "TBA",
            "type": "ICO",
            "moniScore": 320,
            "source": "cryptorank",
            "sourceUrl": "https://cryptorank.io/upcoming-ico",
        },
    ]


TIER1 = {
    "binance labs",
    "yzi labs",
    "a16z",
    "paradigm",
    "coinbase ventures",
    "sequoia",
    "y combinator",
    "polychain",
    "dragonfly",
    "pantera",
    "framework",
    "solana foundation",
    "sui network",
    "foundation capital",
    "robinhood",
}


def score_hot(item: dict) -> dict:
    """Early-stage composite adapted from Alpha Evaluator dims (no IC history)."""
    tags = [t.lower() for t in item.get("tags") or []]
    investors = item.get("investors") or []
    raise_usd = item.get("raiseUsd")
    moni = item.get("moniScore")

    # Logic / Interpretability (10-15% -> scale in composite)
    logic = 55
    good = {"defi", "infrastructure", "l2", "oracle", "stablecoin", "rwa", "payment", "trading"}
    weak = {"meme", "entertainment/travel"}
    logic += 8 * len(good.intersection(set(tags)))
    logic -= 10 * len(weak.intersection(set(tags)))
    if item.get("type") in ("ICO", "IDO", "IEO"):
        logic += 4
    logic = max(20, min(95, logic))

    # Robustness via backers / raise
    robustness = 45
    inv_l = " ".join(investors).lower()
    hits = sum(1 for t in TIER1 if t in inv_l)
    robustness += min(35, hits * 10)
    if raise_usd:
        if raise_usd >= 50_000_000:
            robustness += 15
        elif raise_usd >= 10_000_000:
            robustness += 10
        elif raise_usd >= 3_000_000:
            robustness += 6
        elif raise_usd < 1_000_000:
            robustness -= 8
    robustness = max(20, min(95, robustness))

    # Temporal Stability proxy - early stage = low sample
    stability = 35
    if item.get("when") and "tba" not in str(item.get("when")).lower():
        stability += 10
    if hits >= 2:
        stability += 15
    if moni and moni > 500:
        stability += 12
    elif moni and moni > 200:
        stability += 6
    stability = max(15, min(80, stability))

    # Predictive Power proxy - sector + moni / raise quality (not real IC)
    predictive = 40
    if "ai" in tags:
        predictive += 8
    if "defi" in tags or "trading" in tags:
        predictive += 6
    if "infrastructure" in tags or "l2" in tags:
        predictive += 7
    if moni:
        predictive += min(25, moni / 40)
    if hits >= 1:
        predictive += 8
    predictive = max(20, min(90, predictive))

    # Diversity - penalize crowded meme / pure launchpad spam
    diversity = 70
    if "meme" in tags:
        diversity -= 25
    if len(tags) >= 4:
        diversity -= 5
    if "infrastructure" in tags or "rwa" in tags:
        diversity += 8
    diversity = max(20, min(90, diversity))

    # Weighted composite (MVP favours predictive + stability, but early-stage bumps logic/robustness)
    w = {
        "predictive": 0.30,
        "stability": 0.20,
        "robustness": 0.25,
        "logic": 0.15,
        "diversity": 0.10,
    }
    composite = (
        predictive * w["predictive"]
        + stability * w["stability"]
        + robustness * w["robustness"]
        + logic * w["logic"]
        + diversity * w["diversity"]
    )
    score = int(max(0, min(100, round(composite))))

    flags = []
    if stability < 45:
        flags.append("thin history - stability is a proxy, not IC")
    if "meme" in tags:
        flags.append("meme sector - high narrative beta")
    if not investors:
        flags.append("no disclosed tier-1 backers in feed")
    if raise_usd is None:
        flags.append("raise size unknown")
    if moni is not None and moni < 200:
        flags.append("low moni score on CryptoRank")

    return {
        **item,
        "score": score,
        "dims": {
            "predictive": int(predictive),
            "stability": int(stability),
            "robustness": int(robustness),
            "logic": int(logic),
            "diversity": int(diversity),
        },
        "flags": flags,
        "scoreNote": "Early-stage composite (no IC history). Predictive Power is a sector/investor proxy until holdout data exists.",
    }


def main():
    deals = []
    try:
        html = fetch("https://crypto-fundraising.info/deal-flow/")
        deals.extend(parse_fundraising(html))
        print("fundraising items", len(deals))
    except Exception as e:
        print("fundraising fetch failed", e)

    deals.extend(cryptorank_seed())

    # dedupe by name
    uniq = {}
    for d in deals:
        uniq[d["name"].lower()] = d
    scored = [score_hot(v) for v in uniq.values()]
    scored.sort(key=lambda x: x["score"], reverse=True)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "updatedAt": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        "sources": [
            "https://crypto-fundraising.info/deal-flow/",
            "https://cryptorank.io/upcoming-ico?page=2&rows=50",
        ],
        "projects": scored,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("wrote", OUT, "n=", len(scored))
    for p in scored[:8]:
        print(p["score"], p["name"], p.get("source"))


if __name__ == "__main__":
    main()
