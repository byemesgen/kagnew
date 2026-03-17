

## Redesign filmmaker card headers with photo + horizontal name/title layout

**Current state:** Each card shows a circle with initials, then name and title stacked below it.

**Changes to `src/components/FilmmakersSection.tsx`:**

1. **Add photo fields** to the `filmmakers` data array — import `team-member-1.png` for Aida and `team-member-2.png` for Bemnet (or whichever images correspond).

2. **Restructure card top** from vertical stack to a horizontal `flex flex-row items-center gap-4` layout:
   - Left: circular photo (using `Avatar`/`AvatarImage` or a simple `img` with `rounded-full w-16 h-16 object-cover`)
   - Right: name (h3) and title (p) stacked vertically

3. **Remove** the initials-based avatar div, replace with actual `<img>` using the imported photo.

4. Bio paragraph stays below, unchanged.

**Result:** Photo on left, name + title to its right, bio below — cleaner, more professional card header.

