const Base64 = require("./base64Helper");

const decodeDownloadUrl = (locationSearch) => {
  if (!locationSearch) return "";

  const params = new URLSearchParams(locationSearch);
  const s = params.get("s"); // start
  const e = params.get("e"); // end
  const m = params.get("m"); // middle
  const callback = params.get("c"); // callback

  let url = "";
  if (s && e && m) {
    url = s + m + e;
    url = Base64.decode(url);
  }

  return { url, callback };
};

module.exports = { decodeDownloadUrl };
