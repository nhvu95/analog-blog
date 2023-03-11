---
title: 'Intersection Observer API. Which I should know from the start'
description: "The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport."
date_start: "2021/09/24"
date_end: '2021/09/28'
published: true
image: 'https://dsm01pap001files.storage.live.com/y4mVxpQapPkoUEqIMy8M3nkuZMIvlBtJjVp3FaLJt8F8yPYnv4w3yOgSLzdUEbI8EKu0c450rn8tAYtihRbtypLtmr-3kbwxinAJBXXWhp9ZtlB4fHQz-SAxXiJOAcqHOxJHKFlCiE_h_Pg5FQ1BJKTz7CL3DIGaf51dYPe0xjvSh1Iqn3qtQLvf-Qt6urYVcbK?width=660&height=383&cropmode=none'
header_image: 'https://dsm01pap001files.storage.live.com/y4mVxpQapPkoUEqIMy8M3nkuZMIvlBtJjVp3FaLJt8F8yPYnv4w3yOgSLzdUEbI8EKu0c450rn8tAYtihRbtypLtmr-3kbwxinAJBXXWhp9ZtlB4fHQz-SAxXiJOAcqHOxJHKFlCiE_h_Pg5FQ1BJKTz7CL3DIGaf51dYPe0xjvSh1Iqn3qtQLvf-Qt6urYVcbK?width=1539&height=893&cropmode=none'
tags: ['Today I Learned','Frontend','Did I Miss']
priority: 1
link: '/blog/intersection-observer-api'
slug: intersection-observer-api
location: 'Hanoi, Vietnam'
---

**intersection(n)**: Sự giao nhau, sự giao thoa.  
**observe(v)**: Quan sát

## 1. How it come?

Today, when I work on project [Angular Pinterest Clone](https://github.com/HieuNguyenVu/angular-pinterest-clone).

I have to face a challenge:

>**How to hide the DOM elements out of the viewport?  
How to check and catch out viewport event in the right way?**

As the way I did before, I will use `Element.getBoundingClientRect()` to get the position of elements, get viewport space, and check they are out of viewport or not.
But what problem if we have a hundred of thousand DOM elements on DOM?
I already searched and found this question on [Stack Overflow](https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport).

The keyword I got at the answer of [AndyE](https://stackoverflow.com/a/15203639) reminded me about a post I have read before in group Angular Vietnam, and I forgot it. That is stupid. That's why If you only hear about something but never try to use it, you will forget it one day.

<p align="center" width="100%">
    <img src="https://dsm01pap001files.storage.live.com/y4mEnHNfRRSRhBDTNJ455Z2wAbL5QMA2-FgiRJz8OXDDo55QuEFau1zgGaLmJ6EBOmQvKeQ_yXdYC2I5Z2AwBb99eIfZfU1DP-JRbETuM9wulRNtcCL5x_BKKvMdV-cz6Pz39wLcIPdOMMDkj4Js6ssFXV4-WH_jpRMlulMl5NhzWsziodQ3AkcAzLRIgHj72yn?width=508&height=760&cropmode=none" width="508" height="760" alt="Intersection Observer"/>
</p>

## 2. So now, What is Intersection Observer API ?

Firstly, I have to say that: `Intersection Observer API` is a Web API.  
That mean It was default provided by browser. You can see the full doc in [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Now you can skip my website and read the original post :D.

For anyone who still stay, this content below is my summary when read this topic, and my experience when investigate it.

>*Historically, detecting visibility of an element, or the relative visibility of two elements in relation to each other, has been a difficult task for which solutions have been **unreliable** and prone to causing the browser and the sites the user is accessing to become **sluggish**.* 

**reliable >< unreliable(adj)**: cannot trust.  
**sluggish(adj)**: very slow.

The need of this kind information has grown. People need it for some reasons like:

1. Lazy-loading of images or other content as a page is scrolled.  
2. Implementing "infinite scrolling" web sites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.  
3. Reporting of visibility of advertisements in order to calculate ad revenues.  
4. Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

>In the past, implementing intersection detection involved event handlers and loops calling methods like ```Element.getBoundingClientRect()``` to build up the needed information for every element affected.  
Since all this code runs on the main thread, even one of these can cause performance problems. When a site is loaded with these tests, things can get downright ugly.

This is the way an ads run on a website.

>It uses a vendor-provided library to manage the advertisements placed periodically throughout the page, has animated graphics here and there, and uses a custom library that draws notification boxes and the like.  
Each of these has its own intersection detection routines, all running on the main thread. As the user scrolls the page, these intersection detection routines are firing constantly during the scroll handling code

So how `Intersection Observer API` work ? I like to point some important keys/parts like this.

>1. The Intersection Observer API lets code register a callback function...  
2. ...that is executed whenever an element they wish to monitor enters or exits another element (or the viewport)...
3. ...or when the amount by which the two intersect changes by a requested amount

And by this way, sites no longer need to do anything on the main thread to watch for this kind of element intersection, and the browser is free to optimize the management of intersections as it sees fit.

## 3. Intersection observer concepts and usage
>The Intersection Observer API allows you to configure a callback that is called when either of these circumstances occurs:
>1. A **target element** intersects either **the device's viewport** or **a specified element**. That specified element is called the **root element** or **root** for the purposes of the Intersection Observer API.

*To explain: **root** is the point element, and Intersection Observer will use it to detect change.*
>2. The first time the observer is initially asked to watch a **target element**.

*Observer will watch target element at initialize time*

### Let see the way we create an Intersection Observer.

```javascript
let options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0
}

let observer = new IntersectionObserver(callback, options);
```
- **threshold**: It was call **intersection ratio**. This is a representation of the percentage of the target element, which is visible as a value between 0.0 and 1.0
- **root**: The element that is used as the viewport for checking visibility of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.  
If you specified the root option, the target must be a descendant of the root element.
- **rootMargin**: Margin around the root. Can have values similar to the CSS margin property,

### Once you have created the observer, you need to give it a target element to watch.

```javascript
let target = document.querySelector('#listItem');
observer.observe(target);
// the callback we setup for the observer will be executed now for the first time
// it waits until we assign a target to our observer (even if the target is currently not visible)
```
Whenever the target meets a threshold specified for the IntersectionObserver, the callback is invoked. The callback receives a list of IntersectionObserverEntry objects and the observer:

```javascript
let callback = (entries, observer) => {
    entries.forEach(entry => {
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
    });
};
```

The list of entries received by the callback includes one entry for each target which reported a change in its intersection status.  
Check the value of the isIntersecting property to see if the entry represents an element that currently intersects with the root.

***Be aware that your callback is executed on the main thread. It should operate as quickly as possible; if anything time-consuming needs to be done, use***
>*Window.requestIdleCallback()*

### How intersection is calculated?
I note some point to catch the main concept.  
1. It use ``getBoundingClientRect()`` to get the container of element. It is the smallest rectangle which bound the element.
2. It uses the ``overflow`` property, same as style/CSS. But it only works for which ``visible``.
3. If containing elements is the root of a nested browsing context, as the body contain an ``iframe``. It will check recursive from root to iframe root then go to element.

4. The clipping rectangle is the orange rectangle, and it will be used to calculate to check conditions about **threshold**. If conditions match, the callback will be called.

<p align="center" width="100%">
    <img src="https://dsm01pap001files.storage.live.com/y4mkyByY99oZeiyjl36HaI5gSToSKv2wQAG-D1Ra_i8D7nH1RTYN-cILL202jmqqYsGszVODuYMHTlLd3bKANT7bDJI3snPPP-1t7GcV9dypdkLbbrTSDVGcRxrI8PNpjG8xSSO2sygCQboPb6kmklvjSJYhVgx7YqrrLvG9W-6oL8VHXY77SaW-qtf4AGIYyX0?width=368&height=363&cropmode=none" width="368" height="363" alt="Intersection Observer calculated"/>
</p>


## 4. Example
You can view the example [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#a_simple_example).

## 5. Intersection Observer API 
It not support IE 11, but you can try it in almost [browsers](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#browser_compatibility)

## 6. Cons
>One thing the Intersection Observer API can't tell you: the exact number of pixels that overlap or specifically which ones they are; however, it covers the much more common use case of "If they intersect by somewhere around N%, I need to do something.
