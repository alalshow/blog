---
title: Closure
date: "2019-12-29T17:55:02.182Z"
description: "Javascript Closure"
---

# Closure

## 서문

- 클로저를 알기위해 많은 블로그와 자료들을 찾아봤는데 용어들이 생소하고 어려운 것들이 많았다. 모든 공부가 그러하듯 새로운 단어들이 주는 신선함(?) 때문에 이해를 어렵게 한다. 먼저 스코프, 렉시컬 스코프, 스코프 체인에 대한 개념을 익히는 것을 추천한다.

### 클로저를 이해하기 위해 먼저 알아야할 개념들

- Scope(유효범위)
- Lexical scope (어휘적 유효 범위)
- Scope Chain (유효 범위 체인)

### ECMAScript에 정의된 클로저란?

- ECMAScript에서 공식적으로 정의한 것은 없다. 클로저란 자바스크립트가 채용하고 있는 기술적 기반 혹은 테크닉으로 보면 된다. 자바의 디자인 패턴처럼 클로저도 자바스크립트가 가지고 있는 특징들을 이용한 기술이다. 따라서 블로그들 마다 정의된게 많고 한마디로 정의하긴 어렵다. 그래서 코드들을 예로 클로저의 느낌을 알면 좋을 것 같다.

### 클로저란?

- 접근하려고 하는 함수의 생명주기가 종료됬지만, 내부함수가 자유변수를 참조 하고 있어서 그 함수에 접근할 수 있는 함수이다.

```js
function outer() {
  var a = "I am Outer scope"
  var inner = function() {
    console.log(a)
  }
  return inner
}

var glovalOuter = outer()
glovalOuter() // I am Outer scope
```

`outer`함수가 실행종료되었으니 `a`변수 또한 접근할 수 없어야하는데 `inner`함수가 `a`변수를 참조하고 있어서 접근가능하다.

여기서 `glovalOuter` 또는 `inner`함수를 **클로저**라고 부르고 `a`변수를 **자유변수**라 부른다.

### Lexical Scope(부가설명)

변수들의 범위는 소스코드가 작성된 그 문맥에서 결정된다(Lexical Scope).

아래코드는 맨 윗줄에 전역객체로 `a`변수를 선언하였다.

```js
var a = "I am Global Scope"

function outer() {
  var a = "I am Outer Scope"
  var inner = function() {
    console.log(a)
  }
  return inner
}

var glovalOuter = outer()
glovalOuter()
```

`glovalOuter`함수를 실행하면 어떤 `a`가 출력이 될까?

정답은 `outer` 함수의 `a`변수 즉 `'I am Outer Scope'`이 출력된다.

`inner`함수 안의 a변수는 소스코드가 작성될 때 이미 Scope Chain을 통해 `outer`함수 환경을 outer lexical scope로 정해졌다. Scope Chain 규칙은 자기 자신의 lexical scope에서 먼저 찾고 그 다음 가깝게 인접한 함수에서 scope를 찾는다. 만약 자바스크립트가 동적 스코프(Dynamic scope) 방식을 따랐다면 `glovalOuter`함수가 실행될 시점의 `a`변수 값인 `"I am Global Scope"`을 출력했을 것이다.

## 클로저 사용 예시

### 자바의 private method를 흉내낸 클로저

클로저의 사용예시로 자바의 private method를 흉내낸 모듈패턴이라는 것이 있다.

```js
var counter = (function() {
  var privateCounter = 0
  function changeBy(val) {
    privateCounter += val
  }
  return {
    increment: function() {
      changeBy(1)
    },
    decrement: function() {
      changeBy(-1)
    },
    value: function() {
      return privateCounter
    },
  }
})()

var counter1 = makeCounter()
var counter2 = makeCounter()
alert(counter1.value()) /* 0 */
counter1.increment()
counter1.increment()
alert(counter1.value()) /* 2 */
counter1.decrement()
alert(counter1.value()) /* 1 */
alert(counter2.value()) /* 0 */
```

`counter`를 실행하면 하나의 익명함수가 실행된다. 이 익명함수 안에는 두 개의 private 아이템이 포함된다. 하나는 `privateCounter`변수이고 하나는 `changeBy`함수이다. 이 private 요소들은 선언된 당시에 참조하는 세 개의 클로저 함수들(`increment`, `decrement`, `value`)에 의해서만 접근가능하다.

## 참조

- [NHN Ent. 기술 블로그 : 자바스크립트의 스코프와 클로저](https://meetup.toast.com/posts/86)

- [MDN : 클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)

- [Jei's blog 블로그 - 클로저(closure)란?](https://fullest-sway.me/blog/2017/11/13/js-closure/)
