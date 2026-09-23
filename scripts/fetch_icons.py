"""Download all carousel icons used by app.js."""
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "icons"
OUT.mkdir(parents=True, exist_ok=True)

app = (ROOT / "app.js").read_text(encoding="utf-8")
# p(..., "logo", ...) - 6th string arg after score/tint pattern is fragile;
# grab logo filenames from constructed paths and from the 6th quoted token in p(...)
logos = set(re.findall(r'logo: `./assets/icons/([^`]+)\.png`', app))
# also from p("id", "NAME", "TICKER", N, "#hex", "logo",
logos |= set(
    re.findall(
        r'p\(\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*"[^"]+"\s*,\s*\d+\s*,\s*"[^"]+"\s*,\s*"([^"]+)"',
        app,
    )
)

# cryptocurrency-icons aliases
ALIASES = {
    "matic": "matic",
    "pol": "matic",
    "1inch": "1inch",
    "ldo": "ldo",
    "icp": "icp",
    "ton": "ton",
    "hbar": "hbar",
    "imx": "imx",
    "fet": "fet",
    "ape": "ape",
    "ens": "ens",
    "gala": "gala",
    "pepe": "pepe",
    "shib": "shib",
}

BASES = [
    "https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/128/color/{}.png",
    "https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/{}.png",
]

ok, fail = [], []
for logo in sorted(logos):
    dest = OUT / f"{logo}.png"
    key = ALIASES.get(logo, logo)
    got = False
    for base in BASES:
        url = base.format(key)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            data = urllib.request.urlopen(req, timeout=20).read()
            if len(data) > 200 and data[:8] != b"<!DOCTYP" and data[:1] != b"<":
                dest.write_bytes(data)
                ok.append(logo)
                got = True
                break
        except Exception:
            continue
    if not got:
        fail.append(logo)

# ensure pol mirrors matic
matic = OUT / "matic.png"
if matic.exists():
    (OUT / "pol.png").write_bytes(matic.read_bytes())

print("ok", len(ok), "fail", fail, "total files", len(list(OUT.glob("*.png"))))
