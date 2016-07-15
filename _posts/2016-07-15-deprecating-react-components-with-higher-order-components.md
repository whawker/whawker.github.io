---
layout: article
title:  "Easily deprecating React components using Higher Order Components (HOCs)"
summary: "A very simple example demonstrating the power of HOCs"
---
When maintaining medium to large sized codebases, sooner or later you're going to want to deprecate parts of it. React codebases are no different, at some point you'll want to replace a component with a bigger and better version.

One quick and easy solution to alerting other developers in your team when deprecated components are in use, is to wrap the deprecated component with a [higher order component](https://egghead.io/lessons/react-react-fundamentals-higher-order-components-replaces-mixins) (HOCs) sometimes known as decorators.

HOCs take a component as an argument and return another component, the advantage being that you can inject functionality into the wrapped component. This can be incredibly powerful, two great examples being [`reduxForm`](http://redux-form.com/5.3.1/#/api/reduxForm) of [Redux Form](http://redux-form.com) and [`injectIntl`](https://github.com/yahoo/react-intl/wiki/API#injection-api) of [React Intl](https://github.com/yahoo/react-intl).

### Usage

Simply wrap the export statement of your component with the "deprecated" HOC, optionally supplying an additional message.

```js
import deprecated from './helpers/deprecated';

class MyComponent extends React.Component { /* ... (omitted) ... */ }

export default deprecated(MyComponent, 'Please use MyOtherComponent instead');
```

### The HOC

This HOC will just display a console warning when in development mode.

```js
import React, { Component } from 'react';

const deprecated = (InnerComponent, msg = '') => class extends Component {
    componentWillMount () {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`${InnerComponent.name} is deprecated`, msg);
        }
    }

    render () {
        // Render the wrapped component with the same props
        return (
            <InnerComponent {...this.props} />
        );
    }
};

export default deprecated;
```

Of course you could ramp the warnings up to 11 and prevent the deprecated component being rendered at all. (Again, only in development mode).

```js
import React, { Component } from 'react';

const deprecated = (InnerComponent, msg = '') => class extends Component {
    componentWillMount () {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`${InnerComponent.name} is deprecated`, msg);
        }
    }

    render () {
        if (process.env.NODE_ENV === 'development') {
            return (
                <p>{`${InnerComponent.name} has been deprecated ${msg}`}</p>
            );
        }

        return (
            <InnerComponent {...this.props} />
        );
    }
};

export default deprecated;
```

Again this is a very simplistic HOC, but if they are a new concept to you, I highly recommend you investigate them. They rock.
