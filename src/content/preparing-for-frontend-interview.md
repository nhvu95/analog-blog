---
title: 'Preparing for a front-end interview'
description: "Soon, I will join an interview for the frontend position. This note is used to list and keep what I will learn and exercise."
date_start: "2022/02/18"
date_end: '2022/02/19'
published: true
image: 'https://i.imgur.com/AxItho4.png'
header_image: 'https://i.imgur.com/vbZSvxD.png'
tags: ['Did I Miss', 'Frontend', 'Interview']
priority: 0
link: '_blog_preparing-for-frontend-interview'
slug: preparing-for-frontend-interview
location: 'Hanoi, Vietnam'
---

**I work as a Fullstack Developer, And because I didn't focus specifically on anything from the start of my career**
**path, It seems like I have a lot of things to re-learn and prepare. I don't nervous too much about the new technical**
**framework. I just worry about the core thing that I was misunderstood or I the things should know but I don't know. This**
**note is my preparation for an interview to apply to my next job. And maybe I will review and update it in the future**

**The main content of this post will about some base knowledge of Javascript, and Angular's Core knowledge, also a bit**
**about Design Patterns and Scalable Design for Frontend Systems.**

**Don't overestimate me! I don't remember and know all these :grinning: but I believe after this post, I will**
**understand them, and also take your appreciation at that time :smile: Let's learn together!.**
**During the reading, please don’t hesitate to notify me of misleading information if you spot a misunderstanding!**

1. [**Base web knowledge.**](#i-base-web-knowledge)
* [Session, Cookie, Cache.](#1-session-cookie-cache)
* [Web Storage](#2-web-storage)
* [Cors](#3-cors)
* [RESTful API](#4-restful-api)
* [SSL](#5-ssl---secure-sockets-layer)

2. [**Javascript**.](#ii-javascript)
* [How JS work?](#1-how-js-work)
* [Concurrency & Event Loop](#2-concurrency--the-event-loop)
* [Promise & Async/Await](#3-promise--asyncawait)
* [Type Coercion](#4-type-coercion)
* [Prototype & Prototype chain](#5-prototype--prototype-chain)
* [Scope & Scope chain](#6-scope--scope-chain)
* [Closure](#7-closure)
* [Web worker / Service Worker / Worklets](#8-web-worker---service-worker---worklets)
* [DOM / Shadow Dom / Virtual Dom](#9-dom--shadow-dom--virtual-dom)

3. [**Angular**](#iii-angular)
* [Dependency Injection](#1-dependency-injection)
* [View Engine](#2-view-engine)
* [Change Detection - NgZone](#3-change-detection---ngzone)
* [Pipe](#4-pipe)
* [Directive](#5-directive)
* [Decorator](#6-decorator)
* [Content Projection](#7-content-projection)
* [RxJS](#8-rxjs)
* [State Management. Stateless, Stateful, Dumb, Smart.](#9-state-management)
* [Webpack & Custom Webpack](#10-webpack--custom-webpack)
* [Optimize](#11-optimize)
* [Performance Handling](#12-performance-handling)
* [CI/CD](#13-cicd)
* [Scalable Design](#14-scalable-design)
* [Deploy](#15-deploy)

Before going deeply into each section, I want to appreciate my thanks to the sources below, which I usually read, and
also use some content from them for this post.

<details>
   <summary><b><u>Sources:</u></b></summary>

[*0. Angular Homepage*](https://angular.io/)
[**1. Series How JS work - Sessionstack team**](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
[*2. Javascript Interview Question - sudheerj*](https://github.com/sudheerj/javascript-interview-questions)
[*3. 100 Days of Angular - Angular Vietnam*](https://github.com/angular-vietnam/100-days-of-angular)
[*4. What-Are-Cookies - Clouldflare*](https://www.cloudflare.com/learning/privacy/what-are-cookies/)
[*5. What is ‘CORS’? What is it used for? - Electra Chong*](https://medium.com/@electra_chong/what-is-cors-what-is-it-used-for-308cafa4df1a)
[*6. API - REST - RESTfulAPI - Wiki*](https://en.wikipedia.org/wiki/Representational_state_transfer)
[*7. Uniform interface REST - inferno*](https://stackoverflow.com/questions/25172600/rest-what-exactly-is-meant-by-uniform-interface)
[*8. Type Coercion*](https://www.freecodecamp.org/news/js-type-coercion-explained-27ba3d9a2839/)
[*9. Prototype & Prototype chain*](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)
[*10. Closures & Lexical scoping*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures?retiredLocale=vi)
[*11. Webworkers*](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
[*12. View Engine*](https://immanubhardwaj.medium.com/renderer2-angular-view-engine-d872498be1e6)
[*13. Angular Change Detection Strategy: An introduction?*](https://medium.com/@bencabanes/angular-change-detection-strategy-an-introduction-819aaa7204e7)
[*14. Stateless and Stateful*](https://michelestieven.medium.com/components-stateful-stateless-dumb-and-smart-2847dd4092f2)
[*15. Webpacck*](https://webpack.js.org/concepts/)
[*16. Performance issues*](https://christianlydemann.com/how-to-fix-the-most-common-angular-performance-problems-like-a-doc/)
</details>

## I. Base web knowledge

### 1. Session, Cookie, Cache
Essentially, All of them are used for **store the data** and keep track the information provided by a visitor, but their uses are different.

#### Session
After read some post, I believe that [this](https://stackoverflow.com/a/3804387/17103635) explanation is good, and when explain them for fresher or the interviewer. Explain like this will impress and clearly.

> **Because HTTP is stateless**, in order to associate a request to any other request, you need a way to store user data  
> between HTTP requests.Cookies or URL parameters ( for ex. like http://example.com/myPage?asd=lol&boo=no ) are both suitable ways to transport data between 2 or more request. However they are not good in case you don't want that data to be readable/editable on  
> client side.The solution is to **store that data server side**, **give it an "id"**, and let the client only know (and pass back at  
> every http request) that id. There you go, sessions implemented. Or you can use the client as a convenient remote  
> storage, but you would encrypt the data and keep the secret server-side.Of course there are other aspects to consider, like you don't want people to hijack other's sessions, you want sessions to not last forever but to expire, and so on.In your specific example, the user id (could be username or another unique ID in your user database) is stored in the session data, server-side, after successful identification. Then for every HTTP request you get from the client, the session id (given by the client) will point you to the correct session data (stored by the server) that contains the authenticated user id - that way your code will know what user it is talking to.

This is a long answer. I will summarize some main content which you can glimpse.

* Because HTTP is stateless, we need to associate the last HTTP request with the other HTTP requests to distinguish each
  user's browser.
* We can use Cookies or URL parameters but they are readable/ editable.
* The solution is to **store that data server side**, **give it an "id"**, and let the client only know (and pass back
  at every http request) that id.
* From that session ID, the server maps them to specific data which identifies the user data.
* The **user session** begins when the user logs in to a specific network application and ends when the user logs out of
  the program, shuts down the machine, or the Session ID get timeout.

#### Cookies
Not like normal people I ussually focus on the core, nature of
it. [Here cloudflare anwser](https://www.cloudflare.com/learning/privacy/what-are-cookies/) is the answer I feel enough
clearly.

We can get some main content from this:

* **Cookies are small files of information** that a **web server generates** and **sends to a web browser**
* **Web browsers store the cookies they receive** for a predetermined period of time, or for the length of a user's
  session on a website. Cookies help inform
  websites about the user (through user info or sser sessions), enabling the websites to personalize the user
  experience, Tracking the user flow. They will be attach to HTTP request and sendback to server.
* Browser store cookies in a designated file. We can view cookies from browser from dev tool.
* There are some kind of cookies:
    * **Session cookies** helps a website track a user's session. Session cookies are deleted after a user's session ends, so session cookies have no expiration date, which signifies to the browser that they should be deleted once the session is over.
    * **Persistent cookies** remain in a user's browser for a predetermined length of time, which could be a day, a week, several months, or even years. Persistent cookies always contain an expiration date
    * **Authentication cookies** help manage user sessions; they are generated when a user logs into an account via their browser.
    * **Tracking cookies** are generated by tracking services. They record user activity, and browsers send this record to the associated tracking service the next time they load a website that uses that tracking service.
    * **Zombie cookies** regenerate after they are deleted. Zombie cookies create backup versions of themselves outside of a browser's typical cookie storage location. They use these backups to reappear within a browser after they are deleted. Zombie cookies are sometimes used by unscrupulous ad networks, and even by cyber attackers.

**HTTP Only flag**
> If one cookie is HttpOnly, it cannot be accessed by client JavaScript, which means hackers cannot read the cookie  value and send it to his own server, not even know whether this cookie exist.

**Secure flag**
> Server will not send cookie if the browser or domain is not support SSL/TSL

#### Cache

> A web cache (or HTTP cache) is an information technology for the temporary storage (caching) of web documents, such as  
> HTML pages and images, to reduce bandwidth usage, server load, and perceived lag. Cache is just a collection of data  
> downloaded to help display a web page.  Cache expires manually and consumes large space in terms of capacity. Cache does not attach with requests, it use as last response of a request and use until exprise.

### 2. Web Storage
The limit size of cookies is only 4KB, and in some case, user can disable cookies in their browser, so the cookies function cannot work. Besides, cookies always attach to the request; it will take time with the big file. Therefore, Web Storage was born.

* Web Storage can store the data from 2MB to 10MB depend on the browser
* Web Storage store at the local but never send to server, so it not impact the bandwidth
* Web Storage is new feature of HTML5 but also support old browser
* Should never store the crucial data as password on Web Storage

There are two kind of Web Storage.

#### *Local Storage*:
The data store here will not remove after closing the tab or closing the browser. It is only removed after clearing the history. Local storage can share data between domain and sub domain, and share between tabs.

#### *Session Storage*:
The data of an user session can store here. The data stored in session storage cannot share between tabs. These data are removed after close the tab.

In an interview, maybe you will got this question before "Where do you store the access_token?" "Where is the best practice to store the access_token? And why". This is my personal answers which I got from the interview.

* Local storage is enough, A lot of big tech just use only local storage,
* If the requirement required more high security, we can use session storage.
* However they are all can modified and read by the user. The better way is store the access_token in the cookies and
  set cookies with HTTP_ONLY flag / Secure flag.

### 3. Cors
“CORS” stands for Cross-Origin Resource Sharing. It allows you to make requests from one website to another website in
the browser, which is normally prohibited by another browser policy called
the [Same-Origin Policy (SOP)](#same-origin-policy-sop).

#### Same-Origin Policy (SOP)

> At the crux of it, **CORS and SOP are both browser policies** that have developed in response to issues of browser security and vulnerabilities.
> Did you ever hear about CSRF (Cross-Site Request Forgery) or XSRF? Same-Origin Policy was born to prevent that.
> Before browsers implemented SOP, malicious websites were able to exploit cookies stored by your browser to make unauthorized requests to other domains.

> Some of these unauthorized requests could do things like make purchases, delete user information, fetch sensitive data, etc. 😱The **Same-Origin Policy** is a security measure standardized among browsers. The "origin" mostly refers to a "domain".  
> It prevents different origins from interacting with each other, to prevent attacks such as Cross Site Request Forgery.  
-**_Of course, SOP cannot prevent all the CSRF attack, but atleast It can prevent CSRF in some case._**

#### Cross Origin Resources Sharing
As mentioned above, SOP prevents us to send a request to your APIs in browsers. So, How can we public our API to some specific domain, or public for everyone? At last, we’ve arrived at CORS.

> CORS allows servers to specify certain trusted ‘origins’ they are willing to permit requests from. Origins are defined  
> as the combination of protocol (http or https), host (a domain like www.example.com or an IP address) and port.  
> Browsers which implement the CORS policy will include a HTTP header called ‘Origin’ in requests made with AJAX, including above  
> information the value.

#### Simple requests - CORS

> 1. To instruct the browser to expose server responses to a HTTP requests from certain origin, the web server must respond to the request with an additional HTTP response header, ‘Access-Control-Allow-Origin: `<origin>`.
> 2. Alternatively, the web server may expose its responses to all origins by specifying a value of ‘*’,
> e.g.  ‘Access-Control-Allow-Origin: *’.

#### Preflight requests - CORS

> This might be sufficient for simple GET, HEAD, or POST requests without any special http headers. However, for DELETE> and PUT request, ‘unsafe’ requests which may impact the server’s data, or GET, HEAD and POST requests with customized headers, the browser will send a “preflight” request to find out the CORS result prior to sending the actual request  **(only if the preflight response determines access is  permitted)**.

> The preflight request is an OPTIONS request made to the same HTTP path as the actual request, with a couple of HTTP headers: Origin, Access-Control-Request-Method, Access-Control-Request-Headers  
> And the Server if support CORS will response to the preflight request with headers: Access-Control-Allow-Origin,  
> Access-Control-Allow-Methods, Access-Control-Allow-Headers.

Usually, all of these will be automatic if we enable CORS on Backend-side, we just need to add headers to the request,
and the browser will auto create a preflight request for us.

### 4. RESTful API

#### API - Application Programming Interface

1. API is a type **Software Interface**, **offering a service to other pieces of software**.
2. While User Interface connects a computer/software with the person, an API of software allowed other software to
   connect with it.
3. Purpose of APIs is to **hide the internal details** of how a system works, and exposing only those parts a programmer
   will find useful and should to know.

#### REST (REpresentational State Transfer)

1. REST is **a software architectural style** that was created to **guide the design and development of the architecture for the World Wide Web**.
2. REST **defines a set of constraints** for how the architecture of an Internet-scale distributed hypermedia system, **such as the Web, should behave.**

**Below is some of REST constrains:** It's quite long, but I will only note some main concept.

* **Client–server architecture - The client-server design pattern:** separation of concerns, separating the user
  interface concerns from the data storage concerns.
* **Statelessness:** no session information is retained by the receiver, usually a server.
* **Cache-ability:** Clients and intermediaries can cache responses. Responses must, implicitly or explicitly, define
  themselves as
  either cacheable or non-cacheable.
* **Layered system:** We can have a lot of intermediaries along the way. Client and Server don't need to know about
  them. We can increase
  the number of intermediaries to improve security but it does not impact the source code of both client and server.
* **Code on demand (optional):** Can change User Interface from Server
* **Uniform interface:** The uniform interface constraint is fundamental to the design of any RESTful system. It
  simplifies and decouples the architecture, which enables each part to evolve independently.
    * **Identification of resources** - You use the URI (IRI) standard to identify a resource. In this case, a resource
      is a web document.
    * **Manipulation of resources through these representations** - You use the HTTP standard to describe communication.
      So for example GET means that you want to retrieve data about the URI-identified resource. You can describe an operation with an HTTP method and a URI.
    * **Self-descriptive messages** - You use standard MIME types and (
      standard) [RDF vocabs](https://developer.mozilla.org/en-US/docs/Glossary/RDF) to make messages self-descriptive.
    * **Hypermedia as the engine of application state** (a.k.a. HATEOAS) - You use hyperlinks and possibly URI
      Parameters, to decouple the client from the application-specific URI structure. You also can annotate these hyperlinks with
      semantics. Like this [Example](https://developer.mozilla.org/en-US/docs/Glossary/RDF).

**So after understanding about API and REST, we come to RESTful API**

#### RESTful API

1. RESTful API is a principle to designing API and conform the REST constraints and REST architectural style, and allows
   for interaction with RESTful web services.
2. 5 HTTP method: GET, PUT, POST, PATCH and DELETE suitable to perform action in a REST system. But people usually use
   CRUD: POST, GET, PUT, DELETE.
3. RESTful API don't use `session` and `cookie`, they use `access_token` with each request.
4. Nowadays, People like to use JSON format for the response body of RESTful API, however, some systems also use XML
   format, it depends on your design.

### 5. SSL - Secure Sockets Layer

#### What problem did SSL solved?
If you already learn about Two-way Encryption in school, you may know that it have two key: `public_key`
and `private_key`, first one to encrypt, and second one to decrypt Before SSL was created, the data package is just sent
without encryption from the client (user) to the server, it was called HTTP. And this is a risk, cause data packages can
be captured by the computer in the same network (If you learned to use Wireshark at University in the Network class, you
may know that we can capture and read the content of data packages). This technique was called Man-In-The-Middle (MitM).

Essentialy, SSL was born to solve this issue, by generate to two key, `public_key` and `private_key`. So flow will look
like that.

In the step 3, if your SLL cert is not provided by a trusted CA, you will see some thing like this.

If this happens, although your browser warned, your connection is still encrypted. The browser warns just because it wants to notify you that: "because your SSL is not provided by a trust CA, or it cannot detect the CA, so it cannot assurance that your connection is secured."

=> **By appling SSL/TLS to HTTP, it become HTTPS. That all**

> Note : TLS is a successor of SSL. They have many differences, about handsakeing ways, protocol, algorithm behind..etc.  
> But they are created for same purposed.  
> Some people still call them are "**SSL certificates**" and some also call "**TLS certificates**".

## II. Javascript

### 1. How JS work?

#### There are some JavaScript Engine

* **V8** from Google is the most used JavaScript engine.
* **SpiderMonkey** is developed by Mozilla.
* **JavaScriptCore** is Apple's engine for its Safari browser.
* **Chakra** is the engine of the Internet Explorer browser and they are consists of two main components:

* **Memory Heap** — this is where the memory allocation happens
* **Call Stack** — this is where your stack frames are as your code executes

#### Runtime

> There are APIs in the browser that have been used by almost any JavaScript developer out there (e.g. “setTimeout,  
> setInterval”). Those APIs, however, are not provided by the Engine.  
> So, where are they coming from?We have those things called **Web APIs** which are provided by browsers, like the DOM, AJAX, setTimeout and much more.

**Q?**: My question, *if `setTimeout()` is WebAPIs, how it can work in NodeJs?*

NodeJS also give a module called The Timers module. And this module contains functions that execute code after a set
period of time like `setTimeout()`, `setImmediate()`, `setInterval()`

#### Call Stack

> JavaScript is a single-threaded programming language, which means it has a single Call Stack. Therefore it can do one thing at a time.The Call Stack is a data structure which records basically where in the program we are.If we step into a function, we put it on the top of the stack. If we return from a function, we pop off the top of the stack. That’s all the stack can do.Let’s see an example. Take a look at the following code:

```javascript
function multiply(x, y) {
    return x * y;
}

function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}

printSquare(5);
```

> When the engine starts executing this code, the Call Stack will be empty. Afterwards, the steps will be the following:  
**I note some main content**.

* JavaScript is a single-threaded programming language, which means it has a single Call Stack. Therefore it can do one thing at a time.
* The Call Stack is a data structure which records basically where in the program we are.
* Each entry in the Call Stack is called a Stack Frame.
* By stack it help us to trace the exception. In case stack overflow mean that the function was push to much into stack
  and out of space.

```javascript
function foo() {
    throw new Error('SessionStack will help you resolve crashes :)');
}

function bar() {
    foo();
}

function start() {
    bar();
}

start();
```

> ... running on a single thread is quite limiting as well. Since JavaScript has a single Call Stack, *what happens  
> when things are slow? Or they take a huge amount of time to be processed*. It will cause page unresponsive...  
To avoid that, we should use asynchronous callbacks or service workers.

### 2. Concurrency & the Event Loop

#### Concurrency

> While the Call Stack has functions to execute, the browser can’t do anything else — it’s being blocked. This means  
> that the browser can’t render, it can’t run any other code, it’s just stuck. And here comes the problem — your app UI  
> is no longer efficient and pleasing.

Your app is stuck. In the example of Call Stack above. I was use functions and Web APIs as the Stack Frame(unit to push on Call Stack). Essentially, Stack Frame is the blocks `{...}`, and popullarity of block is a function.

To solve and prevent the application stucking, programing have a concept call asynchronous.

> ...tasks that cannot complete now are, by definition, going to complete asynchronously, which means you won’t have the above-mentioned blocking behavior as you might have subconsciously expected or hoped for.

```javascript
// ajax(..) is some arbitrary Ajax function given by a library
var response = ajax('https://example.com/api');

console.log(response);
// `response` won't have the response
```

And because we don't know when the `async` task is complete, To waiting and take an action after an `async` task is complete, It usually use with `callback function` which is a function will call after an `async` task complete.

```javascript
ajax('https://example.com/api', function (response) {
    console.log(response); // `response` is now available
});
```

Of course we can actually make a `synchronous` Ajax requests, however never do that.

> If you make a synchronous Ajax request, the UI of your JavaScript app will be blocked — the user won’t be able to click, enter data, navigate, or scroll. This would prevent any user interaction. It’s a terrible practice. That why an `await` must be use in an `async` function.

```javascript
// This is assuming that you're using jQuery
jQuery.ajax({
    url: 'https://api.example.com/endpoint',
    success: function (response) {
        // This is your callback.
    },
    async: false // And this is a terrible idea
});

```

Beside of ajax request, I just use ajax as an example, you also can use others way (ex: setTimeout).

Cause we know that we have only a Stack, and stack is fist-in-last-out. How it can prioritize *`sync`* task before the
*`async`* task?

#### Event loop
Before going deeply into the content of the event loop, I believe that we should make clear some items below, which I
get from the [blog](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5) of Sessionstack team.

1. Until ES6, JS actually never had any direct concept about asynchronicity built into it.
2. The *`JS engine`* has never done anything more than execute a single chunk of your program at any given moment.
3. The *`JS Engine`* runs inside a *`hosting environment`*, which for most developers is the typical web browser or
   Node.js
4. Every single device, browser represents a different type of *`hosting environment`* for the *`JS Engine`*.
5. Whether it's any *`hosting environment`*, they have the same common built-in mechanism called the *`event loop`*.
6. *`Event loop`* handles the execution of multiple chunks of your program over time, each time invoking the JS
   Engine.

Pretty obvious isn't it?

> This means that the JS Engine is just an on-demand execution environment for any arbitrary JS code. It’s the surrounding environment that schedules the events (the JS code executions).

> The Event Loop has one simple job — to monitor the Call Stack and the Callback Queue. If the Call Stack is empty, the Event Loop will take the first event from the queue and will push it to the Call Stack, which effectively runs it. Such an iteration is called a *`tick`* in the Event Loop. Each event is just a function callback.

```javascript
console.log('Hi');
setTimeout(function cb1() {
    console.log('cb1');
}, 5000);
console.log('Bye');
```

Let’s “execute” this code and see what happens:

> It’s interesting to note that ES6 specifies how the event loop should work, meaning that technically it’s within the  
> scope of the JS engine’s responsibilities, which is no longer playing just a `hosting environment` role.

> **One main reason for this change is the introduction of Promises in ES6 because the latter require access to a direct**, fine-grained control over scheduling operations on the event loop queue (we’ll discuss them in a greater detail later).

### 3. Promise & async/await

#### Job Queue
From the ES6, They introduced a new concept called *`Job Queue`*. I had read some post, but they dont talk detail about it. I recommend you should read a post from Session blog, cause all summary items bellow is take from that.

1. *`Job Queue`* is a layer on top of the Event Loop queue.
2. It was born to dealing with the asynchronous behavior of *`Promise`* from ES6.
3. The *`Job Queue`* is a queue that’s attached to the end of every tick in the Event Loop queue. (**Tick** is each
   time event loop check and take first callback from callback queue)
4. An async action that may occur during a tick of the event loop will not cause a whole new event, and it will not to
   append into the event loop. Instead of that, It will add in to the
   *`Job Queue`*.
5. By add to the *`Job Queue`*, the *`tick`* will be finish only the *`Job Queue`* empty. And only after a
   *`tick`* finished, the new stick will be run, and the *`callback`* will be take out from *`callback`* queue.

#### Promise
Cause promise is the basic content every frontend developer should know. So I just mark some points.

> 1. Once a Promise is resolved, it stays that way forever — it becomes an immutable value at that point — and can then be observed as many times as necessary.

2. If at any point in the creation of a Promise, or in the observation of its resolution, a JavaScript exception error occurs, such as a TypeError or ReferenceError, that exception will be caught, and it will force the Promise in question to become rejected.
3. If an exception thrown inside the Promise creating function, it will be rejected, if an exception throw in promise handling function, handling uncaught exceptions by using `.catch()`

#### Async / Await

> JavaScript ES8 introduced async/await that makes the job of working with Promises easier.

1. When an *`async`* is called, it returns a *`Promise`*. If the return value is not a *`Promise`*, a
2. *`Promise`* will be automatically created and it will be resolved with the returned value from the function.
3. When the *`async`* function throws an exception, the *`Promise`* will be rejected with the thrown value.
4. An *`async`* function can contain an *`await`* expression, that pauses the execution of the function and waits
   for the passed Promise’s resolution, and then resumes the async function’s execution and returns the resolved value.
5. The *`await`* keyword can only be used in *`async`* functions .

```javascript
// Just a standard JavaScript function
function getNumber1() {
    return Promise.resolve('374');
}

// This function does the same as getNumber1
async function getNumber2() {
    return 374;
}

// This function show how to use await
async function getNumber3() {
    let num1 = await getNumber1();
    return num1;
}
```

### 4. Type Coercion

> Type coercion is the automatic or implicit conversion of values from one data type to another (such as strings to numbers).

```javascript
const value1 = '5';
const value2 = 9;
let sum = value1 + value2;

console.log(sum); // 59
```

#### Explicit coercion

> When a developer expresses the intention to convert between types by writing the appropriate code,  
> like `Number(value)`, it’s called explicit type coercion (or type casting).

#### Implicit coercion

> Since JavaScript is a weakly-typed language, values can also be converted between different types automatically, and it is called implicit type coercion.  
> It usually happens when you apply operators to values of different types, like `1 == null`,` 2/’5'`, `null + new Date()`, or it can be triggered by the surrounding context, like with `if (value) {…},` where value is coerced to boolean.

There are three type of conversion

* to string
* to boolean
* to number

Conversion logic for primitives and objects works differently, but both primitives and objects can only be converted in those three ways.

#### String conversion

```javascript
String(123) // explicit
123 + ''    // implicit

String(123)                   // '123'
String(-12.3)                 // '-12.3'
String(null)                  // 'null'
String(undefined)             // 'undefined'
String(true)                  // 'true'
String(false)                 // 'false'
```

#### Boolean conversion

> To explicitly convert a value to a boolean apply the Boolean() function.  
> Implicit conversion happens in logical context, or is triggered by logical operators ( `||` `&&` `!`).

```javascript
Boolean(2)          // explicit
if (2) {...}      // implicit due to logical context
!!2                 // implicit due to logical operator
2 || 'hello'        // implicit due to logical operator
```

> Note: Logical operators such as `||` and `&&` do boolean conversions internally, but actually return the value of original operands, even if they are not boolean.

```javascript
Boolean('')           // false
Boolean(0)            // false     
Boolean(-0)           // false
Boolean(NaN)          // false
Boolean(null)         // false
Boolean(undefined)    // false
Boolean(false)        // false

// All value not in the list above will convert to true
```

#### Numeric conversion

* comparison operators (`>`, `<`, `<=`,`>=`)
* bitwise operators ( `|` `&` `^` `~`)
* arithmetic operators (`-` `+` `*` `/` `%`).
  Note, that binary+ does not trigger numeric conversion, when any operand is a string.
* unary `+` operator
* loose equality operator `==` (incl. `!=`).
  Note that `==` does not trigger numeric conversion when both operands are strings.

```javascript
Number('123')   // explicit
+ '123'          // implicit
123 != '456'    // implicit
4 > '5'         // implicit
5 / null          // implicit
true | 0        // implicit3

Number(null)                   // 0
Number(undefined)              // NaN
Number(true)                   // 1
Number(false)                  // 0
Number(" 12 ")                 // 12
Number("-12.34")               // -12.34
Number("\n")                   // 0
Number(" 12s ")                // NaN
Number(123)                    // 123
```

> When converting a string to a number, the engine first trims leading and trailing whitespace, `\n`, `\t` characters, returning `NaN` if the trimmed string does not represent a valid number. If string is empty, it returns `0`.

> `null` and `undefined` are handled differently: `null` becomes `0`, whereas `undefined` becomes `NaN`.

> Symbols cannot be converted to a number neither explicitly nor implicitly. Moreover, TypeError is thrown, instead of silently converting to `NaN`, like it happens for `undefined`. See more on Symbol conversion rules on MDN.

```javascript
Number(Symbol('my symbol'))    // TypeError is thrown
+ Symbol('123')                 // TypeError is thrown
```

You should remember some points below for numeric conversion:

1. When applying `==` to `null` or `undefined`, **numeric conversion does not happen**. `null` equals only to `null` or `undefined`, and does not equal to anything else.

```javascript
null == 0               // false, null is not converted to 0
null == null            // true
undefined == undefined  // true
null == undefined       // true
```

2. `NaN` does not equal to anything even itself

### 5. Prototype & Prototype chain

#### Prototype & Prototype chain

> Every object in JavaScript has a built-in property, which is called its *`prototype`*. The *`prototype`* is itself  
> an object, so the *`prototype`* will have its own *`prototype`*, making what's called a *`prototype chain`*.  
> The *`chain`* ends when we reach a *`prototype`* that has `null` for its own *`prototype`*.

> 1. When you try to access a property of an object: if the property can't be found in the object itself, the prototype is searched for the property.
> 2. If the property still can't be found, then the prototype's prototype is searched, and so on until either the property is found, or the end of the chain is reached, in which case undefined is returned.

For example:

> So when we call `myObject.toString()`, the browser:* looks for `toString` in `myObject`
> * can't find it there, so looks in the prototype object of `myObject` for `toString`
> * finds it there, and calls it.

But how we get the prototype of an object?

```javascript
Object.getPrototypeOf(myObject); // Object {...}
```

> *`Object.prototype`* is the most basic prototype, that all objects have by default.  
> The *`prototype`* of *`Object.prototype`* is null, this also the end of chain.

```javascript
const myDate = new Date();
let object = myDate;

do {
    object = Object.getPrototypeOf(object);
    console.log(object);
} while (object);

// Date.prototype
// Object {...}
// null
```

#### Shadowing properties
The bottom line of it, it's similar to the `overload` in some languages, same name but has different params. The only difference here is the return value can also differ.

```javascript
const myDate = new Date(1995, 11, 17);

console.log(myDate.getYear()); // 95

myDate.getYear = function () {
    console.log('something else!')
};

console.log(myDate.getYear()); // 'something else!'
```

#### Create prototype

* Create through `Object.create`
```javascript
    const personPrototype = {
        greet() {
            console.log('hello!');
        }
    }

```

```javascript
    const carl = Object.create(personPrototype);
    carl.greet();  // hello!
```

```javascript
	  /* Create through `constructor````javascript */
    function Person(name) {
        this.name = name;
    }
    Person.prototype = personPrototype;
    Person.prototype.constructor = Person;
```

### 6. Scope & Scope chain
We already know about function module, class and somes like module... We know they was declare in `Heap` (Javascript), or `Stack` and `Heap` in some languagues like Java/C++.

Because all the variables and things are declared and allocated in the same storage. For easy for GC's job, and in some case we need to prevent acecssing to each other, so people created a concept called `scope`.

There are differences in languages, however essentially, when a function was taken out from the call stack, it will know where to find and declare the variable, and they will look for in their scope which compiler allocate for then.

After a function finish, in normal case, the scope of it will be clear by Garbage Collection (GC).

> We have three main types of scope  
> **1. Global scope**  
> **2. Function scope**  
> **3. Block scope**  
We already know about global and function, but how about block?

* **Block scope**: This tells us that any variable declared inside a block ({}) can be accessed only inside that block.
* Block scope is related to variables declared with `let` and `const` only. Variables declared with `var` do not have block scope.
* Block scope familiar use in statements like `if`,`for`,`while`,`switch`... or `{}`

```javascript
{
    let a = 3;
    var b = 2;
}

console.log(a); //Uncaught ReferenceError: a is not defined
console.log(b); // 2 as variables declared with `var` is functionally and globally scoped NOT block scoped
```

#### Lexical Scope

* **Lexical Scope**: We also have a concept called **Lexical Scope** (Static scope). After read a lot of post, I wana say, It's so confusing...

```javascript
function init() {
    var name = 'Mozilla'; // name is a local variable created by init
    function displayName() { // displayName() is the inner function, a closure
        alert(name); // use variable declared in the parent function
    }

    displayName();
}

init();
```

I will note main contents.

1. *`Lexical scope`* was detected when complier parses the js code to machine code.
2. Essentially, *`Lexical scope`* is the scope where a function is declared inside. And at the run time, when a function calls, `hosting environment` will help the new scope detect its `Lexical scope` and use that to create it own `Lexical environment`
3. *`Lexical Scoping`* is the mechanism that allows the inner function can access and use all things declare in the
   *`Lexical scope`*. EX: `displayName()` call and use variable `name` which declare outside in the `init()`.

#### Scope chain
When a function looks for a variable in its scope but doesn't found, it will look for in its `lexical scope` and more.
This will make a scope chain.

> `displayName()` -> `init()` -> global scope.

### 7. Closure

> A closure is the **combination** of **a function** and **the lexical environment** within which that function was  
> declared.

Let look a bit about this code.

```javascript
function makeFunc() {
    var name = 'Mozilla';

    function displayName() {
        alert(name);
    }

    return displayName;
}

var myFunc = makeFunc();
myFunc();
```

As we know, when a memory, scope which not poiting by any reference, will be clean by GC.

In this example, although `makeFunc()` was called and finished but the `myFunction()` still can `alert()` variable `name`. ​How’s that?

This is the way Closure work. The definition above mentioned the `lexical environment`. And in this case, cause we
return the `displayName()` function and cause the `displayName` still can access it's `lexical environment`(`makeFunc`)
so the outter scope of it will not be clean by GC.

Let's look another example:

```javascript
function makeAdder(x) {
    return function (y) {
        return x + y;
    };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

In this case, each time we call `makeAdder`, the `hosting environment` will help us to create two different `lexical environment`. And by this way, `makeAdder(5)` and `makeAdder(10)` point to different `lexical environment`. In this way, `add5()` and `add10()` don't impact each other.

#### Practical use
Actually, as a TS-user don't use JS native to build frontend framework too much, I rarely use closure, especially in Angular.

1. For in an interview, Closure is frequently asked by the interviewer to check the interviewee's understanding of JS.
2. For the event binding.

```javascript
function makeSizer(size) {
    return function () {
        document.body.style.fontSize = size + 'px';
    };
}

function makeSizerNormal(size) {
    document.body.style.fontSize = size + 'px';
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

//Test it here https://jsfiddle.net/vnkuZ/7726/
```

3. For creating a private function

```javascript
var counter = (function () {
    var privateCounter = 0;

    function changeBy(val) {
        privateCounter += val;
    }

    return {
        increment: function () {
            changeBy(1);
        },

        decrement: function () {
            changeBy(-1);
        },

        value: function () {
            return privateCounter;
        }
    };
})();

console.log(counter.value());  // 0.

counter.increment();
counter.increment();
console.log(counter.value());  // 2.

counter.decrement();
console.log(counter.value());  // 1.
```

#### Some attention points

1. Createful create closure in a loop, or share the variable.

```javascript
for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function () {
        showHelp(item.help);
    }
}
// This will make error, cause the closure of `onfocus` use same `item`, so it use the last `item`.

```

We should use `let` in ES2015, or declare `onfocus` outside like this

```javascript
function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
    return function () {
        showHelp(help);
    };
}

for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus =
        makeHelpCallback(item.help);
}
```

Or use an anonymous function

```javascript
for (var i = 0; i < helpText.length; i++) {
    (function () {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = function () {
            showHelp(item.help);
        }
    })(); // Immediate event listener attachment with the current value of item (preserved until iteration).
}
```

2. Avoid nested loop, avoid use closure unless we have to. Cause it will impact our performance and memory.
3. Create class in incorrect way.

```javascript
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
    this.getName = function () {
        return this.name;
    };

    this.getMessage = function () {
        return this.message;
    };
}
```

Instead of that, we should declare like the way bellow, cause the previous way not is good practice for closure. Cause each time MyObject create, the function will be reassigned.

```javascript
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}

MyObject.prototype.getName = function () {
    return this.name;
};
MyObject.prototype.getMessage = function () {
    return this.message;
};
```

### 8. Web workers - Service Worker - Worklets

#### Dedicate Worker

> 1. Dedicate Worker are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface.

We know that, Javascript is single thread. And to solve problem about blocking user interface when execute big task, Dedicate Worker was born.

> 2. Dedicate Worker are an effort to bring multi-threading to the JavaScript environment.
> 3. Dedicate Worker are not a part of javascript, they are features of browser that can access through javascript.

Essentially, When a script creates a Web Worker, It will run in the browser, and not be limited by a tab. The browser
will create a new process to execute the web worker's task, then pass a message back to the main script to return the
result after done.

> 4. Remember that a dedicated worker cannot access `window`, which means that it cannot modify or change `DOM`.

#### Service Worker

1. Service worker is a kind of web worker (shared worker), which focuses on event-driven.
2. Service workers essentially act as proxy servers that sit between web applications, the browser, and the network (when available)
3. Cause it works as a proxy, people usually use it to control the cache.
4. After the first time user access page and service worker was installed, then the next time the user access page, the service worker will run.
5. One of the applicability of service workers is on PWA (Progressive Web App).

##### Other use case ideas
Service workers are also intended to be used for such things as:

> **Background data synchronization**:  Start up a service worker even when no users are at the site, so caches can be updated, etc.  
> **Reacting to push messages**: Start up a service worker to send users a message to tell them new content is available.  
> **Responding to resource requests from other origins.**: Receiving centralized updates to expensive-to-calculate data such as geolocation or gyroscope, so multiple pages can make use of one set of data.  
> **Client-side compiling** and dependency management of CoffeeScript, less, CJS/AMD modules, etc. for development purposes.
> * Hooks for background services.
> * Custom templating based on certain URL patterns.
> * Performance enhancements, for example pre-fetching resources that the user is likely to need in the near future, such  
    > as the next few pictures in a photo album.

#### Worklet

> The Worklet interface is a lightweight version of Web Workers and gives developers access to low-level parts of the rendering pipeline.

> With Worklets, you can run JavaScript and WebAssembly code to do graphics rendering or audio processing where high performance is required.

* PaintWorklet
* AudioWorklet
* AnimationWorklet
* LayoutWorklet

### 9. DOM / Shadow Dom / Virtual Dom

#### Original DOM

> The Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs  
> can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way,  
> programming languages can interact with the page.

Forget this definition, I will give you another definition, this is my defintion 👍

> HTML is a Text Markup Language, it just a text, to manage them and edit them, people create an Object Model called DOM  
> to mapping HTML to an specific object. This Object DOM give us function to modify and intergrate with the HTML, and  
> also have the attribute, which we can get the value and state of HTML.

#### Shadow DOM
Cause HTML can contain plenty of items inside them, so it will make DOM have to manage all those things, although these
items are not necessary to show visible to the user. They create a cocept call "Shadow" DOM.

> Shadow DOM allows hidden DOM trees to be attached to elements in the regular DOM tree — this shadow DOM tree starts  
> with a shadow root, underneath which can be attached to any elements you want, in the same way as the normal DOM.

As you can see in the image, they create a Node call Shadow Host, and this Node will map to another DOM tree (start with
Shadow Root), instead of push all them as innerHTML of this node directly.

At the time browser render a page, when it meet Shadow Host, it will ask the part Shadow Root then render them, and add
them visible on Document tree depend on your config.

```javascript
// Create a shadow root
let shadow = elementRef.attachShadow({mode: 'open'}); //Open mean
let shadow = elementRef.attachShadow({mode: 'closed'});
// Create shadow items.
let para = document.createElement('p');
// Then append them into shadows
shadow.appendChild(para);
// You can screate a <style> and style it as normal DOM.
// Or it will auto work if you already defined
```

Shadow DOM can help you create a web component or a custom element. You can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

#### Virtual DOM
Let's come up with the definition of ReactJS for Virtual DOM first. I don't have opportunities to work with ReactJs. So...

> The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory  
> and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.  
As I understand, they create a concept "virtual" DOM. Instead of integrate with the origin DOM, you will integrate with the virtual DOM.

The reason make the integration with the DOM become slow most come from Rerendering time - Repainting time. As much DOM element you have, as much things you have to do.

Virtual DOM prevents it by the way code impact which elements in virtual dom, then React only rerender, repaint the impact part in the real DOM.

Cause Virtual DOM store in memory, so it have two big problem.

* Higher memory use. (Cause it have to store two version of DOM)
* No difference between static and dynamic.

But with its pros, it's worth it.

* More speed.
* Binding data faster.

#### Compare

> Both the shadow DOM and virtual DOM have played a key role in the development of progressive web frameworks. While  
> both add performance benefits, the virtual DOM is used to efficiently redraw UIs whereas the shadow DOM encapsulates  
> the implementation of custom web components.  
Like a tweet, I read from Angular author. He said there is no which one is better, depending on the purpose and they are
like foods. If you like which one, you can choose it.

## III. Angular

### 1. Dependency Injection
I already write about this concept in Spring Boot on [here](https://nhvu95.com/blog/spring-core-1). This is a famous Design Pattern. Its main concept of it starts from Dependency Inversion, a principle of SOLID.

**Dependency Inversion said:**

> * High-level modules should not not depend on low-level modules. Both should depend on abstractions.
> * Abstractions should not depend on details. Details (concrete implementations) should depend on abstractions.

To prevent dependency inversion, people can use some design pattern, one of them are Dependency Injection.

**The definition of Angular:**

> Dependency injection, or DI, is a design pattern in which a class requests dependencies from external sources rather than creating them. When we create an instance of class A inside class B, it makes class A depend on class B. Class B destroy, then the  
instance of A also be destroyed.

**Dependency:**

Instead of that, we have someplace called IOC container(or just IOC). Our framework (Angular, Spring) will create the instance of A here and inject them to B through the**constructor** or **set function** or through **@Inject** or **Injector** service from `angular/core`.

```typescript
@Component({
    selector: "app-hero-component",
    templateUrl: "./hero-component.component.html",
    styleUrls: ["./hero-component.component.scss"]
})
export class HeroComponent {
    // First way
    constructor(private heroService: HeroService) {
    }

    // Second way
    myService: HeroService;

    constructor(private injector: Injector) {
        if (true) { // some condition
            this.myService = injector.get<HeroService>(MyService);
        }
    }

    // Third way
    constructor(@Inject(HeroService) myService) {
        this.myService = myService;
    }

    // Fourth way
    _myService: HeroService;
    @Input() set myService(myService: HeroService) {
        this._myService = myService;
        this.updatePeriodTypes();
    }
}
```

#### Injector:

So To mark which one can be inject and should be inject, we have a decorator call `@Injectable`... Other decorator like `@Component`, `@Directive`.. can also inject into another, but not an offical way through constructor.

```typescript
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    constructor() {
    }
}
```

When B1, B2 inject the same instance of A, it will share the same property of A. Which B modify the property in A can impact others B.

**Providers:**

So what if we want to make the instance A only available for only B, instead of sharing them for everyone?

Same as @Bean scope in Spring, Angular attach them with the **Module** and uses the keyword "**providedIn**" or " **providers**" to make sure that only some specific module can share with the others. Exactly, to make sure when a class will be created new or should be used exist one in IOC. When it was use out of `provider scope`, the new one will be create.

`provideIn` comes from Angular 6.
`providers` and `provideIn` are almost same. But when the complier found `provideIn`, it will ignore the same one
in `providers`.

```typescript
// First way
@NgModule({
    declarations: [HelloComponent],
    imports: [],
    providers: [HeroService],
})
export class MainScreenModule {
}

// Second way
@Component({
    /* . . . */
    providers: [UserService]
})
// Third
@Injectable({
    providedIn: 'any',
})
export class UserService {
}
```

* When the Module was lazy loaded, Angular will create new instance instead of use the exist one from root, and the new instance will mark as child injector of root.
* `providers` in `@Component` is independent with `providers` in `@Modules`. When you use both of it in an lazy-load module, mean that two news be created.

### 2. View Engine
=> If you wan a short conclude, you can move to the end of this part.

> View Engine is responsible for compiling the components so that they can be consumed by the browser. In Angular, we  
> write our components using TypeScript and it cannot be run directly in browsers and for this purpose we require View  
> Engines which would convert TS into JS

#### What is Renderer2??

> Renderer2 is Angular’s View Engine, it was introduced starting with Angular v4 to boost performance of Angular  
> applications. It is responsibility of view engine to compile components to JS and HTML.  
I really confused about this part of this article "_require View Engines which would convert TS into JS_".

When compile TS to JS, Angular use Typescript complier. I thing some thing wrong here.

Responsibilities of View Engine:

* Template Parsing
* Tree-Shaking
* Compilation

#### 2.1 Template Parsing

> Every angular component has to go through a 4 step process to be rendered in the DOM by browser.Firstly, all the decorators are removed and their configurations are stored in metadata.json file.The template HTML is then converted into JavaScript instructions that are then used by the Angular Interpreter to  
> understand how to display them in the DOM.

> Here the HTML is processed to generate instructions that contains all the details about the HTML.

> All the nodes are observed to check presence of listeners, pipes, directives, etc. and then corresponding actions are  
> attached to the rendered elements.  
**My conclude**

1. View Engine is an Engine of Angular, which come from Angular 4. It also call Rendered2.
2. Main responsibility is mapping between HTML and Ts code, And also convert them from HTML, TS component to a `viewDef`
   and `viewNodes` to use later.
3. After run through Typescript complier, it will convert to Javascript
4. Angular interpreter will use `viewDef` and `viewNode` to render to HTML as needed, and browser will render this HTML.

#### 2.2 Tree shaking

> Tree shaking is a process to remove dead code from the bundle.  
The dead code is the HTML code not use any more.

> Renderer2 does a static analysis of the code, it doesn’t actually execute the code and then determine which part of  
> code to be included in the bundle,  
My conclude:

* Tree shaking normally is a way Angular solves the unused code from the bundle. If a code (C) is used or provided in module A, it will be included in bundle A when A loaded.
* C is not used, C belong to A, A is imported to this module B. Then only the time B calls C then C was added to the bundle.

#### 2.3 Compilation
Renderer2 offers two variants of code compilation:

1. Ahead Of Time Compilation (AOT)

2. Just In Time Compilation (JIT)

* In AOT, the template parsing process takes place at the developer end and thus causing a much smaller and faster build.

* In JIT, the source code and Angular compiler are sent to browser and the whole template parsing process takes place in the browser environment.


| AOT                                                      | JIT                                                                                         |
|----------------------------------------------------------|---------------------------------------------------------------------------------------------|
| 1. When you run build -- prod                            | 1. When you run ng build / ng serve                                                         |
| 2. Compliation take place at the time you run build      | 2. The compliation is done in the browser                                                   |
| 3. Smaller build size since complier not send to browser | 3. Fairly greater build size since the complier is shipped to browser for compliation later |
| 4. Suitable for product build                            | 4. Suitable for local development                                                           |

We can choose complier to build ( “ng build — aot” ) but it not make sense, cause it already config in angular.
- - - -
### 3. Change Detection - NgZone
This is a long topic, but I will note some main content.

> Change Detection means updating the view (DOM) when the data has changed.  
Change detection have two main steps:

1. Update the application model (developer);
2. Reflect the state of the model in the view (Angular).

#### 3.1 How is change detection implemented?
We can separate change detection of angular to two level.
**The low-level Change detection**

1. At the time Angular startup, it will patch some low-level browser APIs, such as *`addEventListenter`*, *
   *`setTimeout()`**, *`setInterval()`*..., and also *`Ajax HTTP requests`*. It will override like this. Beside call
   the origin function It also call change detection.

  ```javascript
  // this is the new version of addEventListener
  function addEventListener(eventName, callback) {
      // call the real addEventListener
      callRealAddEventListener(eventName, function() {
          // first call the original callback
          callback(...);     
          // and then run Angular-specific functionality
          var changed = angular.runChangeDetection();
          if (changed) {
              angular.reRenderUIPart();
          }
      });
  }
  ```

2. This low-level patching of browser APIs is done by a library shipped with Angular call `Zone.js`. A zone is nothing more than an execution context that survives multiple Javascript VM execution turns.
3. Angular uses Zones internally to trigger change detection, application profiling, or keep track of long stack traces that run across multiple VM turns.
4. One limitation of this way is mechanism if an async browser APIs not supported by `Zone.js` then change detection will not be triggered. For example: IndexedDB Callback.

**The high-level change detection**

The high level of change detection is the change detecion in high-level like Component, Directive...

#### 3.2 The Flow
Your application is basically composed of what we call a component tree.

If we modify `TodosComponent`, by changing the value of the first item of the todos’ list (in yellow), we will have the following flow:

1. The developer is making changes to the model (like a component’s bindings);
2. Angular’s change detection kicks in to propagate the changes;
3. Change detection goes through every components in the component tree (from top to bottom) to check if the model it depends on changed;
4. If Yes, it will update the component;
5. Angular updates the component’s view (DOM).

Same if `AppComponent` change, all the lower level node - tree will be selected.

#### 3.3 Angular Change Detection Strategies
**ChangeDetectionStrategy.Default**
In order to know whether the view should be updated, Angular needs to access the new value, compare it with the old one, and make the decision on whether the view should be updated. By default, Angular makes no assumption on what the component depends upon. So it has to be **conservative** and **will checks every time something may have changed**, *
_this is called dirty checking_*.

**ChangeDetectionStrategy.onPush**
When using the onPush strategy on the component, you basically say to Angular that it should not make any guess on when it needs to perform the check for change. It will rely only on the change of the Input references, some events triggered by itself (the component) or one of its children.

Lastly, you, the developer, can ask explicitly Angular to do it with the componentRef.markForCheck() method.

#### 3.4 NgZone
NgZone is `zone.js` but modified for Angular. in the part [3.1](#31-how-is-change-detection-implemented) you know that all change detection of angular was implement here. And it was implement by patching the Web Browser APIs.

`4. One limitation of this way is mechanism if an async browser APIs not supported by **Zone.js** then change detection will not be triggered. For example: IndexedDB Callback.`

Cause this reason, ngZone also provide a function call `.run()` to solve this.

What happend when we dont use Zone.js any more? or we wanna do some stuff without trigger any change detection. ngZone already support that, please read more about it [here](https://angular.io/guide/zone).

### 4. Pipe

> Use pipes to transform strings, currency amounts, dates, and other data for display. Pipes are simple functions to use in template expressions to accept an input value and return a transformed value.  

> Applying two formats by chaining pipes  

```html
The chained hero's birthday is
{{ birthday | date | uppercase}}
```

Pipe have two types

#### 4.1. Pure Pipe

* By default, pipes are defined as pure so that Angular executes the pipe only when it detects a pure change to the input value.
* A pure change is either a change to a primitive input value (such as String, Number, Boolean, or Symbol), or a changed object reference (such as Date, Array, Function, or Object).
* A pure pipe must use a pure function, which is one that processes inputs and returns values without side effects.

#### 4.2. Impure Pipe
Cause pure pipe cannot work correct if input not change reference. We have impure pipe to solve this. An impure pipe is called for every change detection cycle no matter whether the value or parameter(s) changes.

> Angular executes an impure pipe every time it detects a change with every keystroke or mouse movement.  
> While an impure pipe can be useful, be careful using one. A long-running impure pipe could dramatically slow down your application.

### 5. Directive

> Directives are classes that add additional behavior to elements in your Angular applications. Use Angular's built-in  
> directives to manage forms, lists, styles, and what users see.

The different types of Angular directives are as follows:

* **Components — directives** with a template. This type of directive is the most common directive type.
* **Attribute directives** — directives that change the appearance or behavior of an element, component, or another directive. Example:
  NgClass / NgStyle / NgModel or any custom directive similar
* **Structural directives** — directives that change the DOM layout by adding and removing DOM elements. Example: ngFor / ngIf /ngTemplateOutlet

### 6. Decorator
Decorator is a concept of Typescript

> A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property,  
> or parameter.

> Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with  
> information about the decorated declaration.  
> For example, given the decorator @sealed we might write the sealed function as follows:

```typescript
function sealed(target) {
    // do something with 'target' ...
}
```

Thus, Angular decorator have the same purpose as definition about typescript decorator. Just for running something.

Each Angular decorator will map to one function in Angular core. For example. @Injectable is an decorator tel Angular that Angular can inject itself to others. while @Component, @Directive show Angular what are they and what they can do. To read more about them you should visit @Angular website or read Angular. Core source code

### 7. Content projection
Content projection is a pattern in which you insert, or project, the content you want to use inside another component.
For example, you could have a Card component that accepts content provided by another component.

There are three way to implement content projection.

#### 7.1. Single-slot content projection.

```typescript
import {Component} from '@angular/core';

@Component({
    selector: 'app-zippy-basic',
    template: `
    <h2>Single-slot content projection</h2>
    <ng-content></ng-content>
  `
})
export class ZippyBasicComponent {
}
```

Just add content inside

```html
<app-zippy-basic>
    <p>Is content projection cool?</p>
</app-zippy-basic>
```

#### 7.2. Multi-slot content projection

```typescript
import {Component} from '@angular/core';

@Component({
    selector: 'app-zippy-multislot',
    template: `
    <h2>Multi-slot content projection</h2>

    Default:
    <ng-content></ng-content>

    Question:
    <ng-content select="[question]"></ng-content>
  `
})
export class ZippyMultislotComponent {
}
```

```html

<app-zippy-multislot>
    <p question>
        Is content projection cool?
    </p>
    <p>Let's learn about content projection!</p>
</app-zippy-multislot>
```

Content that uses the `question` attribute is projected into the  element with the `select=[question]` attribute.

#### 7.3. Conditional content projection
Same as the way you use `<ng-container>` and `<ng-template>` with `ngTemplateOutlet`
[Read more](https://angular.io/guide/content-projection)

### 8. RxJS

> **RxJS is a library** _ **for composing asynchronous and event-based programs** by using observable sequences. It  
> provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by  
> Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

> Think of RxJS as Lodash for events.

I will note some attention points.

1. RxJS is a library
2. Using to composing async and event-base program by using observable sequences. Famous for Reactive programming
3. Three ideas create RxJS are Observer pattern, Iterator pattern and functional programming with collections

> The essential concepts in RxJS which solve async event management are:* **Observable**: represents the collection of future values or events.
> * **Observer**: is a collection of callbacks that knows how to listen to values delivered by the Observable.
> * **Subscription**: represents the execution of an Observable, is primarily useful for cancelling the execution.
> * **Operators**: are pure functions that enable a functional programming style of dealing with collections with  
    > operations like map, filter, concat, reduce, etc.
> * **Subject**: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple  
    > Observers.
> * **Schedulers**: are centralized dispatchers to control concurrency, allowing us to coordinate when computation  
    > happens on e.g. setTimeout or requestAnimationFrame or others.

The popular operators: pipe, of, from, map, first, filter, switchMap, concatMap, mergeMap, takeUntil, combineLatest

The popular Schedulers: interval, debounce

In an interview, interviewer usually ask about some concept like _switchMap_, _concatMap_, _mergeMap_, _combineLatest_.

**Switch Map**: Map to observable, complete previous inner observable, emit values.

**Merge Map**: For instance, when using switchMap each inner subscription is completed when the source emits, allowing only
one active inner subscription. In contrast, mergeMap allows for multiple inner subscriptions to be active at a time.

**Concat Map**: Same as merge map but keep them in order, It does not subscribe until the previous is complete.

**Combine Latest**: When any observable emits a value, emit the last emitted value from each. Be aware that combineLatest**will not emit an initial value until each observable emits at least one value**.

### 9. State Management
The state management in Angular is classified in two ways, similar to other frameworks, Redux and Non-Redux.

1. Using service and RxJS Normally in this technique, People use Behavior Subject, Subject, Event Emitter, Observable to store the state and send event.
2. Using library like NGXS, NgRx This technique usually have some common concept like Store, State, Reducer, Selector, Effect (Side effect), Action.

But whatever way we choose, there are too main point we should to consider.

#### Do we really need State Management?

Please always remember that, If you cannot find a good reason to use the state management, you don't need to. In my opinion, I'm only use Sate Management in cases study bellow.

* Complex business logic and business operations which require complex State Management. They are frequently changing and need to be subscribed to and handled in a complex way.
* Complex screens with many components need to share state with each others. components <-> components. Screen <-> Screen
* Implement follow StoryBook
* Project can be complex in the future.

#### Stateless and Stateful

Whatever State Management ways you choose. There are two kinds of components.

* Stateless component:
  This is a component which take state from parent and use it to display on the screen. Everytime it get a new state value from parent, itself display it. And instead of change the state value directly, it emits event to parent and tell its parent update that state. The new state value will be send to the child and child will update state again. It have no state, it cannot manage its state, so it called stateless. Ex: A custom radio button component, when you select a radio button, you will emit event to the parent (form), then the form will update the state, after that the latest state will be pass to the custom form and display into the screen.

* Stateful component:
  Different with Stateless, stateful component is a component which itself can manage it state. Regarding the concept above, if we choose to update the state inside the child component then tell the parent it was update, or pass the latest value to the parent, or emits an event to the parent.

When do we use Stateless and when do we use Stateful? Remember that no one is bad, It depends, I prefer which is most
suitable.

#### Dumb and Smart

> Dumb doesn’t mean stateless and Smart doesn’t mean stateful.  
> We can think of it this way: a dumb component is one that has no dependencies from outside(but depends only on the  
> parent it belong to). Vice versa, a smart component has dependencies! It means that it knows where he is, it knows that he’s part of a bigger application. It is aware of its surroundings. It’s a living thing. Sort of.

### 10. Webpack & Custom webpack
Some Angular developer work with angular for a few years but never touch or and think about webpack. When you want to understand more about Angular, you have to understand about webpack.

#### 10.1 What is webpack?

First as usually, we will take a look at definition and some main points of webpack on the home page.

> At its core, webpack is a static module bundler for modern JavaScript applications.
>
> When webpack processes your application, it internally builds a dependency graph from one or more entry points.
>
> ...then combines every module your project needs into one or more bundles, which are static assets to serve your content from

#### 10.2 Why

Do you like history? I like it, by understand the circumstance Webpack was born, you will get more understand the reason why

>There are two way to run java scrip in a browser.
>
>First, include a script for each functionality; 👉 This solution is hard to scale because loading too many script can cause network bottleneck.
>
>The second option is to use a big `.js` file containing all your project code 👉 but this leads to problems in scope, size, readability, and maintainability.

**And then IIFEs came.**

>IIFEs solve scoping issues for large projects; when script files are wrapped by an IIFE, you can safely concatenate or safely combine files without worrying about scope collision.
>
>The use of IIFEs led to tools like Make, Gulp, Grunt, Broccoli or Brunch. These tools are known as task runners, and they concatenate all your project files together.
>
>However, changing one file means you have to rebuild the whole thing. Concatenating makes it easier to reuse scripts across files but makes build optimizations more difficult. **How can you find out if code is actually being used or not?**
>
>Even if you only use a single function from lodash, you have to add the entire library and then squish it together. How do you treeshake the dependencies on your code? Lazy loading chunks of code can be hard to do at scale and requires a lot of manual work from the developer.

**Birth of JavaScript Modules happened thanks to Node.js**

>Webpack runs on Node.js, a JavaScript runtime that can be used in computers and servers outside a browser environment.
>
>When Node.js was released a new era started, and it came with new challenges. Now that JavaScript is not running in a browser, how are Node applications supposed to load new chunks of code? There are no html files and script tags that can be added to it.
>
>CommonJS came out and introduced require, which allows you to load and use a module in the current file. This solved scope issues out of the box by importing each module as it was needed.
>
>**But there is no browser support for CommonJS**. There are no live bindings. There are problems with circular references. Synchronous module resolution and loading is slow. While CommonJS was a great solution for Node.js projects, browsers didn't support modules, so bundlers and tools like Browserify, RequireJS and SystemJS were created, allowing us to write CommonJS modules that run in a browser.
>
>The good news for web projects is that modules are becoming an official feature in the ECMAScript standard. However, browser support is incomplete and bundling is still faster and currently recommended over these early module implementations.
>
>Old school Task Runners and even Google Closure Compiler requires you to manually declare all dependencies upfront. While bundlers like webpack automatically build and infer your dependency graph based on what is imported and exported. This along with other plugins and loaders make for a great developer experience.

**Wouldn't it be nice…**

>...to have something that will not only let us write modules but also support any module format (at least until we get to ESM) and handle resources and assets at the same time?
>
>**This is why webpack exists. It's a tool that lets you bundle your JavaScript applications (supporting both ESM and CommonJS), and it can be extended to support many different assets such as images, fonts and stylesheets.**
>
>Webpack cares about performance and load times; it's always improving or adding new features, such as async chunk loading and prefetching, to deliver the best possible experience for your project and your users.

#### 10.3 How webpack work?

- From your `.js`, `.css`, and assets files, webpack builds a dependency graph. 
- In this graph, there could be one or more entry points. (`./src/index.js`)
- And then webpack push and combine every module your project needs into one or more bundles (include `css`, statics files like .img they all push or loaded in these bundles `.js`).
- During push and combine these modules, webpack use some technique like tree-shaking or etc, to remove unused scripts and keep only used.
- These bundles can be load directly at init time or lazy load depends on you. What ever, because of dependency graph, they are always loaded in order.

After read basicly about webpack, I decide that I will I go deep on it and write a detail post about it >here< (If you don't see it, it means that I did notthing)

#### 10.4 How to custom webpack in Angular?

By default webpack is used by Angular and wrap inside Angular schematics, these command like (`ng-build`, `ng serve`) are use webpack. Angular allows us to configure some common basic flags through `angular.json` file instead of access webpack directly. However, We can custom webpack by use custom builders.
1. The command `npm i @angular-builders/custom-webpack -D` will help you to install this package.
2. In `angular.json` change the `@angular-devkit/build-angular:browser` builder to `@angular-builders/custom-webpack:browser`
Please remember that, if you use `@angular/universal` you can replace it by `@angular-builders/custom-webpack:server`. And add the `customWebpackConfig` inside `options`

```json
"architect": {
    ...
    "build": {
        "builder": "@angular-builders/custom-webpack:browser"
        "options": {
            "customWebpackConfig": {
               "path": "./extra-webpack.config.js"
            }  
            ...
        }
    ...
}
```

3. Then create a new `extra-webpack.config.js` files in /root

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.cool$/,
        use: 'cool-loader'
      }
    ]
  }
};
```
If you need more advance, you can export a function instead.

```javascript
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = (config, options) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      'APP_VERSION': JSON.stringify(pkg.version),
    }),
  );

  return config;
};
```
You can refer the `@angular-builders/custom-webpack` documents to [read them all](https://www.npmjs.com/package/@angular-builders/custom-webpack)

### 11. Optimize

I wrote a post about loadtime [here](https://nhvu95.com/blog/reduce-load-time)

### 12. Performance handling

Besides optimize website loading time, bellows are some cases make your angular app slow.

1. Too much unnecessary change detection triggering making the app slow.(Keywords: On Push, Pure Pipe, trackBy in ngFor, Detach change detection ...)
2. Too much boostrap logic. (EX: A tons of things inside constructor / services then all are inject in 'root')
3. Memory leaks. All the bad things that can happen in `.js` can happen in `.ts`, (closure, scope chain, ...etc - check dev tools)
4. Subscribe until you die. (unsubscribe, takeUntil, async pipe)

### 13. CI/CD

Circle CI, Travis CI, Jenkin.

### 14. Scalable design.

Always remember that `package by features`, should not `package by layers`. Refer to John Papa's design structure, SOLID, DRY, and tons of things else.
Use some command design patterns like COMMANDERs, and DI. Consider mono repo, or micro-frontend if your team size is big.

### 15. Deploy

There are two ways to deploy.
1. Deploy as static page: Nginx or any services avaiable on the internet (github page, netlify, static-page azure.. etc)
2. Deploy as server: Use for `SSR`, you can run it in `VPS` or `Docker` with `Nodejs`. You can use `ng serve` for production but you should not do that because `ng serve` use `webpack-dev-server` that is build for development only.
