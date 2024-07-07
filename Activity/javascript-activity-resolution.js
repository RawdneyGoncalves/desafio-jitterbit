// QUESTION 1

// - reply:
// - c) A set of keywords that make asynchronous functions more readable and easier to use.

// QUESTION 2

// - reply:
// - c) async function getData() { return new Promise({}); }

// QUESTION 3

// - reply:
// - b) A

// QUESTION 4

// - reply
function sumImpares(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      if (i % 2 !== 0) {
          sum += i;
      }
  }
  return sum
}

// Example
console.log(sumImpares(5))
console.log(sumImpares(10))

//QUESTION 5

function reverseWord(str) {
  // Check if the provided parameter is a valid string
  if (typeof str !== 'string') {
      throw new Error('The parameter must be a string.')
  }
  
  let result = ''
  // Iterate through the string from back to front
  for (let i = str.length - 1; i >= 0; i--) {
      result += str[i] // Append each character to the result
  }
  
  return result
}

// Example usage:
console.log(reverseWord("javascript")) // Expected output: "tpircsavaj"

// QUESTION 6

// In summary, the expected results are:
// a) 10
// b) "Error: Division by zero is not allowed."
// c) 7


// QUESTION 7

// 1 - Using map Method:

// The 'map' method iterates over each element of the array and applies a callback function to each element. 
// It returns a new array with the results of calling the callback function on each element.

// Example:

const jsonArray = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const mappedArray = jsonArray.map(item => {
  return {
      ...item,
      fullName: item.name.toUpperCase()
  };
});

console.log(mappedArray);


// 2 Using forEach Method:

// The 'forEach' method executes a provided function once for each array element. 
// It does not create a new array but is useful for executing side effects or operations on each element.

// Example:

jsonArray.forEach(item => {
  console.log(`ID: ${item.id}, Name: ${item.name}`);
});

// 3 Using for...of Loop:

// The 'for...of' loop provides a more traditional looping mechanism and iterates over iterable objects (like arrays), allowing you to execute code for each element.

// Example:

for (const item of jsonArray) {
  console.log(`ID: ${item.id}, Name: ${item.name}`);
}

// QUESTION 8

// 1 '&&' Operator (AND):

// The && operator is used to combine two or more conditions, and the resulting expression will be true only if all individual conditions are also true.

// Example:

let age = 25;
let hasDriverLicense = true;

if (age >= 18 && hasDriverLicense) {
    console.log("Can legally drive.");
} else {
    console.log("Cannot legally drive.");
}

// 2 '||' Operator (OR):

// The || operator is used to combine two or more conditions, and the resulting expression will be true if at least one of the individual conditions is true.

// Example:

let position = 'Manager';
let department = 'Sales';

if (position === 'Manager' || department === 'Sales') {
    console.log("User authorized for access.");
} else {
    console.log("Access not authorized.");
}

// QUESTION 9

// In JavaScript, the try block is used to enclose code that might throw an error, allowing you to handle exceptions gracefully. Here's the syntax:

try {
  // Code that may throw an error
  // This could be any code that you anticipate might cause an error, such as accessing properties of null or undefined variables, making network requests, etc.
} catch (error) {
  // Code to handle the error
  // This block executes if an error occurs within the try block
  // 'error' is the object containing information about the error (e.g., message, stack trace)
} finally {
  // Optional 'finally' block
  // This block executes whether an error occurred or not
  // It is typically used for cleanup tasks that should be performed regardless of errors
}


// QUESTION 10

// In JavaScript, you can manually throw exceptions using the throw keyword. 
// This allows you to create and throw custom exceptions when certain conditions are met or errors occur. 
// Here's how you can use throw to create and throw custom exceptions

// Example:

function divideNumbers(number1, number2) {
  if (number2 === 0) {
      throw new Error("Division by zero is not allowed.");
  }
  return number1 / number2;
}

try {
  let result = divideNumbers(10, 0); // This will throw an exception
  console.log("Result:", result); // This line will not execute if an exception is thrown
} catch (error) {
  console.log("Error:", error.message); // Handle the exception and log the error message
}
