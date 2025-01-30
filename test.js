const HashMap = require("./hashmap");

const test = HashMap.HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("apple", "orange-red");
// console.log(test.length());

test.set("moon", "silver");

// console.log(test.buckets)
// console.log(test.entries())

test.set("moon", "cheese");
// console.log(test.length());
// console.log(test.entries());
// test.clear();
console.log(test.entries());