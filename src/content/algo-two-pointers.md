---
title: 'Two Pointers and some Attention Points'
description: "These are some attention points I got when practicing on leetcode. These can help you succeed in the first submit, and the Interviewer will like that."
date_start: "2022/01/12"
date_end: '2022/01/12'
published: true
image: 'https://i.imgur.com/hec5VZk.jpg'
header_image: 'https://i.imgur.com/6Ptn2TK.png'
tags: ['Did I Miss','Algorithm','Two Pointers']
priority: 1
link: '/blog/algo-two-pointers'
slug: algo-two-pointers
location: 'Phu Tho, Vietnam'
---

_**This series is my notes when I exercise algorithm in LeetCode. Actually, I'm not a good person who best knows about the algorithm, my knowledge just learned from my friend and summary from the internet. But I hope this may help you for the next interview.  
I assume that you already have knowledge about Two Pointers. If you don't, it's ok, you just know at least about Loop.**_

## I. What is Two Pointers approach?

Essentially, The Two Pointers approach is just a way you use two-pointers ( two variables) to browse an array and to solve your problems. And you know, with just two variables, there are plenty of ways to browse a collection. It is very efficient to browse an array cause normally the complexity is O(n), better than brush force with O(n<sup>2</sup>).  
So in this post, I will list some attention points and some variations of two pointers approach, which you usually meet in an interview.

## II. Which challenges we should think to solve by use Two Pointers ?

1. **This is an array or a string, and the requirement ask the `time complexity is O(n)` or the `space complexity is O(1)`**.
2. **Need check value of two elements in array to calculate something or solve the problem.**
3. **Need predict the value of some next elements to take action for the current element.**
4. **Binary Search, Sliding Window, and some of the others are a variation of Two Pointers.**

## II. Some attention points

### #Template 1: Sentinel and Predecessor

* **We usually use this approach when we work with the Linked List**
* **Or when we need to predict the next item, but still keep the last item and take action with current item**

This approach is very efficient for linked list. It help you ignore the case null or empty at some points like head and middle of list.

Let see this challenge: [82. Remove Duplicates from Sorted List II][82]
<p align="center" width="100%">
    <img src="https://i.imgur.com/UuTA63k.png" alt="Remove Duplicates from Sorted List II"/>
</p>

Sentinel Node is a way you create an alias pointer (pseudo-heads) to point on the head of Linked List or tail of Linked List. They are purely functional and usually don't hold any data. Their primary purpose is to standardize the situation to avoid edge case handling.

<p align="center" width="100%">
    <img src="https://i.imgur.com/83lcRrs.png" alt="Sentinel Node"/>
</p>

Bellow is my code

```java
public ListNode deleteDuplicates(ListNode head) {
    ListNode sentinel = new ListNode(0, head); // pseudo-heads pointer
    ListNode pre = sentinel; // pred of head
    while(head != null) {
        if(head.next != null && head.val == head.next.val) {
            while(head.next != null && head.val == head.next.val) head = head.next;
            pre.next = head.next;
        } else {
            pre = pre.next;
        }
        head = head.next;
    }
    return sentinel.next;
}
```

* You have fake-head pointer to solve case [1,1,1,1,2,3,4,5]
* Remember that the second while-loop, whill stop at the last number duplicate, not at the next number.
* And when you solve this case, you point by `pre.next = head.next;` so the pre keep on last item.

* `pre` only move when it know that the next number is valid.

**Example challenge:**  

### #Template 2: Run in the both direction -->[1,1,1,1,2,3,4,5]<--

* **Use when we have to browse an array, but the requirement ask us to keep `Space Complexity = O(1)` or keep the `Time Complexity = O(n)`**

The famous one of Template 2 is the Two Sum challenge 😆

[167. Two Sum II - Input Array Is Sorted][167]

>Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
>
>Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
>
>The tests are generated such that there is exactly one solution. You may not use the same element twice.

>**Example 1:**  
>Input: numbers = [2,7,11,15], target = 9  
Output: [1,2]  
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

>**Example 2:**   
>Input: numbers = [2,3,4], target = 6  
>Output: [1,3]  
>Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

```java
public int[] twoSum(int[] numbers, int target) {
    int i = 0, j = numbers.length - 1;
    while(i < j){
        if(numbers[i] + numbers[j] == target) return new int[]{i+1, j+1};
        else if(numbers[i] + numbers[j] < target) {
            i++;
        } else {
            j--;
        }
    }
    return new int[0];
}
```

Of course, we can use the `hash map` or `array`. But It's better when we use only O(1) Space Complexity.

### #Template 3: Run in both of two arrays

Beside two pointers approach for one array, we also have another approach, which we use two pointers for two arrays and browse it at the same time.  
Let's look this challenge.  
[844. Backspace String Compare][844]

>Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.
>
>Note that after backspacing an empty text, the text will continue empty.  
>_**Can you solve it in O(n) time and O(1) space?**_  
>
>**Example 1:**  
>Input: s = "ab#c", t = "ad#c"  
>Output: true  
>Explanation: Both s and t become "ac".  
>
>**Example 2:**  
>Input: s = "ab##", t = "c#d#"  
>Output: true  
>Explanation: Both s and t become "".  
>
>**Example 3:**  
>Input: s = "a#c", t = "b"  
>Output: false  
>Explanation: s becomes "c" while t becomes "b".  

Let do it yourself. It's not easy as you thinks.

### 6. Sample challenges

[**1. Two Sum**][1]  
[**15. Three Sum**][15]  
[**986. Interval List Intersections**][986]  
[**11. Container With Most Water**][11]

[1]: https://leetcode.com/problems/two-sum/
[15]: https://leetcode.com/problems/3sum/
[82]: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
[167]: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
[844]: https://leetcode.com/problems/backspace-string-compare/
[986]: https://leetcode.com/problems/interval-list-intersections/
[11]: https://leetcode.com/problems/container-with-most-water/
