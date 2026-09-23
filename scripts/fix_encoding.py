# -*- coding: utf-8 -*-
"""Replace fancy Unicode with ASCII across the evaluator tree."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REPL = {
    "\u2190": "<-",
    "\u2192": "->",
    "\u2039": "<",
    "\u203a": ">",
    "\u00b7": " | ",
    "\u2014": "-",
    "\u2013": "-",
    "\u2018": "'",
    "\u2019": "'",
    "\u201c": '"',
    "\u201d": '"',
    "\u2026": "...",
}

MOJI = {
    " | ": " | ",
    "->": "->",
    "->": "->",
    "<": "<",
    ">": ">",
    "->": "<-",
    "-": "-",
    "-": "-",
}

EXTS = {".html", ".js", ".css", ".md", ".txt", ".json", ".py"}


def fix_text(t: str) -> str:
    for a, b in MOJI.items():
        t = t.replace(a, b)
    for a, b in REPL.items():
        t = t.replace(a, b)
    while " | " in t:
        t = t.replace(" | ", " | ")
    return t


def main() -> None:
    n = 0
    for p in ROOT.rglob("*"):
        if ".git" in p.parts:
            continue
        if not p.is_file() or p.suffix.lower() not in EXTS:
            continue
        t = p.read_text(encoding="utf-8", errors="replace")
        fixed = fix_text(t)
        if fixed != t:
            p.write_text(fixed, encoding="utf-8", newline="\n")
            n += 1
            print("fixed", p.relative_to(ROOT))
    print("done", n)


if __name__ == "__main__":
    main()
