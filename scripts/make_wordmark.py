"""Build EVALUATOR wordmark: circular E logo + VALUATOR text, same visual height, PNG."""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

root = Path(r"D:\script cursor\evaluator\assets")
src = Image.open(root / "logo.jpg").convert("RGBA")

# Crop white margins -> circle with alpha
w, h = src.size
# find non-near-white content
px = src.load()
minx, miny, maxx, maxy = w, h, 0, 0
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if r < 245 or g < 245 or b < 245:
            minx = min(minx, x)
            miny = min(miny, y)
            maxx = max(maxx, x)
            maxy = max(maxy, y)
pad = 8
box = (max(0, minx - pad), max(0, miny - pad), min(w, maxx + pad), min(h, maxy + pad))
cropped = src.crop(box)
# force square
side = max(cropped.size)
sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
ox = (side - cropped.size[0]) // 2
oy = (side - cropped.size[1]) // 2
sq.paste(cropped, (ox, oy))

# circular mask
mask = Image.new("L", (side, side), 0)
md = ImageDraw.Draw(mask)
md.ellipse((1, 1, side - 2, side - 2), fill=255)
circ = Image.new("RGBA", (side, side), (0, 0, 0, 0))
circ.paste(sq, (0, 0))
circ.putalpha(mask)

# target logo height for wordmark
H = 160
circ = circ.resize((H, H), Image.Resampling.LANCZOS)

# VALUATOR text - same visual size as the E badge (near full circle height)
font_size = int(H * 0.88)
font_paths = [
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\seguisb.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
]
font = None
for fp in font_paths:
    try:
        font = ImageFont.truetype(fp, font_size)
        break
    except Exception:
        pass
if font is None:
    font = ImageFont.load_default()

text = "VALUATOR"
tmp = Image.new("RGBA", (10, 10), (0, 0, 0, 0))
td = ImageDraw.Draw(tmp)
bbox = td.textbbox((0, 0), text, font=font)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]

gap = int(H * 0.12)
out_w = H + gap + tw + 20
out_h = H + 20
out = Image.new("RGBA", (out_w, out_h), (0, 0, 0, 0))
out.paste(circ, (0, (out_h - H) // 2), circ)

# vertically center text with circle
tx = H + gap
ty = (out_h - th) // 2 - bbox[1]
draw = ImageDraw.Draw(out)
draw.text((tx, ty), text, fill=(28, 36, 56, 255), font=font)

out.save(root / "evaluator-wordmark.png", "PNG")
# also small favicon / brand mark (circle only transparent)
circ.save(root / "logo.png", "PNG")
print("saved", root / "evaluator-wordmark.png", out.size)
print("saved", root / "logo.png", circ.size)
