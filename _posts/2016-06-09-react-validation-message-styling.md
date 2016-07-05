---
layout: article
title:  "ReactJS: Styling the input validationMessage text"
summary: "Extracting the validationMessage property into a styleable DOM element"
---
Modern browsers (IE10+) that support the [Constraint Validation API](http://www.html5rocks.com/en/tutorials/forms/constraintvalidation/) provide a `validationMessage` property ([MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Data_form_validation#The_HTML5_constraint_validation_API)) on input fields. This is the string that would be shown if we called the `checkValidity()` method on the input field. In there are no errors, `validationMessage` is the empty string.

This property is particularly useful as gives descriptive, localised validation error messages; meaning you don't need to go to the effort of writing complex validation logic that you then need to translate to all the different languages your application supports.

By default, this message is shown to the user in a popup bubble, which you are unable to style. Presenting this message in a element that you *can* style, is a problem that has been solved [several](http://developer.telerik.com/featured/building-html5-form-validation-bubble-replacements/) [times](http://lecklider.com/2015/08/customizing-native-form-validation.html) [before](http://jsfiddle.net/shannonhochkins/wJkVS/) in vanilla js/other frameworks. But how do you go about achieving the same in React?

My solution is to utilise a wrapper component. This wrappers reads the `validationMessage` property from the input child node and displays it after the input field, (if the message is non empty).

### Example Usage
```
<ValidationMessageWrapper className="error" /* other HTML attribute props */>
    <label htmlFor="user-email">Email:</label>
    <input type="email" id="user-email" required onChange={this.myOnChangeHandler} />
</ValidationMessageWrapper>
```

### Props

<table class="table table-striped table-bordered table-condensed table-hover">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>componentClass</td>  
    <td>string</td>  
    <td>'span'</td>  
    <td>The HTML element type to render the validation message within</td>  
  </tr>
  <tr>
    <td>errorClassName</td>
    <td>string</td>
    <td>''</td>
    <td>The CSS class name to apply when the wrapped input has an error message to display</td>
  </tr>
  <tr>
    <td><a href="https://facebook.github.io/react/docs/tags-and-attributes.html#html-attributes" target="_blank">HTML Attributes</a></td>  
    <td></td>  
    <td></td>  
    <td>i.e. className</td>  
  </tr>
</table>

### How it works
The render method loops through it's child elements, looking for the input element.

```js
render () {
    //...
    {React.Children.map(this.props.children, this.wrapInputOnChangeHandler.bind(this))}
    //...
}
```

When found, it clones the element and wraps it's existing onChange handler. By wrapping the original handler, we can inject our own functionality into the handler, without overriding any previous functionality.

```js
wrapInputOnChangeHandler (child) {
    if (child.type !== 'input') return child;

    return React.cloneElement(child, {
        onChange: wrap(child.props.onChange, this.onChange.bind(this))
    });
}
```

Our injected functionality will read the `validationMessage` of the DOM node and store it in the components state. 
```js
onChange (originalChangeHandler, e) {
    this.setState({
        message: e.target.validationMessage
    });
    originalChangeHandler(e);
}
```

We then render the validation message using a internally defined component, if the message is non empty. We deconstruct the object argument to obtain the message and the componentClass. 

We need to be capatilise the `componentClass` variable name [so React treats it as component class, rather than a HTML tag](https://facebook.github.io/react/docs/jsx-in-depth.html#html-tags-vs.-react-components). Then we pass the rest of the arguments as props to the component.

```js
const validationMessage = ({ componentClass, message, ...props }) => {
    let ComponentClass = componentClass;
    
    if (message) {
        return <ComponentClass {...props}>{message}</ComponentClass> 
    }
};
```

Here's the whole component class (with an additional bit tidying up).

```js
import React, { Component, PropTypes, cloneElement, Children } from 'react';

// ES6 version of Lodash/Underscore _.wrap
const wrap = (func, wrapper) => (...args) => {
    return wrapper(func, ...args);
};

const validationMessage = ({ componentClass, message, ...props }) => {
    //Needs to be capatilised variable name so React treats it as component class rather than a HTML tag.
    let ComponentClass = componentClass;

    if (message) {
        return <ComponentClass {...props}>{message}</ComponentClass>
    }
};

class ValidationMessageWrapper extends Component {

    constructor (props) {
        super(props);
        this.state = {
            message: ''
        };

        this.onChange = this.onChange.bind(this);
        this.wrapInputOnChangeHandler = this.wrapInputOnChangeHandler.bind(this);
    }

    onChange (originalChangeHandler, e) {
        this.setState({
            message: e.target.validationMessage
        });
        originalChangeHandler(e);
    }

    wrapInputOnChangeHandler (child) {
        if (child.type !== 'input') return child;

        return cloneElement(child, {
            onChange: wrap(child.props.onChange, this.onChange)
        });
    }

    render () {
        let { errorClassName, children, ...rest } = this.props;
        let { message } = this.state;

        return (
            <div className={message && errorClassName}>
                {Children.map(children, this.wrapInputOnChangeHandler)}
                {validationMessage({ message, ...rest })}
            </div>
        );
    }
};

ValidationMessageWrapper.propTypes = {
    componentClass: PropTypes.string,
    errorClassName: PropTypes.string,
    children: PropTypes.node.isRequired
};

ValidationMessageWrapper.defaultProps = {
    componentClass: 'span',
    errorClassName: ''
};

export default ValidationMessageWrapper;
```

### Result
<a class="jsbin-embed" href="http://jsbin.com/dabuceboxo/1/embed">JS Bin on jsbin.com</a>
<script src="http://static.jsbin.com/js/embed.min.js?3.36.11"></script>
