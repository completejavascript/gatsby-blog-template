export const decodeGotoUrl = (locationSearch) => {
  if (!locationSearch) return "";

  const params = new URLSearchParams(locationSearch);
  const t = params.get("t");

  if (!t) return "";

  return t;
};
