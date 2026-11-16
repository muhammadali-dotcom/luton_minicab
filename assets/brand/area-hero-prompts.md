# Area hero image prompts

Car-free wall-style illustrations for the nine area pages. They use the same recipe as the service heroes, so each one fits the hero the same way: plain cream wall on the left for the text, the scene on the right.

## How to use
1. Paste the **shared prompt**, then add the area's **scene** at the end.
2. Generate in a wide format: 21:9, or about 1920 × 820.
3. Pick the image where the left side is plainest and the local scene is clear and contains no cars.
4. Save it as `public/brand/areas/<slug>-hero.png`, for example `luton-hero.png`, and send it over. I'll check the scene, set the crop and tune the fade.

## Shared prompt (use for every area)
Photorealistic wide banner photograph, 21:9 (about 1920 × 820), warm late-afternoon golden-hour sunlight with soft shadows. The left 45% of the image is a calm, plain, sunlit cream sandstone wall in gentle soft focus, with no windows, signs, text or clutter, so a headline can sit on it. On the right, show the local architecture and landscape beside an empty road or forecourt. No cars, taxis, vans or other road vehicles, including in the background. No people. No text, no shop names, no brand logos anywhere. A tidy British setting, natural colours, not oversaturated, high detail, the same look as a premium lifestyle advert.

## Scene for each area (add after the shared prompt)

| Page | Scene |
|---|---|
| Luton (`luton`) | On the right, a grand pale Portland-stone town hall with a tall square clock tower and a green copper roof, a stone war memorial and a paved civic square, blue sky with a few soft clouds. |
| Leagrave (`leagrave`) | On the right, a small red-brick suburban railway station with a white timber canopy, a footbridge over the tracks and a few trees, quiet and sunny. |
| Stopsley (`stopsley`) | On the right, a quiet suburban parade of small local shops with plain awnings and no names, and green chalk hills rising softly in the distance. |
| Dunstable (`dunstable`) | On the right, a historic town high street with an old Norman stone priory church tower, and the green rolling Dunstable Downs visible on the horizon. |
| Houghton Regis (`houghton-regis`) | On the right, a village green with mature trees and an old flint and stone parish church with a square tower. |
| Harpenden (`harpenden`) | On the right, a wide, leafy, tree-lined high street with neat Victorian shopfronts (no names) and a large open green common. |
| Mill Hill (`mill-hill`) | On the right, a leafy north London street with a small, tidy suburban railway station entrance and red-brick terraced houses. |
| Hounslow (`hounslow`) | On the right, a busy-looking but empty west London high street with Victorian buildings, and a passenger plane in the sky on its approach, small in the distance. |
| Heathrow (`heathrow`) | On the right, the drop-off forecourt of a modern glass and steel airport terminal, with a passenger plane climbing in the sky in the distance. Warm evening light reflecting on the glass. |

## Notes
- The nine active assets are `public/brand/areas/<slug>-hero.png`, edited from the supplied golden-hour originals to remove cars and reconstruct the surroundings.
- Mill Hill uses the timber-fascia version 10, not version 7 with its artificial station sign.
- Preserve supplied originals. Do not reintroduce vehicles into these area hero images.
- These are generated scenes, not exact photographs of named landmarks. Use neutral, descriptive illustration alt text.
- Only individual area-page heroes use these assets; the /areas overview and other pages remain unchanged.
