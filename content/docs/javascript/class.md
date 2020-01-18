---
title: Class
date: "2020-01-17T17:55:02.182Z"
description: "Javascript Class"
---

## Table of Contents

```toc
exclude: Table of Contents
from-heading: 1
to-heading: 6
```

# Class

## 개념

### 자바에서 Class의 개념

ES6에서 Class 키워드가 새롭게 추가되었다. 자바를 공부할 때 Class를 공부해서 자바스크립트 Class의 개념을 이해하는 것은
어렵지는 않았다. 나는 Class를 붕어빵 만들 때 쓰는 붕어빵틀로 이해를 했다.  
붕어빵을 만들 때 붕어빵 틀에 붕어빵을 어떻게 만들 것인지 먼저 그려놓고 그것에 맞춰서 붕어빵을 생성하듯  
개발자는 Class에 데이터가 어떻게 구성 되어있는지 정의해 놓고, New라는 키워드를 통해 Class의 인스턴스를 만들어내는 것이다.

### 상속의 개념

상속은 부모의 Class(데이터 타입)가 가지고 있는 정보를 자식 Class가 물려 받는 것을 의미한다.  
상속을 할 때는 extends라는 키워드를 사용하는데 extend는 넓히다, 확장하다 라는 뜻이다.
예를 들어 `class Child extends Parent` 를 문자 그대로 해석하면 Child 클래스는 부모 'Parent'에서 넓혀졌다는 것을 의미한다.
왜 상속을 의미하는 inheritance 대신에 extends라는 키워드를 썼을까? extends의 의미는 무엇을 뜻할까?

아래의 그림을 보면 이해가 쉽다.

![image](https://user-images.githubusercontent.com/17464007/72621912-78e61680-3985-11ea-9fe6-1485d9d6d78e.png)

Parent 영역에서 Child가 확장되어 있는 모습을 볼 수 있다.  
Child는 Parent를 포함하고 있으므로 Parent의 자원들을 쓸 수 있다.
Parent와 Child에 똑같은 이름으로 선언 된 메서드 있으면 Child에서 정의한 메서드로 덮어 씌워진다.
이것을 메서드 오버라이딩이라고 부른다.

### 자바스크립트 상속

ES6의 class가 나오기 전에는 어떻게 상속을 구현했을까?  
ES5 까지는 prototype을 사용하여 상속을 구현하였다.
(\* 사실 ES6의 class 자체도 내부적으로 살펴보면 프로토타입 기반의 상속이다.)
어쨌든 어떻게 이 prototype을 이용해 상속을 구현했는지 알아보자.

### prototype 이란

자바스크립트는 prototype기반의 언어라고 부른다.
prototype이란 쉽게 말해 모든 객체가 가지고 있는 원형의 정보를 담아둔 붕어빵 틀로 보면 된다.
객체를 만들 때 대상이 되는 객체의 prototype을 가리키게 하면 이것을 우아한 말로 프로토타입 체인이라고 부르고
이 특징을 가지고 상속을 구현할 수 있다.

아래 코드를 보자

```js
// 부모 생성자 함수
var Parent = (function() {
  // Constructor
  function Parent(name) {
    this.name = name
  }

  // method
  Parent.prototype.sayHi = function() {
    console.log("Hi! " + this.name)
  }

  // return constructor
  return Parent
})()

// create 함수의 인수는 프로토타입이다. 새로 생성되는 객체가 Parent.prototype을 가리키게 한다.
var child = Object.create(Parent.prototype)
child.name = "child"

child.sayHi() // Hi! child

console.log(child instanceof Parent) // true
```

위의 코드를 보면 새로 만들어진 child객체가 `sayHi` 메서드를 호출했는데 호출이 되었다.
이와 같이 부모의 대상이되는 객체의 protoype을 가리키게 하면 부모의 prototype이 가지고 있는 자원을 사용할 수 있다.
이것은 코드의 재사용성 측면에서 매우 중요한 개념이다.
왜냐하면 공통적인 코드를 하나의 객체의 prototype에 정의해두면 이것을 사용해 코드의 중복을 방지할 수 있기 떄문이다.

# 1. class

## 1.1 기본 사용법

이제 대망의 ES6의 class를 알아보자

```js
class Parent {
  constructor(name) {
    this._name = name
  }

  sayHi() {
    console.log(`안녕! ${this._name} 난 너의 엄마`)
  }
}

// 클래스 선언문
class Child extends Parent {
  // constructor(생성자)
  constructor(name) {
    super(name) //부모 생성자 호출
    this._name = name
  }
  //부모의 sayHi를 재정의 (메서드 오버라이딩)
  sayHi() {
    super.sayHi()
    console.log(`Hi! ${this._name}`)
  }
}

// 인스턴스 생성
const me = new Child("Lee")
me.sayHi() // 안녕! Lee 난 너의 엄마 \n Hi! Lee

console.log(me instanceof Child) // true
```

- `sayHi`는 뭔가 function 처럼 생겼는데 function이라는 용어가 없다. 생략되었는지 알고 function을 넣어봤는데 안나온다. 주의하자
- `${this._name}` 이 부분은 ES6에서 나온 리터럴 문자열이라는 놈인데 변수를 문자열로 표시할 때 쿨한 문법이다.

### 1.1.1 class 명은 파스칼 표기

`class Person` class는 모두 소문자 뒤의 이름은 파스칼 표기법을 따른다. 모두 소문자로 해도 되지만 파스칼이 암묵적 약속이다.

### 1.1.2 constructor

- `constructor`라는 녀석은 생성자를 뜻한다. 자바에서는 Class 이름 그대로 정의하면 되는데 얘는 조금 특이하다.
- constructor는 class 내에서 객체를 생성하고 초기화 하기 위해 만들어진 특별한 메서드이다.
- 이 이름의 메서드는 class 내부에 하나만 존재한다.
- constructor를 따로 정의 하지 않으면 기본적으로 생성된다.
- 이 메서드 내부에서 super를 호출하면 부모의 생성자(constructor)를 호출하고 인수를 전달한다. 부모의 생성자를 호출했으니 부모 인스턴스도 만들어진다.
- 만약 `super`를 호출하지 않으면 아래와 같은 에러가 난다. 이것은 super메서드를 호출하기 전에는 this를 참조할 수 없다는 것이다. 내가 생각하기에는(뇌피셜) 부모의 인스턴스가 생성되어야
  부모가 가지고 있는 데이터를 가져다 쓸 수 있기 때문에 꼭 호출해야 하지 않을까? 생각한다. this에 대한 자세한 내용은 추후에 살펴보도록 하겠다.

  > Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor

## 1.2 class는 호이스팅 안되나요?

되는데 안된다. (...뭔말..)

일단 호이스팅이 뭔지 부터 알아보자.
자바스크립트는 기본적으로 var, let, const, function, class 선언은 다 호이스팅 된다.
호이스팅이 뭐냐구? 잠깐 설명하자면 (...TMI)
JS엔진이 코드를 실행하기전에 모든 선언들을 위로 끌어 올려놓고 시작하는 것이다.

```js
console.log(i) // undefined
var i = 0
```

예를 들어 변수 `var i=0;`를 선언하기 전에 i라는 호출해서 console.log를 찍어보면 i가 undefiend로 나온다.
이것은 JS엔진이 먼저 var i 라는 선언을 먼저 끌어 올리고 undefiend로 초기화 하기 때문이다.

그럼 class도 선언하기 전에 호출해도 오류 안나겠네??

```js
console.log(Foo)
// ReferenceError: Cannot access 'Foo' before initialization

class Foo {}
```

오잉 Foo선언 전에 Foo를 눌렀더니 ReferenceError가 난다.

호이스팅 안되네??

아니 되는데..

근데 왜 에러가 날까? 그 이유는 class 키워드는 let이나 const처럼 선언 이전에 호출하면 [시적 사각지대(Temporal Dead Zone; TDZ)](https://medium.com/korbit-engineering/let%EA%B3%BC-const%EB%8A%94-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%EB%90%A0%EA%B9%8C-72fcf2fac365)에
빠지기 떄문에 에러가 난다.
