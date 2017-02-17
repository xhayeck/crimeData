export function rangesFormattedForDropdown(ranges) {
  return ranges.map(range => {
    return {
      range: range.date
    };
  });
}
