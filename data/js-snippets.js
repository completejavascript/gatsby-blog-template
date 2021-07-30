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
async function getPostPararell() {
  const [content, comments] = await Promise.all([
    getContent(),
    getComments(),
  ]);
  console.log({ content, comments });
}
    `,
  },
];

export default codeSnippets;
