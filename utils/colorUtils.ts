export function isColorDark(color: string): boolean {
  // Remove the leading '#' if present
    const hex = color.replace('#', '');
  // Convert hex to RGB
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
  // Calculate relative luminance using the formula from WCAG 2.0
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // Return true if the color is dark (luminance < 0.5)
    return luminance < 0.5;
}