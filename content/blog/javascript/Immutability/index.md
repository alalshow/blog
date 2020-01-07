---
title: Javascript Immutability
date: "2020-01-07T09:36:02.182Z"
description: "Javascript Immutability"
---

## Immutability

'Immutability'란 말이 또 어렵다. ㅜㅜ 그런데 알고 보면 쉬운 말이다.
보통 'mutable'이란 단어는 변할 수 있다는 의미를 가지고 있다.
돌연변이를 영어로는 'mutation' 이라고 부른다.
mutablility에 부정을 뜻하는 접미사'im' 가 붙었으니 변할 수 없다는 뜻이 된다.
따라서 'immutable object'은 변할 수 없는 객체를 뜻한다.

## immutable object

함수형 프로그래밍에서 중요한 개념이다.
객체가 참조를 통해서 여러 곳에서 공유되고 언제든지 변경된다면
해당 object의 상태가 어떤 상태인지 헷갈리고 꼬이게 될 가능성이 높다.
따라서 객체를 변할 수 없는 상태(immutable object)로 만들고 해당객체를 복사해서 사용한다면
객체 공유를 통한 부작용을 줄일 수 있을 것이다.

1. immutable value vs. mutable value
   Javascript의 원시 타입(primitive data type)은 변경 불가능한 값(immutable value)이다.

- Boolean
- null
- undefined
- Number
- String
- Symbol (New in ECMAScript 6)
-

원시 타입 이외의 모든 값은 객체(Object) 타입이며 객체 타입은 변경 가능한 값(mutable value)이다. 즉, 객체는 새로운 값을 다시 만들 필요없이 직접 변경이 가능하다는 것이다.

예를 들어 살펴보자. C 언어와는 다르게 Javascript의 문자열은 변경 불가능한 값(immutable value) 이다. 이런 값을 “primitive values” 라 한다. (변경이 불가능하다는 뜻은 메모리 영역에서의 변경이 불가능하다는 뜻이다. 재할당은 가능하다)

아래의 코드를 살펴보자.

```javascript
var str = "Hello"
str = "world"
```

첫번째 구문이 실행되면 메모리에 문자열 ‘Hello’가 생성되고 식별자 str은 메모리에 생성된 문자열 ‘Hello’의 메모리 주소를 가리킨다. 그리고 두번째 구문이 실행되면 이전에 생성된 문자열 ‘Hello’을 수정하는 것이 아니라 새로운 문자열 ‘world’를 메모리에 생성하고 식별자 str은 이것을 가리킨다. 이때 문자열 ‘Hello’와 ‘world’는 모두 메모리에 존재하고 있다. 변수 str은 문자열 ‘Hello’를 가리키고 있다가 문자열 ‘world’를 가리키도록 변경되었을 뿐이다.

2. mutable value

```javascript
var user = {
  name: "Lee",
  address: {
    city: "Seoul",
  },
}
```

var myName = user.name; // 변수 myName은 string 타입이다.

user.name = 'Kim';
console.log(myName); // Lee

myName = user.name; // 재할당
console.log(myName); // Kim
user.name의 값을 변경했지만 변수 myName의 값은 변경되지 않았다. 이는 변수 myName에 user.name을 할당했을 때 user.name의 참조를 할당하는 것이 아니라 immutable한 값 ‘Lee’가 메모리에 새로 생성되고 myName은 이것을 참조하기 때문이다. 따라서 user.name의 값이 변경된다 하더라도 변수 myName이 참조하고 있는 ‘Lee’는 변함이 없다.

```javascript
var user1 = {
  name: "Lee",
  address: {
    city: "Seoul",
  },
}

var user2 = user1 // 변수 user2는 객체 타입이다.

user2.name = "Kim"

console.log(user1.name) // Kim
console.log(user2.name) // Kim
```

위의 경우 객체 user2의 name 프로퍼티에 새로운 값을 할당하면 객체는 변경 불가능한 값이 아니므로 객체 user2는 변경된다. 그런데 변경하지도 않은 객체 user1도 동시에 변경된다. 이는 user1과 user2가 같은 어드레스를 참조하고 있기 때문이다.

3. 불변 데이터 패턴(immutable data pattern)
   의도하지 않은 객체의 변경이 발생하는 원인의 대다수는 “레퍼런스를 참조한 다른 객체에서 객체를 변경”하기 때문이다. 이 문제의 해결 방법은 비용은 조금 들지만 객체를 불변객체로 만들어 프로퍼티의 변경을 방지하며 객체의 변경이 필요한 경우에는 참조가 아닌 객체의 방어적 복사(defensive copy)를 통해 새로운 객체를 생성한 후 변경한다.

이를 정리하면 아래와 같다.

객체의 방어적 복사(defensive copy)
Object.assign
불변객체화를 통한 객체 변경 방지
Object.freeze
