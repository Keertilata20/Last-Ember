from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


OUT = Path(__file__).parent
S = 4
SIZE = 128 * S

im = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
d = ImageDraw.Draw(im)

# A dark winter-night tile with a warm ember at its center.
d.rounded_rectangle((8*S, 8*S, 120*S, 120*S), radius=27*S, fill="#17202a", outline="#59636a", width=2*S)
glow = Image.new("RGBA", im.size, (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gd.ellipse((22*S, 22*S, 106*S, 106*S), fill=(255, 112, 42, 105))
glow = glow.filter(ImageFilter.GaussianBlur(16*S))
im.alpha_composite(glow)
d = ImageDraw.Draw(im)

# Two crossed logs make the fire read as a campfire at small sizes.
d.rounded_rectangle((29*S, 79*S, 96*S, 91*S), radius=5*S, fill="#765039", outline="#d4a56b", width=2*S)
d.rounded_rectangle((35*S, 91*S, 91*S, 102*S), radius=5*S, fill="#533b2c", outline="#b98754", width=2*S)

# Outer flame and bright inner ember.
d.polygon([(63*S, 20*S), (76*S, 43*S), (88*S, 57*S), (86*S, 74*S), (76*S, 84*S), (50*S, 84*S), (39*S, 71*S), (43*S, 56*S), (55*S, 43*S)], fill="#ff873c")
d.polygon([(65*S, 48*S), (75*S, 63*S), (72*S, 76*S), (62*S, 81*S), (52*S, 74*S), (55*S, 64*S)], fill="#ffd17b")

for size, name in ((16, "icon16.png"), (48, "icon48.png"), (128, "icon128.png"), (192, "icon192.png"), (512, "icon512.png")):
    im.resize((size, size), Image.Resampling.LANCZOS).save(OUT / name, optimize=True)
