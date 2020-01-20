---
title: Reduce
date: "2020-01-13T11:33:22.182Z"
description: "Javascript Reduce"
---

## Table of Contents

```toc
exclude: Table of Contents
from-heading: 1
to-heading: 6
```

# Reduce

## intro

![image](https://user-images.githubusercontent.com/17464007/72707254-5b8e9380-3ba3-11ea-8b4f-de2ca4adcdbc.png)

![image](https://user-images.githubusercontent.com/17464007/72683789-c1383c80-3b1d-11ea-966d-819a540fed62.png)

도무지 갈피를 잡을 수 없는 Reduce라는 이름..  
분명 예제를 보고 따라한 적도 많은데  
왜 이리 익숙하지가 않을까? ㅜㅜ
연습이 부족한 탓도 있겠지만  
이름이주는 이미지와 실제 활용이 매칭이 안되었기 때문일 것이다.  
코드를 보면 이해가 가는데  
왜 이러한 코드를 Reduce라고 이름 지었을까?  
Reduce란 `줄이다`라는 의미이다.
뭘 줄이냐 하면 배열 안의 여러 요소들을 `initialValue`로 지정한 하나의 값으로 줄인다는 의미이다.

Reduce는 배열이 돌면서 정의한 callback함수(보통 **reducer**라고 부른다)를 호출한다.  
여기까지는 ForEach랑 똑같은데 이놈은 함수를 실행할 때 `initialValue`(초깃값)을 넣어줄 수가 있고  
이 초깃값에다가 누적해서 뭔가 더 작업을 할 수 있다.

사실 초기 값을 선언하고 해당 배열을 forEach 돌려서 초깃값을 가공할 수 도 있으나 이러한 행위들이
반복되는 일들이 많으니
선배 개발자분들이 reduce라는 함수를 제공하신 듯 하다.

## intro 정리

나는 배열의 아이들을 순차적으로 돌면서 아이들의 의미 있는 하나의 값을 구하고 싶다.
이때 사용하는 것이다.  
예를 들어 이 아이들의 sum을 구해줘, 이 아이들의 평균을 구해줘, 이 아이들을 하나의 Map으로 만들어줘 할 때 사용한다.

## reduce의 4인자

리듀서 함수는 네 개의 인자를 가집니다.

1. 누산기accumulator (acc)
2. 현재 값 (cur)
3. 현재 인덱스 (idx)
4. 원본 배열 (src)

> 리듀서 함수의 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되므로 결국 최종 결과는 `하나의 값`이 됩니다.

## reduce 구문

> arr.reduce(callback[, initialValue])

- callback

  - accumulator - 누산기accmulator는 콜백의 반환값을 누적합니다.
  - currentIndex(Optional) - 처리할 현재 요소의 인덱스. initialValue를 제공한 경우 0, 아니면 1부터 시작합니다.
  - array(Optional) - reduce()를 호출한 배열.

- initialValue (Optional)

  - callback의 최초 호출에서 첫 번째 인수에 제공하는 값.
  - 초기값을 제공하지 않으면 배열의 첫 번째 요소를 사용합니다.
  - 빈 배열에서 초기값 없이 reduce()를 호출하면 오류가 발생합니다.

- return
  - 누적 계산의 결과 값

## reduce 설명

reduce()는 빈 요소를 제외하고 배열 내에 존재하는 각 요소에 대해 callback 함수를 한 번씩 실행하는데, 콜백 함수는 다음의 네 인수를 받습니다:

- accumulator
- currentValue
- currentIndex
- array

콜백의 최초 호출 때 accumulator와 currentValue는 다음 두 가지 값 중 하나를 가질 수 있습니다.  
만약 reduce() 함수 호출에서 initialValue를 제공한 경우, accumulator는 initialValue와 같고 currentValue는 배열의 첫 번째 값과 같습니다.  
initialValue를 제공하지 않았다면, accumulator는 배열의 첫 번째 값과 같고 currentValue는 두 번째와 같습니다.

### 참고

initialValue를 제공하지 않으면, reduce()는 인덱스 1부터 시작해 콜백 함수를 실행하고 첫 번째 인덱스는 건너 뜁니다.  
initialValue를 제공하면 인덱스 0에서 시작합니다.
배열이 비어있는데 initialValue도 제공하지 않으면 TypeError가 발생합니다.  
배열의 요소가 (위치와 관계없이) 하나 뿐이면서 initialValue를 제공되지 않은 경우, 또는 initialValue는 주어졌으나 배열이 빈 경우엔 그 단독 값을 callback 호출 없이 반환합니다.

## reduce 예제

### 1. 배열의 모든 값 합산

```js
var sum = [0, 1, 2, 3].reduce(function(accumulator, currentValue) {
  return accumulator + currentValue
}, 0)
// sum is 6
```

<br>
화살표 함수로도 작성할 수 있습니다.

```js
var total = [0, 1, 2, 3].reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
)
```

<br>
객체 배열에서의 값 합산
객체로 이루어진 배열에 들어 있는 값을 합산하기 위해서는 반드시 초기값을 주어 각 항목이 여러분의 함수를 거치도록 해야 합니다.

```js
var initialValue = 0
var sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(function(
  accumulator,
  currentValue
) {
  return accumulator + currentValue.x
},
initialValue)

console.log(sum) // logs 6
```

<br>
화살표 함수(arrow function)로도 작성할 수 있습니다:

```js
var initialValue = 0
var sum = [{ x: 1 }, { x: 2 }, { x: 3 }].reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  initialValue
)

console.log(sum) // logs 6
```

### 2. 중첩 배열 펼치기flatten

```js
var flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce(function(accumulator, currentValue) {
  return accumulator.concat(currentValue)
}, [])
// 펼친 결과: [0, 1, 2, 3, 4, 5]
```

<br>
화살표 함수로도 작성할 수 있습니다:

```js
var flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((accumulator, currentValue) => accumulator.concat(currentValue), [])
```

### 3. 객체 내의 값 인스턴스 개수 세기

```js
var names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"]

var countedNames = names.reduce(function(allNames, name) {
  if (name in allNames) {
    allNames[name]++
  } else {
    allNames[name] = 1
  }
  return allNames
}, {})
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

### 4. 속성으로 객체 분류하기

```js
var people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 },
]

function groupBy(objectArray, property) {
  return objectArray.reduce(function(acc, obj) {
    var key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

var groupedPeople = groupBy(people, "age")
// groupedPeople is:
// {
// 20: [
// { name: 'Max', age: 20 },
// { name: 'Jane', age: 20 }
// ],
// 21: [{ name: 'Alice', age: 21 }]
// }
```

### 5. 확장 연산자와 초기값을 이용하여 객체로 이루어진 배열에 담긴 배열 연결하기

```js
// friends - an array of objects
// where object field "books" - list of favorite books
var friends = [
  {
    name: "Anna",
    books: ["Bible", "Harry Potter"],
    age: 21,
  },
  {
    name: "Bob",
    books: ["War and peace", "Romeo and Juliet"],
    age: 26,
  },
  {
    name: "Alice",
    books: ["The Lord of the Rings", "The Shining"],
    age: 18,
  },
]

// allbooks - list which will contain all friends' books +
// additional list contained in initialValue
var allbooks = friends.reduce(
  function(accumulator, currentValue) {
    return [...accumulator, ...currentValue.books]
  },
  ["Alphabet"]
)

// allbooks = [
// 'Alphabet', 'Bible', 'Harry Potter', 'War and peace',
// 'Romeo and Juliet', 'The Lord of the Rings',
// 'The Shining'
// ]
```

### 6. 배열의 중복 항목 제거

> 참고: Set과 Array.from()을 사용할 수 있는 환경이라면, let orderedArray = Array.from(new Set(myArray));를 사용해 중복 요소를 제거할 수도 있습니다.

```js
let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4]
let result = arr.sort().reduce((accumulator, current) => {
  const length = accumulator.length
  if (length === 0 || accumulator[length - 1] !== current) {
    accumulator.push(current)
  }
  return accumulator
}, [])
console.log(result) //[1,2,3,4,5]
```

### 7. 프로미스를 순차적으로 실행하기

```js
/*\*

- Runs promises from array of functions that can return promises
- in chained manner
-
- @param {array} arr - promise arr
- @return {Object} promise object
  \*/
function runPromiseInSequence(arr, input) {
    return arr.reduce((promiseChain, currentFunction) => promiseChain.then(currentFunction), Promise.resolve(input));
}
// promise function 1
function p1(a) {
    return new Promise((resolve, reject) => {
        resolve(a \ * 5);
    });
}
// promise function 2
function p2(a) {
    return new Promise((resolve, reject) => {
        resolve(a \ * 2);
    });
}
// function 3 - will be wrapped in a resolved promise by .then()
function f3(a) {
    return a \ * 3;
}
// promise function 4
function p4(a) {
    return new Promise((resolve, reject) => {
        resolve(a \ * 4);
    });
}
const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200
```

### 8. 함수 구성을 위한 파이프 함수

```js
// Building-blocks to use for composition
const double = x => x + x;
const triple = x => 3 _ x;
const quadruple = x => 4 _ x;
// Function composition enabling pipe functionality
const pipe = (...functions) => input => functions.reduce((acc, fn) => fn(acc), input);
// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);
// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
```

### 9. reduce()로 map()작성

```js
if (!Array.prototype.mapUsingReduce) {
  Array.prototype.mapUsingReduce = function(callback, thisArg) {
    return this.reduce(function(mappedArray, currentValue, index, array) {
      mappedArray[index] = callback.call(thisArg, currentValue, index, array)
      return mappedArray
    }, [])
  }
}
;[1, 2, , 3].mapUsingReduce(
  (currentValue, index, array) => currentValue + index + array.length
) // [5, 7, , 10]
```

# 출처

- [MDN javscript reduce]](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
