export const extractLatLngFromUrl = (
  url: string
): { lat: number; lng: number } => {
  const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const matches = url?.match(regex);
  if (matches) {
    return { lat: parseFloat(matches[1]), lng: parseFloat(matches[2]) };
  }
  return { lat: 0, lng: 0 };
};
