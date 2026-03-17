

## Add new stat to StorySection

Add a fourth item to the `stats` array in `src/components/StorySection.tsx`:

```ts
{ number: '0', label: 'Ethiopian soldier casualties' }
```

The grid will automatically accommodate the 4th stat. May want to adjust from `md:grid-cols-3` to `md:grid-cols-4` so all four display in a single row on desktop.

