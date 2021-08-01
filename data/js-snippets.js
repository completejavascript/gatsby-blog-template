const codeSnippets = [
  {
    link: "/lam-sao-bat-buoc-truyen-tham-so-vao-ham",
    data: `
/**
 * Nhiều khi, hàm bắt buộc phải truyền tham số vào.
 * Ngược lại thì hàm sẽ không có ý nghĩa gì cả.
 * 
 * Để làm được điều đó, bạn có thể throw Error
 * nếu không có tham số truyền vào.
 */

const isRequired = (param) => {
  throw Error(\`Parameter: \${param} is required!\`);
};

function sayHello(name = isRequired("name")) {
  console.log(\`Hello \${name}!\`);
}

sayHello("Lam Pham"); 
// Hello Lam Pham!

sayHello(); 
// Uncaught Error: Parameter: name is required!   
`,
  },

  {
    link: "/kiem-tra-empty-object-trong-javascript",
    data: `
/**
 * Một object được gọi là empty object khi và chỉ khi:
 * - Đó là một object
 * - Và nó không có một thuộc tính enumerable nào cả.
 */

function isEmptyObject(v) {
  return !!v && v.constructor === Object && 
          Object.keys(v).length === 0;
}

const a = 1,
  b = "hello",
  c = [1, 2],
  d = {},
  e = () => {},
  f = null,
  g = undefined,
  h = { a: 1, b: 2, c: "3" };

console.log(isEmptyObject(a)); // false
console.log(isEmptyObject(b)); // false
console.log(isEmptyObject(c)); // false
console.log(isEmptyObject(d)); // true
console.log(isEmptyObject(e)); // false
console.log(isEmptyObject(f)); // false
console.log(isEmptyObject(g)); // false
console.log(isEmptyObject(h)); // false
`,
  },

  {
    link: "/sap-xep-tieng-viet-javascript",
    data: `
/**
 * Để sắp xếp Tiếng Việt trong JavaScript thì
 * bạn có thể sử dụng hàm sort() 
 * kết hợp với localeCompare()
 */

function localeSort(arr) {
  return arr.sort((a, b) => a.localeCompare(b));
}

localeSort(["Hà Nội", "Hưng Yên", "Hải Dương"]);
// ["Hà Nội", "Hải Dương", "Hưng Yên"]
`,
  },

  {
    link: "/tao-so-ngau-nhien-trong-javascript",
    data: `
/**
 * Một số biến thể khi tạo số ngẫu nhiên
 */

// Tạo số ngẫu nhiên giữa [min, max)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

getRandomArbitrary(5, 20);
// 18.085571381479397

// Tạo số nguyên ngẫu nhiên giữa 2 giá trị [min, max)
function getRandomInt(min, max) {
  return Math.floor(
    Math.random() * (max - min)
  ) + min;
}

getRandomInt(5, 20);
// 9

// Tạo số nguyên ngẫu nhiên giữa 2 giá trị [min, max]
function getRandomIntInclusive(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}

getRandomIntInclusive(5, 20);
// 20
`,
  },

  {
    link: "/xu-ly-bat-dong-bo-song-song-tuan-tu",
    data: `
/**
 * Xử lý bất đồng bộ tuần tự và song song
 */

// Xử lý bất đồng bộ tuần tự
async function getPostSerial() {
  const content = await getContent();
  const comments = await getComments();
  console.log({ content, comments });
}

// Xử lý bất đồng bộ song song
async function getPostParallel() {
  const [content, comments] = await Promise.all([
    getContent(),
    getComments(),
  ]);
  console.log({ content, comments });
}
    `,
  },

  {
    link: "/thu-thuat-su-dung-console-hieu-qua",
    data: `
/**
 * Cách đơn giản để hiển thị thời gian thực thi
 * của một đoạn code với console.time 
 * và console.timeEnd
 */

console.time("looper");

let i = 0;
while (i < 1000000) {
  i++;
}

console.timeEnd("looper");
// => looper: 2.947021484375 ms
`,
  },

  {
    link: "/ung-dung-cua-reduce-javascript",
    data: `
/**
 * Sử dụng reduce giúp code trở nên gọn gàng hơn
 */

const posts = [
  { postID: "id1", title: "title1" },
  { postID: "id2", title: "title2" },
  { postID: "id3", title: "title3" },
];

function toDictionary(posts, fieldToKey) {
  return posts.reduce((acc, cur) => {
    const key = cur[fieldToKey];
    return { ...acc, [key]: cur };
  }, {});
}

const dictionary = toDictionary(posts, "postID");
console.log(dictionary);
/**
 * {
 *   id1: { postID: "id1", title: "title1" }
 *   id2: { postID: "id2", title: "title2" }
 *   id3: { postID: "id3", title: "title3" }
 * }
 */
`,
  },

  {
    link: "/mot-so-bieu-thuc-chinh-quy-regexp-hay",
    data: `
/**
 * Một số mẫu RegExp hay dùng
 */

// Kiểm tra string chỉ chứa chữ cái (a-zA-Z)
/^[a-zA-Z]+$/

// Kiểm tra string chỉ chứa số (0-9)
/^\d+$/

// Kiểm tra string chỉ chứa chữ cái (a-zA-Z) và số (0-9)
/^[a-zA-Z0-9]+$/

// Kiểm tra string là base64
/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/

// Kiểm tra string là boolean
/^true|false$/

// Kiểm tra string là số thập phân
/^[+-]?((\d+(\.\d*)?)|(\.\d+))$/

// Kiểm tra string là số Hexadecimal
/^[0-9a-fA-F]+$/

// Kiểm tra string là mã màu dạng hexa
/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

// Kiểm tra string là mã màu RGB
/^rgb\(((\s*(\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5])\s*),){2}(\s*(\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5])\s*)\)$/

// Kiểm tra string là mã màu RGBA
/^rgba\(((\s*(\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5])\s*),){3}(\s*(1(\.0+)?|0?\.\d+)\s*)\)$/

// Kiểm tra string là email
/^[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

// Kiểm tra string là IPv4
/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/

// Check string là địa chỉ MAC
/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/

// Kiểm tra string là MD5
/^[a-f0-9]{32}$/

// Kiểm tra string là số điện thoại Việt Nam
/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/

// Kiểm tra string là mật khẩu mạnh
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
`,
  },

  {
    link: "/ket-thuc-som-promise-chaining-trong-javascript",
    data: `
/**
 * Sử dụng Promise.reject() để kết thúc Promise chain
 */

const increase = (x) => {
  console.log(x);
  return x + 1;
};

const run = (x) => {
  new Promise((resolve, reject) => {
    resolve(x);
  })
    .then((res) => {
      if (res <= 3) return increase(res);
      return Promise.reject(res);
    })
    .then((res) => increase(res))
    .then((res) => increase(res))
    .catch((err) => console.log("Catched: " + err));
};

run(3);
// 3
// 4
// 5

run(4);
// Catched: 4
`,
  },

  {
    link: "/convert-ipv4-sang-decimal-va-nguoc-lai",
    data: `
/**
 * Convert IPv4 to Decimal
 * @param {String} ip - a String represents an IPv4
 * @returns a decimal if the input is valid. 
 * Otherwise, it returns -1.
 */

function convertIPv4toDecimal(ip) {
  // Simply validate input as IPv4
  const ipv4RegEx = /^(\d{1,3}\.){3}(\d{1,3})$/;
  const valid = ipv4RegEx.test(ip);
  if (!valid) {
    return -1;
  }

  let ipDecimal = 0;
  const octets = ip.split(".");

  for (let i = 0; i < 4; i++) {
    const octet = Number(octets[i]);

    // make sure each value is between 0 and 255
    if (octet > 255 || octet < 0) {
      return -1;
    }

    ipDecimal = ipDecimal * 256 + octet;
  }

  return ipDecimal;
}    
`,
  },

  {
    link: "/convert-ipv4-sang-decimal-va-nguoc-lai",
    data: `
/**
 * Convert Decimal to IPv4
 * @param {Number} decimal - a Number represents a Decimal
 * @returns an IPv4 as String if the input is valid.
 * Otherwise, it returns an empty string ("").
 */
function convertDecimalToIPv4(decimal) {
  if (
    typeof decimal !== "number" ||
    Number.isInteger(decimal) === false ||
    decimal < 0 ||
    decimal > 4294967295
  ) {
    return "";
  }

  const p1 = decimal >>> 24;
  const p2 = (decimal & 0x00ff0000) >>> 16;
  const p3 = (decimal & 0x0000ff00) >>> 8;
  const p4 = decimal & 0x000000ff;

  if (p1 > 255 || p2 > 255 || p3 > 255 || p4 > 255) {
    return "";
  }

  return \`\${p1}.\${p2}.\${p3}.\${p4}\`;
}
`,
  },

  {
    link: "/remove-item-in-array-javascript",
    data: `
/**
* Loại bỏ phần tử tại chỉ số index với n phần tử
*/

function removeItemByIndex(arr, index, n = 1) {
  const a1 = arr.slice(0, index);
  const a2 = arr.slice(index + n, arr.length);
  return a1.concat(a2);
}

const arr1 = ["a", "b", "c", "d", "e"];
const arr2 = removeItemByIndex(arr1, 1, 2);
// ["a", "d", "e"]
`,
  },

  {
    link: "/remove-item-in-array-javascript",
    data: `
/**
 * Loại bỏ phần tử dựa vào giá trị
 */

function removeItemByValue(arr, arrayToRemoves) {
  return arr.filter((item) => !arrayToRemoves.includes(item));
}

const arr1 = ["a", "b", "c", "d", "e"];
const arr2 = removeItemByValue(arr1, ["b", "c"]);

console.log(arr2);
// ["a", "d", "e"]
`,
  },

  {
    link: "/giao-tiep-voi-clipboard-su-dung-execcommand",
    data: `
/**
 * Dùng Document.execCommand() 
 * để giao tiếp với clipboard (copy & cut)
 */

const isSupported = (cmd) => {
  return document.queryCommandSupported(cmd);
};

// Copy
if (isSupported("copy")) document.execCommand("copy");

// Cut
if (isSupported("cut")) document.execCommand("cut");   
`,
  },

  {
    link: "/trien-khai-lazy-loading-image-voi-es6-va-css",
    data: `
/**
 * Check DOM đang hiển thị trong viewPort
 */

function elementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const innerHeight = window.innerHeight || 
    document.documentElement.clientHeight;

  return rect.top >= 0 && 
         rect.left >= 0 && 
         rect.top <= innerHeight;
}
`,
  },

  {
    link: "/trien-khai-lazy-loading-image-voi-es6-va-css",
    data: `
/**
 * Đăng ký và xử lý scroll với timer
 */

function handleScroll() {
  // DO SOMETHING
}

let debounceTimer;
window.addEventListener("scroll", function () {
  if (debounceTimer) {
    window.clearTimeout(debounceTimer);
  }

  debounceTimer = window.setTimeout(function () {
    handleScroll();
  }, 100);
});
`,
  },
];

export default codeSnippets;
