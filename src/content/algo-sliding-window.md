---
title: 'Sliding Window and some Attention Points'
description: "These are some attention points I got when practicing on leetcode. These can help you succeed in the first submit, and the Interviewer will like that."
date_start: "2022/01/01"
date_end: '2022/01/14'
published: true
image: 'https://i.imgur.com/Vf52rxp.png'
header_image: 'https://i.imgur.com/yjRanku.png'
tags: ['Did I Miss','Algorithm','Sliding Window']
priority: 1
link: '/blog/sliding-window'
slug: algo-sliding-window
location: 'Phu Tho, Vietnam'
---

_**This series is my notes when I exercise algorithm in LeetCode. Actually, I'm not a good person who best knows about the algorithm, my knowledge just learned from my friend and summary from the internet. But I hope this may help you for the next interview.  
I assume that you already have knowledge about Sliding Window. If you don't, it's ok, you just know at least about Loop.**_

## I. Which challenges we should think to solve by the Sliding Window ?

>The main idea behind the sliding window technique is to convert two nested loops into a single loop. Usually, the technique helps us to reduce the time complexity from O(n^2) to O(n). - [baeldung]

1. **When dealing with problems that require checking the answer of some ranges inside a given array, maybe you have to re-calculate those ranges many times.**
2. **When a problem you can solve by using Brush Force, You can try to solve it about use a sliding window, it does not work for all, but work for a lot.**
3. **If the requirement is required a monotone increasing function. Find min length, max length of sub-array to meet the requirement. Ex: Min length sub-arrays to get maximum Sum, Product...**

## II. Some attention points

Same as others approaching, Sliding Window also has some variation*. Here next I will list some kind of them, which is very popular and easy to find in some interview contest.

### #Template 1: The fixed-size sliding window

The fixed sliding window usually comes with challenges about the conversion of fixed subString, repeated substring, or calculating K numbers in an array.

### #Template 2: The flexible-size sliding window

The flexible-size sliding window asks you to re-calculate the sub-array many times, and this will depend on the value of the `fast` pointer. After re-calculate the `slow` will move to the next value, until it meet requirement, or `fast == length`.

The re-calculate action may ask you to do some stuff like another loop, or binary search...

There are [**plenty of challenges**][1] about this topic, it's quite simple, Let's try it yourself.


<!-- ### #Template 3: The sliding windows which require to re-calculate many times -->
[1]: https://leetcode.com/problemset/all/?page=1&topicSlugs=sliding-window
