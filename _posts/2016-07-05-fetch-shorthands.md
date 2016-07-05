---
layout: article
title:  "Useful shorthand window.fetch wrapper functions"
summary: "Cutting down on the window.fetch boilerplate"
---
Fetch API ([MDN](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)) is awesome, web requests with built in Promises, what's not to love!

Well, actually, `fetch` requires a bit of boilerplate to get it up and running; you have to decide yourself whether the request succeeded or failed.

Here are a few reusable fetch wrapper functions to get up and running a little quicker.

### fetchJSON
Simply passes an `Accept: application/json` header to the request, and ensures the response is a HTTP 200 JSON response. 

```js
export const fetchJSON = (url, options = {}) => {
    let init = Object.assign({}, {
        headers: {
            Accept: 'application/json'
        }
    }, options);

    return fetch(url, init)
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        });
};

/*
Example usage:
fetchJSON('http://jsonplaceholder.typicode.com/posts/1').then(json => { console.log(json) });
*/
```

### putJSON
And of course, it's complement. Where we perform a `PUT` request with an additional `Content-Type: application/json` header, we also stringify the object to send.

Here I am assuming a RESTful web service that returns the updated resource.

```js
export const putJSON = (url, content, options = {}) => {
    let init  = Object.assign({}, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(content)
    }, options);

    return fetch(url, init)
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        });
};

/*
Example usage:
let newPost = {
    userId: 123,
    id: 456,
    title: 'My title',
    body: 'My body'
};
putJSON('http://jsonplaceholder.typicode.com/posts/1', newPost).then(json => { console.log(json) });
*/
```
