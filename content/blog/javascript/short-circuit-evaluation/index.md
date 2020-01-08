---
title: Short-circuit Evaluation
date: "2019-12-30T20:43:02.118Z"
description: "Javascript Short-circuit Evaluation"
---

# Short-circuit Evaluation(단축 평가)

## 내가 이해한 단축 평가란

계속 보다보면 헷갈린다. 이해하는데 1시간 걸렸다. ㅜㅜ
내가 내린 결론은!
논리곱 연산자와 논리합 연산자는 꼭 true나 false만 리턴되는게 아니다.

단축평가(`값 && 값` 또는 `값 || 값` )를 사용하면 ?
평가를 중단하게 된 계기가 되는 값을 반환한다!
너 땜시 .. 이 값은 보나마나 이거야! 그러니 이 평가의 결과는 너야 라고 결정하는 것이다.

아래 예제를 살펴보자.

```js
"Cat" && "Dog" // “Dog”
```

- `Cat`은 Truthy이네 ... 흠 뒤에 값이 무엇인지 알아야 요기 논리곱의 평가가 가능하겠어..! 뒤에 값(`Dog`)이 결국 요기의 표현식을 결정하겠네..?
  그러므로 요기의 결과 값은 뒤에 값(`Dog`)이야!

논리곱 연산자 `&&`는 두개의 피연산자가 모두 `true`로 평가될 때 `true`를 반환한다. 대부분의 연산자가 그렇듯이 논리곱 연산자도 왼쪽에서 오른쪽으로 평가가 진행된다.

1. 첫번째 피연산자 ‘Cat’은 Truthy 값이므로 `true`로 평가된다. 하지만 이 시점까지는 위 표현식을 평가할 수 없다. 두번째 피연산자까지 평가해 보아야 위 표현식을 평가할 수 있다.
2. 두번째 피연산자 ‘Dog’은 Truthy 값이므로 `true`로 평가된다. 이때 두개의 피연산자가 모두 `true`로 평가되었다. 
3. 이때 논리곱 연산의 결과를 결정한 것은 두번째 피연산자 ‘Dog’다.
4. 논리곱 연산자 `&&`는 **논리 연산의 결과를 결정한 두번째 피연산자의 평가 결과 즉, 문자열 ‘Dog’를 그대로 반환한다.**

논리합 연산자 `||`도 논리곱 연산자 `&&`와 동일하게 동작한다.

```js
"Cat" || "Dog" // 'Cat'
```

- `Cat`이 Truthy이네 ... 흠 뒤에 값은 보나마나 요기의 논리합의 평가는 너(`Cat`)로 인해 결정되겠군!
  그러므로 요기의 결과값은 `Cat`!!

논리합 연산자 `||`는 두개의 피연산자 중 하나만 `true`로 평가되어도 `true`를 반환한다. 대부분의 연산자가 그렇듯이 논리합 연산자도 왼쪽에서 으로 평가가 진행된다.

1. 첫번째 피연산자 ‘Cat’은 Truthy 값이므로 `true`로 평가된다. 이 시점에 두번째 피연산자까지 평가해 보지 않아도 위 표현식을 평가할 수 있다.
2. 논리합 연산자 `||`는 **논리 연산의 결과를 결정한 첫번째 피연산자의 평가 결과 즉, 문자열 ‘Cat’를 그대로 반환한다.**

논리곱 연산자 `&&`와 논리합 연산자 `||`는 이와 같이 **논리 평가를 결정한 피연산자의 평가 결과를 그대로 반환한다.** 

이를 **단축 평가(Short-Circuit evaluation)**라 부른다. 단축 평가는 아래의 규칙을 따른다.

|      단축 평가 표현식      | 평가 결과    |
| :-----------------: | :------- |
| true \|\| anything  | true     |
| false \|\| anything | anything |
|  true && anything   | anything |
|  false && anything  | false    |

```js
// 논리합(||) 연산자
"Cat" || "Dog" // 'Cat'
false || "Dog" // 'Dog'
"Cat" || false // 'Cat'

// 논리곱(&&) 연산자
"Cat" && "Dog" // Dog
false && "Dog" // false
"Cat" && false // false
```

단축 평가는 아래와 같은 상황에서 유용하게 사용된다.

아직 살펴보지 않은 객체와 함수에 대한 내용이 나와서 혼란스러울 수 있겠다. 

지금은 아래와 같은 단축 평가의 유용한 패턴이 있다는 정도로 이해하고 넘어가도 좋다. 

객체와 함수에 대해서는 해당 장에서 자세히 살펴볼 것이다.

- 객체가 null인지 확인하고 프로퍼티를 참조할 때

```js
var elem = null

console.log(elem.value) // TypeError: Cannot read property 'value' of null
console.log(elem && elem.value) // null
```

- `elem`이 null이네.. 이건 falsy 값이야 흠 뒤에 값은 보나마나 요기의 논리합의 평가는 너(`elem`)로 인해 결정되겠군!
  그러므로 요기의 결과값은 `elem` 즉 null!!

객체는 키(key)과 값(value)으로 구성된 프로퍼티(Property)들의 집합이다. 

만약 객체가 null인 경우, 객체의 프로퍼티를 참조하면 타입 에러(TypeError)가 발생한다. 

이때 단축 평가를 사용하면 에러를 발생시키지 않는다.

- 함수의 인수(argument)를 초기화할 때

```js
// 단축 평가를 사용한 매개변수의 기본값 설정
function getStringLength(str) {
  str = str || ""
  return str.length
}

getStringLength() // 0
getStringLength("hi") // 2

// ES6의 매개변수의 기본값 설정
function getStringLength(str = "") {
  return str.length
}

getStringLength() // 0
getStringLength("hi") // 2
```

- `str`이 undefined이네.. 이건 falsy 값이야 흠 뒤에 값을 확인해야 요기의 논리합을 평가할 수 있겠어 평가는 뒤에 값(`''`)으로 인해 결정되겠군!
  그러므로 요기의 결과값은 `''` 이다
  str에 falsy한 값이 들어온다면 뒤에 값으로 초기화 되겠네!!

함수를 호출할 때 인수를 전달하지 않으면 매개변수는 undefined를 갖는다. 

이때 단축 평가를 사용하여 매개변수의 기본값을 설정하면 undefined로 인해 발생할 수 있는 에러를 방지할 수 있다.

## 출처

- [poiemaweb-scope](https://poiemaweb.com)
