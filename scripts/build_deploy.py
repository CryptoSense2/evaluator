# -*- coding: utf-8 -*-
"""Build deploy/ folder + evaluator-watch.zip for the server."""
from __future__ import annotations

import re
import shutil
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEPLOY = ROOT / "deploy"


def main() -> None:
    if DEPLOY.exists():
        shutil.rmtree(DEPLOY)
    DEPLOY.mkdir()

    for name in [
        "index.html",
        "hot.html",
        "styles.css",
        "app.js",
        "hot.js",
        "theme.js",
        "cursor.js",
    ]:
        shutil.copy2(ROOT / name, DEPLOY / name)

    (DEPLOY / "data").mkdir()
    shutil.copy2(ROOT / "data" / "hot-projects.json", DEPLOY / "data" / "hot-projects.json")

    (DEPLOY / "assets" / "icons").mkdir(parents=True)
    for name in [
        "logo.png",
        "logo.jpg",
        "evaluator-wordmark.png",
        "evaluator-wordmark-dark.png",
    ]:
        shutil.copy2(ROOT / "assets" / name, DEPLOY / "assets" / name)
    for ic in (ROOT / "assets" / "icons").glob("*.png"):
        shutil.copy2(ic, DEPLOY / "assets" / "icons" / ic.name)

    for name in ("index.html", "hot.html"):
        p = DEPLOY / name
        t = p.read_text(encoding="utf-8")
        t = re.sub(r"styles\.css\?v=[^\"]+", "styles.css", t)
        t = re.sub(r"cursor\.js\?v=[^\"]+", "cursor.js", t)
        p.write_text(t, encoding="utf-8", newline="\n")

    (DEPLOY / "UPLOAD.txt").write_text(
        "Upload ALL files from this folder to the web root of evaluator.watch\n"
        "Keep assets/ and data/ next to index.html\n"
        "On server also run: sudo nginx -t && sudo systemctl reload nginx\n"
        "Optional charset: add 'charset utf-8;' inside the server {} block\n",
        encoding="utf-8",
        newline="\n",
    )

    zip_path = DEPLOY / "evaluator-watch.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for p in DEPLOY.rglob("*"):
            if not p.is_file() or p.name == "evaluator-watch.zip":
                continue
            zf.write(p, p.relative_to(DEPLOY).as_posix())

    for name in ("index.html", "hot.html", "app.js", "hot.js"):
        t = (DEPLOY / name).read_text(encoding="utf-8")
        issues = []
        if "â" in t or "Â" in t:
            issues.append("mojibake")
        if any(ord(c) in (0x2190, 0x2192, 0x2039, 0x203A, 0x00B7) for c in t):
            issues.append("unicode-arrows")
        print(name, "OK" if not issues else issues)

    print("zip", zip_path, zip_path.stat().st_size)


if __name__ == "__main__":
    main()
