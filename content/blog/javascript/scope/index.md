---
title: Scope
date: "2019-12-30T10:13:02.512Z"
description: "Javascript Scope"
---

# 1. 스코프란?

스코프는 참조 대상 식별자(identifier, 변수, 함수의 이름과 같이 어떤 대상을 다른 대상과 구분하여 식별할 수 있는 유일한 이름)를 찾아내기 위한 규칙이다.
자바스크립트는 이 규칙대로 식별자를 찾는다.
말이 어렵다. 그 규칙은 무엇일까?
간단하다!

1. 식별자가 선언된 곳에서 가장 가까운 function 선언문을 찾으면 그곳이 바로 그 식별자가 사용되는 스코프이다.
2. 가장가까운 function 선언문이 없다면? 그것은 전역 스코프이다.
   끝!

다음의 코드를 보자. 서울에서 김서방을 불렀다면 어느 김서방이 대답을 할까?

```js
var 김서방 = "전국 김서방"

function 전국() {
  console.log(김서방)
}

function 서울() {
  var 김서방 = "서울 김서방"
  console.log(김서방)
}

function 부산() {
  var 김서방 = "부산 김서방"
  console.log(김서방)
}

서울() // ?
```

식별자는 자신이 어디에서 선언됐는지에 의해 자신이 유효한(다른 코드가 자신을 참조할 수 있는) 범위를 갖는다.

위 예제에서 전역에 선언된 변수 `김서방`은 어디에든 참조할 수 있다. 하지만 함수 `서울`내에서 선언된 변수 `김서방`은 선언된 내부에서만 참조할 수 있고 함수 외부에서는 참조할 수 없다. 이러한 규칙을 스코프라고 한다.

만약 스코프가 없다면 어떻게 될까? 스코프가 없다면 같은 식별자 이름은 충돌을 일으키므로 프로그램 전체에서 하나 밖에 사용할 수 없다. `김서방`이라는 이름의 변수를 프로그램 전체에서 한번 밖에 사용하지 못할 것이다.

#2. 스코프의 구분

자바스크립트에서 스코프를 구분해보면 다음과 같이 2가지로 나눌 수 있다.

- 전역 스코프 (Global scope)

  코드 어디에서든지 참조할 수 있다.

- 지역 스코프 (Local scope or Function-level scope)

  함수 코드 블록이 만든 스코프로 함수 자신과 하위 함수에서만 참조할 수 있다.

모든 변수는 스코프를 갖는다. 변수의 관점에서 스코프를 구분하면 다음과 같이 2가지로 나눌 수 있다.

- 전역 변수 (Global variable)

  전역에서 선언된 변수이며 어디에든 참조할 수 있다.

- 지역 변수 (Local variable)

  지역(함수) 내에서 선언된 변수이며 그 지역과 그 지역의 하부 지역에서만 참조할 수 있다.

**변수는 선언 위치(전역 또는 지역)에 의해 스코프를 가지게 된다. 즉, 전역에서 선언된 변수는 전역 스코프를 갖는 전역 변수이고, 지역(자바스크립트의 경우 함수 내부)에서 선언된 변수는 지역 스코프를 갖는 지역 변수가 된다.**

**전역 스코프를 갖는 전역 변수는 전역(코드 어디서든지)에서 참조할 수 있다. 지역(함수 내부)에서 선언된 지역 변수는 그 지역과 그 지역의 하부 지역에서만 참조할 수 있다.**

#3. 자바스크립트 스코프의 특징

자바스크립트의 스코프는 타 언어와는 다른 특징을 가지고 있다.

대부분의 C-family language는 **블록 레벨 스코프(block-level scope)**를 따른다. 블록 레벨 스코프란 코드 블록({…})내에서 유효한 스코프를 의미한다. 여기서 “유효하다”라는 것은 “참조(접근)할 수 있다”라는 뜻이다.

```c
int main(void) {
  // block-level scope
  if (1) {
    int x = 5;
    printf("x = %d\n", x);
  }

  printf("x = %d\n", x); // use of undeclared identifier 'x'

  return 0;
}
```

위의 C언어 코드를 보면 if문 내에서 선언된 변수 x는 if문 코드 블록 내에서만 유효하다. 즉, if문 코드 블록 밖에서는 참조가 불가능하다.

하지만 자바스크립트는 **함수 레벨 스코프(function-level scope)**를 따른다. 함수 레벨 스코프란 함수 코드 블록 내에서 선언된 변수는 함수 코드 블록 내에서만 유효하고 함수 외부에서는 유효하지 않다(참조할 수 없다)는 것이다.

단, ECMAScript 6에서 도입된 let keyword를 사용하면 **블록 레벨 스코프**를 사용할 수 있다.

```js
var x = 0
{
  var x = 1
  console.log(x) // 1
}
console.log(x) // 1

let y = 0
{
  let y = 1
  console.log(y) // 1
}
console.log(y) // 0
```

#4. 전역 스코프(Global scope)

전역에 변수를 선언하면 이 변수는 어디서든지 참조할 수 있는 전역 스코프를 갖는 전역 변수가 된다. var 키워드로 선언한 전역 변수는 전역객체 `window`의 프로퍼티이다.

```js
var global = "global"

function foo() {
  var local = "local"
  console.log(global)
  console.log(local)
}
foo()

console.log(global)
console.log(local) // Uncaught ReferenceError: local is not defined
```

변수 global는 함수 영역 밖의 전역에서 선언되었다. 자바스크립트는 타 언어와는 달리 특별한 시작점(Entry point)이 없어서 위 코드와 같이 전역에 변수나 함수를 선언하기 쉽다.

C언어의 경우 main 함수가 시작점이 되기 때문에 대부분은 코드는 main 함수 내에 포함된다. C언어의 경우 전역 변수를 선언하기 위해서는 의도적으로 main 함수 밖에 변수를 선언하여야 한다.

```c
#include <stdio.h>

/* global variable declaration */
int g;

int main () {

  // local variable declaration
  int a, b;

  // actual initialization
  a = 10;
  b = 20;
  g = a + b;

  printf ("value of a = %d, b = %d and g = %d\n", a, b, g);

  return 0;
}
```

하지만 자바스크립트는 다른 C-family language와는 달리 특별한 시작점이 없으며 코드가 나타나는 즉시 해석되고 실행된다. 따라서 전역에 변수를 선언하기 쉬우며 이것는 전역 변수를 남발하게 하는 문제를 야기시킨다.

전역 변수의 사용은 변수 이름이 중복 될 수 있고, **의도치 않은 재할당에 의한 상태 변화로 코드를 예측하기 어렵게 만드므로 사용을 억제하여야 한다.**

#5. 비 블록 레벨 스코프(Non block-level scope)

```js
if (true) {
  var x = 5
}
console.log(x)
```

변수 x는 코드 블록 내에서 선언되었다. 하지만 자바스크립트는 블록 레벨 스코프를 사용하지 않으므로 **함수 밖에서 선언된 변수는 코드 블록 내에서 선언되었다할지라도 모두 전역 스코프**을 갖게된다. 따라서 변수 x는 전역 변수이다.

#6. 함수 레벨 스코프(Function-level scope)

```js
var a = 10 // 전역변수

;(function() {
  var b = 20 // 지역변수
})()

console.log(a) // 10
console.log(b) // "b" is not defined
```

자바스크립트는 함수 레벨 스코프를 사용한다. 즉, 함수 내에서 선언된 매개변수와 변수는 함수 외부에서는 유효하지 않다. 따라서 변수 b는 지역 변수이다.

```js
var x = "global"

function foo() {
  var x = "local"
  console.log(x)
}

foo() // local
console.log(x) // global
```

전역변수 x와 지역변수 x가 중복 선언되었다. 전역 영역에서는 전역변수만이 참조 가능하고 함수 내 지역 영역에서는 전역과 지역 변수 모두 참조 가능하나 위 예제와 같이 변수명이 중복된 경우, 지역변수를 우선하여 참조한다.

다음은 함수 내에 존재하는 함수인 내부 함수의 경우를 살펴보자.

```js
var x = "global"

function foo() {
  var x = "local"
  console.log(x)

  function bar() {
    // 내부함수
    console.log(x) // ?
  }

  bar()
}
foo()
console.log(x) // ?
```

내부함수는 자신을 포함하고 있는 외부함수의 변수에 접근할 수 있다. 이는 매우 유용하다. 클로저에서와 같이 내부함수가 더 오래 생존하는 경우, 타 언어와는 다른 움직임을 보인다.

함수 bar에서 참조하는 변수 x는 함수 foo에서 선언된 지역변수이다. 이는 실행컨텍스트의 스코프 체인에 의해 참조 순위에서 전역변수 x가 뒤로 밀렸기 때문이다.

```js
var x = 10

function foo() {
  x = 100
  console.log(x)
}
foo()
console.log(x) // ?
```

함수(지역) 영역에서 전역변수를 참조할 수 있으므로 전역변수의 값도 변경할 수 있다. 내부 함수의 경우, 전역변수는 물론 상위 함수에서 선언한 변수에 접근/변경이 가능하다.

```js
var x = 10

function foo() {
  var x = 100
  console.log(x)

  function bar() {
    // 내부함수
    x = 1000
    console.log(x) // ?
  }

  bar()
}
foo()
console.log(x) // ?
```

중첩 스코프는 가장 인접한 지역을 우선하여 참조한다.

```js
var foo = function() {
  var a = 3,
    b = 5

  var bar = function() {
    var b = 7,
      c = 11

    // 이 시점에서 a는 3, b는 7, c는 11

    a += b + c

    // 이 시점에서 a는 21, b는 7, c는 11
  }

  // 이 시점에서 a는 3, b는 5, c는 not defined

  bar()

  // 이 시점에서 a는 21, b는 5
}
```

#7. 렉시컬 스코프

아래 예제의 실행 결과를 예측해보자.

```js
var x = 1

function foo() {
  var x = 10
  bar()
}

function bar() {
  console.log(x)
}

foo() // ?
bar() // ?
```

위 예제의 실행 결과는 함수 bar의 상위 스코프가 무엇인지에 따라 결정된다. 두가지 패턴을 예측할 수 있는데 첫번째는 함수를 어디서 호출하였는지에 따라 상위 스코프를 결정하는 것이고 두번째는 함수를 어디서 선언하였는지에 따라 상위 스코프를 결정하는 것이다. 첫번째 방식으로 함수의 상위 스코프를 결정한다면 함수 bar의 상위 스코프는 함수 foo와 전역일 것이고, 두번째 방식으로 함수의 스코프를 결정한다면 함수 bar의 스코프는 전역일 것이다.

프로그래밍 언어는 이 두가지 방식 중 하나의 방식으로 함수의 상위 스코프를 결정한다. 첫번째 방식을 동적 스코프(Dynamic scope)라 하고, 두번째 방식을 렉시컬 스코프(Lexical scope) 또는 정적 스코프(Static scope)라 한다. 자바스크립트를 비롯한 대부분의 프로그래밍 언어는 렉시컬 스코프를 따른다.

**렉시컬 스코프는 함수를 어디서 호출하는지가 아니라 어디에 선언하였는지에 따라 결정된다.** 자바스크립트는 렉시컬 스코프를 따르므로 함수를 선언한 시점에 상위 스코프가 결정된다. 함수를 어디에서 호출하였는지는 스코프 결정에 아무런 의미를 주지 않는다. 위 예제의 함수 bar는 전역에 선언되었다. 따라서 함수 bar의 상위 스코프는 전역 스코프이고 위 예제는 전역 변수 x의 값 1을 두번 출력한다.

#8. 암묵적 전역 변수

아래 예제의 실행 결과를 예측해보자.

```js
function foo() {
  x = 10
}

foo()
console.log(x) // ?
```

함수 foo 내에 선언되지 않은 변수 x에 값 1을 할당하였다. 이때 변수 x의 참조를 찾아야 변수 x에 값을 할당할 수 있기 때문에 자바스크립트 엔진은 스코프 체인에서 변수 x를 검색하기 시작한다.

자바스크립트 엔진은 먼저 foo 함수의 스코프에서 변수 x를 검색한다. foo 함수의 스코프에는 변수 x에 대한 변수 선언이 없으므로 검색에 실패할 것이고, foo 함수의 상위 컨텍스트(위 예제의 경우 전역 스코프)에서 변수 x를 검색한다.

전역 스코프에도 변수 x가 존재하지 않기 때문에 ReferenceError를 발생시킬 것 같지만 전역 변수x를 암묵적으로 생성하고 값을 할당한다. 이와 같이 var 키워드를 생략한 변수는 암묵적으로 전역 변수가 된다. 이러한 변수를 **암묵적 전역 변수(implicit global)**라 한다.

개발자의 의도와는 상관없이 동작하는 암묵적 전역 변수는 오류의 발생 원인이 될 가능성이 크므로 변수를 선언할 때는 반드시 var 키워드를 사용하여야 한다.

#9. 변수 이름의 중복

아래와 같이 2개의 분리된 자바스크립트 파일이 있다고 가정하자.

```js
// x.js
function foo() {
  // var i = 0;
  i = 0
  // ...
}

// y.js
for (var i = 0; i < 5; i++) {
  foo()
  console.log(i)
}
```

x.js와 y.js에 모두 변수 i가 존재한다. 이는 의도하지 않은 것이다. HTML에서 이 2개의 자바스크립트 파일을 로드하면 변수 i는 중복된다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script src="x.js"></script>
    <script src="y.js"></script>
  </body>
</html>
```

x.js의 변수 i는 var 키워드를 사용하지 않았으므로 암묵적으로 전역 변수화 되고 y.js의 변수 i는 전역변수이다. 이때 자바스크립트는 변수명의 중복을 허용하므로 어떠한 에러 메시지도 발생시키지 않는다. 따라서 무한 반복 상태에 빠지게 된다.

이와 같이 전역변수의 무분별한 사용은 무척 위험하다. **전역변수를 반드시 사용하여야 할 이유를 찾지 못한다면 지역변수를 사용하여야 한다. 변수의 범위인 스코프는 좁을수록 좋다.**

코드가 길어지면 변수명의 중복이 발생하기 쉬워 예기치 못한 이상 동작의 원인이 되기 쉬우며, 전역변수는 지역변수보다 탐색에 걸리는 시간이 더 길다.(속도면에서 그리 큰 차이는 없지만 분명히 느리다.)

#10. 최소한의 전역변수 사용

전역변수 사용을 최소화하는 방법 중 하나는 애플리케이션에서 전역변수 사용을 위해 다음과 같이 전역변수 객체 하나를 만들어 사용하는 것이다. (더글라스 크락포드의 제안)

```js
var MYAPP = {}

MYAPP.student = {
  name: "Lee",
  gender: "male",
}

console.log(MYAPP.student.name)
```

#11. 즉시실행함수를 이용한 전역변수 사용 억제

전역변수 사용을 억제하기 위해, 즉시 실행 함수(IIFE, Immediately-Invoked Function Expression)를 사용할 수 있다. 이 방법을 사용하면 전역변수를 만들지 않으므로 라이브러리 등에 자주 사용된다. 즉시 실행 함수는 즉시 실행되고 그 후 전역에서 바로 사라진다.

```js
;(function() {
  var MYAPP = {}

  MYAPP.student = {
    name: "Lee",
    gender: "male",
  }

  console.log(MYAPP.student.name)
})()

console.log(MYAPP.student.name)
```

# Reference

- [JavaScript : The Good Parts 03.Object -by Douglas Crockford](http://www.yes24.com/24/goods/3071412?scode=032&OzSrank=1)
- [poiemaweb-scope](https://poiemaweb.com/js-scope)
