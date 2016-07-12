---
layout: article
title:  "ES6/ES2015 Object destructuring and assigning to new variable name"
summary: "A handy feature of object destructing that I missed"
---
ES6/ES2015 Object destructing allows us to extract properties of an object and assign them to variables, it is a built in shorthand that allows us to rewrite ES5 code like

```js
'use strict';

var _ref = { foo: 'lorem', bar: 'ipsum' };

// foo => lorem and bar => ipsum
var foo = _ref.foo;
var bar = _ref.bar;
```

as

```js
let {foo, bar} = {foo: 'lorem', bar: 'ipsum'};
// foo => lorem and bar => ipsum
```

The above snippet, takes the property named `foo` and assigns it to a variable, also named `foo` (likewise for `bar`). But what if you don't want a variable named `foo`; you want a variable named `baz` instead?

Turns out, this is already a feature of destructing, that I completely missed, and have since found to be very handy.

Building on the ES6 code snippet above, the way to reassign to a different variable names, is to use the `[propertyName] : [variableName]` syntax.

```js
let {foo: baz, bar: qux} = {foo: 'lorem', bar: 'ipsum'};
// baz => lorem and qux => ipsum
```

This comes in very handy for ReactJS's lifecycle methods, whenever you want to compare previous/next props to the current props (i.e. `shouldComponentUpdate`, `componentWillUpdate` or `componentDidUpdate`) and want to avoid a variable name clash.

```js
shouldComponentUpdate ({ createdAt: nextCreatedAt }) { // Destructure the function argument nextProps.createdAt as nextCreatedAt
    let { createdAt } = this.props;
    
    return nextCreatedAt > createdAt;
}
```