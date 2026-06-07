import os
from PIL import Image, ImageDraw, ImageFont

img_dir = r"k:\aishu\wedding_invitation\assets\img"
audio_dir = r"k:\aishu\wedding_invitation\assets\audio"

os.makedirs(img_dir, exist_ok=True)
os.makedirs(audio_dir, exist_ok=True)

# Helper to create simple text-based placeholders
def create_image(filename, size, text, bg_color, text_color, is_transparent=False):
    mode = 'RGBA' if is_transparent else 'RGB'
    img = Image.new(mode, size, bg_color)
    d = ImageDraw.Draw(img)
    
    # Try to calculate text size roughly
    # We won't use custom fonts to avoid dependency issues
    # Just draw some text or graphics
    d.text((size[0]//2 - 50, size[1]//2), text, fill=text_color)
    
    # Draw a border or some design based on filename
    if "kolam" in filename:
        d.ellipse([10, 10, size[0]-10, size[1]-10], outline=text_color, width=3)
        d.line([size[0]//2, 10, size[0]//2, size[1]-10], fill=text_color, width=2)
        d.line([10, size[1]//2, size[0]-10, size[1]//2], fill=text_color, width=2)
    elif "hero" in filename or "bg" in filename:
        d.rectangle([0, 0, size[0], size[1]], outline=text_color, width=10)
    
    img.save(os.path.join(img_dir, filename))

# Generate images
create_image("kolam.png", (200, 200), "Kolam", (255,255,255,0), (212,175,55,255), True)
create_image("diya.png", (100, 100), "Diya", (255,255,255,0), (212,175,55,255), True)
create_image("hero-bg.jpg", (1920, 1080), "Hero Background Placeholder", (91, 14, 20), (248, 241, 229))
create_image("kolam-divider.png", (400, 50), "Divider", (255,255,255,0), (212,175,55,255), True)
create_image("mandala-bg.png", (1920, 1080), "Mandala BG", (248, 241, 229), (230, 211, 168))
create_image("events-bg.jpg", (1920, 1080), "Events BG", (91, 14, 20), (212, 175, 55))
create_image("kuthu-vilakku.png", (150, 300), "Lamp", (255,255,255,0), (212,175,55,255), True)

# Generate Gallery Images
for i in range(1, 7):
    create_image(f"gallery-{i}.jpg", (800, 800), f"Couple Photo {i}", (230, 211, 168), (91, 14, 20))

# Generate dummy audio
audio_path = os.path.join(audio_dir, "bgm.mp3")
with open(audio_path, 'wb') as f:
    f.write(b'ID3') # Just dummy bytes so it doesn't 404

print("Assets generated successfully.")
