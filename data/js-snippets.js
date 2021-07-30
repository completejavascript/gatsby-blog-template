const codeSnippets = [
  {
    tags: ["function"],
    data: `
/**
 * A currying function is a function that takes 
 * multiple arguments and turns it into a sequence 
 * of functions having only one argument at a time.
 */

// Simple curry function definition
function multiply(a) {
  return (b) => {
    return (c) => {
      return a * b * c;
    };
  };
}

console.log(multiply(1)(2)(3));
// Output: 6
`,
  },
];

export default codeSnippets;
