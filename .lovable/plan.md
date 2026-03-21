

## Plan: Fix Timeline Layout

### 1. Make horizontal line edge-to-edge
- Move the timeline container out of the `max-w-5xl` wrapper so it spans the full viewport width
- Keep the rest of the section (stats, text, blockquote) inside the constrained wrapper

### 2. Fix dot vertical centering on the gold line
- The gold line is positioned at `top-[3.25rem]` but the dots aren't centered on it
- Change the layout so the gold line is vertically centered on the dots using flexbox alignment — position the line relative to the dot row using `top-1/2 -translate-y-1/2` on the line, or adjust the `top` value to exactly align with the dot centers

### 3. Increase font sizes
- Label (currently `text-[10px]`): increase to `text-sm` (~14px)
- Date (currently `text-xs`): increase to `text-sm`
- Description (currently `text-[11px]`): increase to `text-sm` with appropriate line height

### Technical Details
- Single file edit: `src/components/StorySection.tsx`
- Restructure the JSX to pull the timeline `div` outside the `max-w-5xl` container
- Adjust the gold line's `top` position to align with the center of the 12px dots
- Update all three text size classes in the timeline node markup

