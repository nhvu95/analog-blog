---
title: 'Linked List and some Attention Points'
description: "These are some attention points I got when practicing on Leetcode. These can help you succeed in the first submission, and the Interviewer will like that."
date_start: "2022/02/17"
date_end: '2022/02/18'
published: true
image: 'https://i.imgur.com/4Tf7x88.png'
header_image: 'https://i.imgur.com/paResCU.png'
tags: ['Did I Miss','Algorithm','Linked List','LeetCode', 'Practice']
priority: 1
link: '/blog/linked-list'
slug: algo-linked-list
location: 'Hanoi, Vietnam'
---

_**This series is my notes when I exercise algorithm in LeetCode. Actually, I'm not a good person who best knows about the algorithm, my knowledge just learned from my friend and summary from the internet. But I hope this may help you for the next interview.  
I assume that you already have knowledge about [Two Pointer][1] approach. If you don't, please read about it a little.**_

## I. Why did this note was written?

Almost all solutions of the Linked List challenge in Leetcode can solve by the [Two Pointers][1] approach. I thought so.
But when I got to work,  I noticed that I should write a note about the Linked List, because "It's not just simple as I think, and we have plenty of ways to use Two pointers approach to solving a challenge in Linked List."  
Now get start

## II. Some Properties of the Linked List

Old but gold, I want to remind them, and they are helpful when solving a challenge.

1. **The first node of the linked list is called the head of the linked list**
2. **The last node of the linked list is pointing to NULL**
3. **Unlike arrays, linked list elements are not stored at contiguous memory locations**
4. **Linked Lists addresses some of the limitations of arrays of having a fixed size because Linked Lists are dynamic in nature**

Following, I will note some classic challenges, and also mark types for them. These are the basic types, which you can use for the bigger challenge.
Maybe CRUD a node in a Linked List, or some action like Indexing.. which is simple then I will not mention here.

### #Template 1: Remove some thing from Linked List

Does it different with challenge delete a node in the end? No I don't mean that. I mean about some challenge like:

19. [Remove Nth Node From End of List][19]
82. [Remove Duplicates from Sorted List II][82]
203. [Remove Linked List Elements][203]

When we remove a node, we always keep track of `prev_node` and try to point `prev_node.next` to the `delete_node.next` right?
Of cause, we can implement pre-node. But what happens If the deleted node is the first node?

In this template, always remembers about **Sentinel and Predecessor** which I already mention in [Two Pointer][1] post.

> **Sentinel and Predecessor**
> 
> **We usually use this approach when we work with the Linked List**
> **Or when we need to predict the next item, but still keep the last item and take action with current item**
> 
> This approach is very efficient for linked list. It help you ignore the case null or empty at some points like head and middle of list.
> 
> Let see this challenge: [82. Remove Duplicates from Sorted List II][82]
> <p align="center" width="100%">
>     <img src="https://i.imgur.com/UuTA63k.png" alt="Remove Duplicates from Sorted List II"/>
> </p>
> 
> Sentinel Node is a way you create an alias pointer (pseudo-heads) to point on the head of Linked List or tail of Linked List. They are purely functional and usually don't hold any data. Their primary purpose is to standardize the situation to avoid edge case handling.
>
> <p align="center" width="100%">
>     <img src="https://i.imgur.com/83lcRrs.png" alt="Sentinel Node"/>
> </p>
> 
> Bellow is my code
> 
> ```java
> public ListNode deleteDuplicates(ListNode head) {
>     ListNode sentinel = new ListNode(0, head); // pseudo-heads pointer
>     ListNode pre = sentinel; // pred of head
>     while(head != null) {
>         if(head.next != null && head.val == head.next.val) {
>             while(head.next != null && head.val == head.next.val) head = head.next;
>             pre.next = head.next;
>         } else {
>             pre = pre.next;
>         }
>         head = head.next;
>     }
>     return sentinel.next;
> }
> ```
> 
> You have fake-head pointer to solve case [1,1,1,1,2,3,4,5]
> Remember that the second while-loop, whill stop at the last number duplicate, not at the next number.
> And when you solve this case, you point by `pre.next = head.next;` so the pre keep on last item.
> 
>* `pre` only move when it know that the next number is valid.

### #Template 2: Reverse a section of Linked List or all Linked List

This challenge type ask us to reverse a section of Linked List or all Linked List. It usually comes with challenge about **Symmetric** like **Palindrome**, **Mountain** or that.

* [206. Reverse Linked List][206]
* [234. Palindrome Linked List][234]


But always remember that we have two ways to reverse a Linked List.

1. **Reverse by point current node to head**

```java
public ListNode reverseList(ListNode head) {
    if(head == null) return null;
    ListNode currentHead = head;
    while(head.next != null) {
        ListNode theNext = head.next;
        head.next = theNext.next;
        theNext.next = currentHead;
        currentHead = theNext;
    }
    return currentHead;
}
```

2. **Reverse by point current node to previous node**

```java
public ListNode reverseList(ListNode head) {
    if(head == null) return null;
    ListNode pre = null;
    ListNode tmp = head;
    while(tmp != null) {
        ListNode next = tmp.next;
        tmp.next = pre;
        pre = tmp;
        tmp = next;
    }
    return pre;
}
```

### #Template 3: The Intersection of two Linked List

Let look a bit about this challenge [Intersection of Two Linked Lists][160].  
We can imagine that our challenge will look like this.

<p align="center" width="100%">
    <img src="https://i.imgur.com/ai15wSZ.png" alt="Intersection of two Linked List"/>
</p>

**Let's observe carefully the above image, do you notice anything?**  
Yes, the intersection has to always be smaller than `a.length` from the tail of the linked list.

So this is the solution.

      1. Calculate the length of the linked list A.
      2. Calculate the length of the linked list B.
      3. Skip `|B-A|` nodes from start of greater.
      4. compare until it point to a same node.

```java
// We assume that a > b
public ListNode run(ListNode a, ListNode b, int geaterA) {
    ListNode tmpA = a;
    int tmpLen = 0;
    while(tmpLen < geaterA) {
        tmpLen++;
        tmpA = tmpA.next;
    }
    ListNode tmpB = b;
    while(tmpB != tmpA){
        tmpB = tmpB.next;
        tmpA = tmpA.next;
    }
    return tmpA;
}

public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    int lenA = 0, lenB = 0;
    ListNode tmp = headA;
    while(tmp != null) {
        lenA++;
        tmp = tmp.next;
    }
    tmp = headB;
    while(tmp != null) {
        lenB++;
        tmp = tmp.next;
    }
    if(lenA < lenB) return run(headB, headA, lenB - lenA);
    else return run(headA, headB, lenA - lenB);
}
```

Of course this solution is fine, and the complexity is about O(n) for time, O(1) for space.

**But we also have another way, It's about the period. And it will take one loop only**  

If we run through the A and B at the same time. In the end, A will finish before B and soon before `|B-A|` step. So if I make two pointers and switch between them at the end, they will meet each others after `B` steps.

```java
public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    ListNode pA = headA;
    ListNode pB = headB;
    while (pA != pB) {
        pA = pA == null ? headB : pA.next;
        pB = pB == null ? headA : pB.next;
    }
    return pA;
    // Note: In the case lists do not intersect, the pointers for A and B
    // will still line up in the 2nd iteration, just that here won't be
    // a common node down the list and both will reach their respective ends
    // at the same time. So pA will be NULL in that case.
}
```

### #Template 4: Circular Linked List

The famous challenge for this kind is challenging to check a linked list is a circular linked list or not. But it's kindly simple, just two-pointers with two speed runs at the same start.  

```java
//...
ListNode ptr1, ptr2;
while(ptr1 != ptr2){
    //...
    ptr1 = head.next;
    ptr2 = head.next.next;
    //...
}
//...
```

And if the threads ask us to get the start of circle. Let's make another pointer run from the start after `ptr1` and `ptr2` meet each other.

```java
//...
ListNode ptr3 = head;
while(ptr1 != ptr3){
    //...
    ptr1 = ptr1.next;
    ptr3 = ptr3.next;
    //...
}
//...
```

They will meet soon at the start of circular.

### #Template 5: Re-arrange the linked list

This kind of template usually asks you to re-arrange a Linked List. Like re-ordered odd, even to two different parts, or whatever they want.
This kind of template is just solved by using the Two Pointer approach. You just need to practice and remember the end loop condition and everything is fine. Good luck friend.


<!-- ### #Template 3: The sliding windows which require to re-calculate many times -->
[1]: https://nhvu95.com/blog/algo-two-pointers
[19]: https://leetcode.com/problems/remove-nth-node-from-end-of-list/
[82]: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/
[203]: https://leetcode.com/problems/remove-linked-list-elements/
[206]: https://leetcode.com/problems/reverse-linked-list/
[234]: https://leetcode.com/problems/palindrome-linked-list
[160]: https://leetcode.com/problems/intersection-of-two-linked-lists/
