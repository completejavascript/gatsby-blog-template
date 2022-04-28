/**
 * Example:
 * 1. URL: https://eloquentjavascript.net/Eloquent_JavaScript.pdf
 * 2. Base64: aHR0cHM6Ly9lbG9xdWVudGphdmFzY3JpcHQubmV0L0Vsb3F1ZW50X0phdmFTY3JpcHQucGRm
 * 3. Take 10 first characters and 10 last characters
 *      s = first_10(base64)
 *      e = last_10(base64)
 *      m = remain_characters
 * 5. Define callbacks
 *      c = ebooks
 * 4. Build download url
 *      `/download?c=${c}&s=${s}&e=${e}&m=${m}`
 */
const Base64 = require("../src/utils/base64Helper.js");
const { decodeDownloadUrl } = require("../src/utils/downloadUrlHelper.js");

function run() {
  if (process.argv.length < 3) {
    console.log("SHOULD NOT HAPPEN: missing parameters");
    return;
  }

  const url = process.argv[2];
  const callback = process.argv.length > 3 ? process.argv[3] : "ebooks";

  if (!url) {
    console.log("SHOULD NOT HAPPEN: url is not defined\n", url);
    return;
  }

  const base64 = Base64.encode(url);

  if (base64.length < 20) {
    console.error("SHOULD NOT HAPPEN: base64 is too short\n", base64.length);
    return;
  }

  const s = encodeURIComponent(base64.slice(0, 10));
  const m = encodeURIComponent(base64.slice(10, base64.length - 10));
  const e = encodeURIComponent(base64.slice(base64.length - 10, base64.length));
  const locationSearch = `?c=${callback}&s=${s}&e=${e}&m=${m}`;
  const finalUrl = `/download${locationSearch}`;

  // re-test
  const decoded = decodeDownloadUrl(locationSearch);
  if (decoded.callback !== callback) {
    console.error("SHOULD NOT HAPPEN: wrong callback url\n", decoded.callback);
    return;
  }

  if (decoded.url !== url) {
    console.error("SHOULD NOT HAPPEN: wrong download url\n", decoded.url);
    return;
  }
  console.log("finalUrl:\n", finalUrl);
}

run();
