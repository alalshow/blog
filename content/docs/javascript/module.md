---
title: Module
date: "2020-01-18T20:22:22.562Z"
description: "Javascript Module"
---

## Table of Contents

```toc
exclude: Table of Contents
from-heading: 1
to-heading: 6
```

# 1. 모듈

ES6의 모듈은 기능에 따라 js코드들을 파일 별로 넣어놓고 필요할 때 로드하여 사용하는 것을 의미한다.
모듈 기능 지원하기 전의 자바스크립트는 js파일 여러개를 한 번에 로드 하였을 경우 하나의 전역을 공유하게 되어
전역변수가 중복되는 등의 문제가 발생할 수 있다.

```js
// foo.js
var x = "foo"

// 변수 x는 전역 변수이다.
console.log(window.x) // foo
```

```js
// bar.js
// foo.js에서 선언한 전역 변수 x와 중복된 선언이다.
var x = "bar"

// 변수 x는 전역 변수이다.
// foo.js에서 선언한 전역 변수 x의 값이 재할당되었다.
console.log(window.x) // bar
```

```js
<!DOCTYPE html>
<html>
<body>
  <script src="foo.js"></script>
  <script src="bar.js"></script>
</body>
</html>
```

두 개의 js파일을 로드하였을 경우 같은 이름으로 선언한 변수 `x`가 중복되어 개발자가 의도한대로 프로그램이 동작하지 않을 가능성이 높아진다.

이러한 문제를 해결하기 위해 ES6는 모듈 기능을 지원한다.

이 모듈기능을 사용하면 js파일별로 스코프를 사용하게 되어 변수의 충돌을 방지할 수 있다.

# 2. 파일확장자 mjs

대신 Node js에서 import , export 모듈을 사용하려면 파일 확장자가 `mjs`가 되어야 한다.
<br>
확장자가 `js` 인 파일에서 import 했더니 다음과 같은 오류 메시지가 떴다.
![image](https://user-images.githubusercontent.com/17464007/72663416-ec476100-3a35-11ea-94fb-ea39904ad764.png)

# 3. export 키워드

모듈은 독자적인 모듈 스코프를 갖기 때문에 모듈 안에 선언한 모든 식별자는 기본적으로 해당 모듈 내부에서만 참조할 수 있다. 만약 모듈 안에 선언한 식별자를 외부에 공개하여 다른 모듈들이 참조할 수 있게 하고 싶다면 export 키워드를 사용한다. 선언된 변수, 함수, 클래스 모두 export할 수 있다.

<br>
모듈을 공개하려면 선언문 앞에 export 키워드를 사용한다. 여러 개를 export할 수 있는데 이때 각각의 export는 이름으로 구별할 수 있다.

```js
// lib.mjs
// 변수의 공개
export const pi = Math.PI

// 함수의 공개
export function square(x) {
  return x * x
}

// 클래스의 공개
export class Person {
  constructor(name) {
    this.name = name
  }
}
```

<br>
선언문 앞에 매번 export 키워드를 붙이는 것이 싫다면 export 대상을 모아 하나의 객체로 구성하여 한번에 export할 수도 있다.

```js
// lib.mjs
const pi = Math.PI

function square(x) {
  return x * x
}

class Person {
  constructor(name) {
    this.name = name
  }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export { pi, square, Person }
```

# 4. import 키워드

모듈에서 공개(export)한 대상을 로드하려면 import 키워드를 사용한다.

<br>
모듈이 export한 식별자로 import하며 ES6 모듈의 파일 확장자를 생략할 수 없다.

```js
// app.mjs
// 같은 폴더 내의 lib.mjs 모듈을 로드.
// lib.mjs 모듈이 export한 식별자로 import한다.
// ES6 모듈의 파일 확장자를 생략할 수 없다.
import { pi, square, Person } from "./lib.mjs"

console.log(pi) // 3.141592653589793
console.log(square(10)) // 100
console.log(new Person("Lee")) // Person { name: 'Lee' }
```

<br>
모듈이 export한 식별자를 각각 지정하지 않고 하나의 이름으로 한꺼번에 import할 수도 있다.  
이때 import되는 식별자는 as 뒤에 지정한 이름의 객체에 프로퍼티로 할당된다.

```js
// app.mjs
import * as lib from "./lib.mjs"

console.log(lib.pi) // 3.141592653589793
console.log(lib.square(10)) // 100
console.log(new lib.Person("Lee")) // Person { name: 'Lee' }
```

<br>
이름을 변경하여 import할 수도 있다.

```js
// app.mjs
import { pi as PI, square as sq, Person as P } from "./lib.mjs"

console.log(PI) // 3.141592653589793
console.log(sq(2)) // 4
console.log(new P("Kim")) // Person { name: 'Kim' }
```

# 4. default

모듈에서 하나만을 export할 때는 default 키워드를 사용할 수 있다.
참고: 모듈을 여러개 export했는데 default키워드를 사용하면 import 하는 쪽에서 못받는다.

```js
// lib.mjs
export default function(x) {
  return x * x
}
```

<br>
다만, default를 사용하는 경우, var, let, const는 사용할 수 없다.

```js
// lib.mjs
export default () => {};
// => OK

export default const foo = () => {};
// => SyntaxError: Unexpected token 'const'
```

<br>
default 키워드와 함께 export한 모듈은 {} 없이 임의의 이름으로 import한다.

```js
// app.mjs
import square from "./lib.mjs"

console.log(square(3)) // 9
```

<br>
브라우저가 지원하는 ES6 모듈 기능을 이용하여 import와 export가 동작하는지 확인해보자.

```js
// lib.mjs
export default x => x * x
// app.mjs
// 브라우저 환경에서는 모듈의 파일 확장자를 생략할 수 없다.
// 모듈의 파일 확장자는 .mjs를 권장한다.
import square from "./lib.mjs"

console.log(square(10)) // 100
```

```js
<!DOCTYPE html>
<html>
<body>
  <script type="module" src="./lib.js"></script>
  <script type="module" src="./app.js"></script>
</body>
</html>
```

위 HTML을 실핼해보면 콘솔에 100이 출력되는 것을 확인할 수 있다.
