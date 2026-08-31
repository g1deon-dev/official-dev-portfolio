# Global Design Rules
- Typography: Use system monospace fonts or a rigid sans-serif stack. Do not import generic Google fonts like Inter or Roboto.
- Color Palette: Implement a strict two-theme system, each theme monochrome-plus-one-accent. The default theme uses a solid dark navy background, silver text, and a cyan accent. The `blood-moon` theme (activated via `[data-theme='blood-moon']`) uses a solid dark maroon background, pale pink text, and a crimson accent. No gradients, textures, or third colors in either theme. Reserve the accent color exclusively for `:hover`/`:focus` states.
- Layout: Avoid centered text blocks and standard three-column symmetrical feature cards. Use an asymmetrical bento grid — solid-fill tiles of varying size, separated by generous gap spacing rather than visible borders — and dense information layouts.
- UI Elements: Do not use rounded corners. Tiles and buttons are sharp-edged, solid-fill blocks with no border and no shadow at rest. Accent-colored `box-shadow` glow is permitted strictly on `:hover`/`:focus` states of interactive elements — never on static containers.

# Code Constraints
- Do not add comments to the code.
