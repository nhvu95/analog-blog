---
title: 'Binary Search and some Attention Points'
description: "These are some attention points I got when practicing on leetcode. These can help you succeed in the first submit, and the Interviewer will like that."
date_start: "2022/01/01"
date_end: '2022/01/10'
published: true
image: 'https://i.imgur.com/K1BOwur.jpg'
header_image: 'https://i.imgur.com/BEuDltz.jpg'
tags: ['Did I Miss','Algorithm','BinarySearch']
priority: 1
link: '/blog/algo-binary-search'
slug: algo-binary-search
location: 'Hanoi, Vietnam'
---

_**This series is my notes when I exercise algorithm in LeetCode. Actually, I'm not a good person who best knows about the algorithm, my knowledge just learned from my friend and summary from the internet. But I hope this may help you for the next interview.  
I assume that you already have knowledge about Binary Search. If you don't, please read it [here][1].**_

## I. Which challenges we should think to solve by the Binary Search ?

1. **The searching array is already sorted in order.**
2. **The searching array is like binaries continuously. Example: [false,false,false,false,false,true,true,true] or [0,0,0,0,0,0,1,1,1,1]**
3. **The searching value is in a range, have min and max, and we have to find a good fit value to meet the requirement**
4. **We can compare each element by value.**

## II. Some attention points

Binary search have some variation*, each variation use to solve a specific type of challenge. Of course, you can use one for other. But with the correctly type implement, you can solve it faster and reduce the condition check.
_Variation(n): biến thể_

### #Template 1: No depend on other elements and neighbor elements

```java
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while(left <= right){
        int mid = (int)Math.floor((left + right)/2);
        if(nums[mid] == target) return mid;
        else if(nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    // **CHECK_POINT
    return -1;
}
```

* This is most basic and elementary form of Binary Search.
* Search Condition **can be determined without comparing to the element's neighbors** (or use specific elements around it)
* No post-processing required because at each step, you are checking to see if the element has been found. If you reach the end, then you know the element is not found.
* End only when `left > right`.
* Some attention points in above code

>1. `left` always greater or equal `>=` `target` at `CHECK_POINT`.
>2. `right` always is index smaller than `target` at `CHECK_POINT`.
>3. Don't forget check value valid of `left`. It can be out of range.  
For example: **nums** is `[-1,0,3,5,9,12]` and **target** is `13`.  
`left` will equal `6` at `CHECK_POINT`, and it can make `ArrayIndexOutOfBounds` exception.

**Example challenge:**  
[**69. Sqrt(x)**][069]  
[**374. Guess Number Higher or Lower**][374]  
[**33. Search in Rotated Sorted Array**][033]  

### #Template 2: Search for an element or condition which requires accessing the current index and its immediate right neighbors index

```java
int binarySearch(int[] nums, int target){
  if(nums == null || nums.length == 0)
    return -1;

  int left = 0, right = nums.length;
  while(left < right){
    // Prevent (left + right) overflow
    int mid = left + (right - left) / 2;
    if(nums[mid] == target){ return mid; }
    else if(nums[mid] < target) { left = mid + 1; }
    else { right = mid; }
  }

  // Post-processing:
  // End Condition: left == right
  if(left != nums.length && nums[left] == target) return left;
  return -1;
}
```

>1. Search Condition needs to access element's immediate right neighbor
>2. Use element's right neighbor to determine if condition is met and decide whether to go left or right
>3. Gurantees Search Space is at least 2 in size at each step
>4. Post-processing required. Loop/Recursion ends when you have 1 element left. Need to assess if the remaining element meets the condition.

**Example challenge:**  
[**278. First Bad Version**][278]  
[**162. Find Peak Element**][162]  
[**153. Find Minimum in Rotated Sorted Array**][153]  

### #Template 3: Search for an element or condition which requires accessing the current index and both its immediate left and right neighbors index

```java
int binarySearch(int[] nums, int target) {
    if (nums == null || nums.length == 0)
        return -1;

    int left = 0, right = nums.length - 1;
    while (left + 1 < right){
        // Prevent (left + right) overflow
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid;
        } else {
            right = mid;
        }
    }

    // Post-processing:
    // End Condition: left + 1 == right
    if(nums[left] == target) return left;
    if(nums[right] == target) return right;
    return -1;
}
```

>1. Search Condition needs to access element's immediate left and right neighbors
>2. Use element's neighbors to determine if condition is met and decide whether to go left or right
>3. Gurantees Search Space is at least 3 in size at each step
>4. Post-processing required. Loop/Recursion ends when you have 2 elements left. Need to assess if the remaining elements meet the condition.

[**162. Find Peak Element**][162]  
[**34. Find First and Last Position of Element in Sorted Array**][34]

### Explain some hack point

* What is the difference?

```java
    int mid = (left + right)/2;
    // if (left + right)/2 = -5.5 then mid = -5;
    int mid = (int)Math.floor((left + right)/2);
    // if (left + right)/2 = -5.5 then mid = -6;
```

You should use casting as `int mid = (left + right)/2;` if your range have constraint >= 0, and use `Math.floor()` if your range have value < 0.
**I prefer the `Math.floor()` causes it is safer and not too much difference in speed**.

* What if the range meet the `Integer.MAX_INT`?
Both the code above will got the timeout. Cause computer will take alot of time to calculate the `left + right` then divide it to `2`. **Instead of that, you should use** `left + (right - left)/2`.

```java
    int mid = (int)Math.floor(left + (right - left)/2);
    // Exp: left = 5, right = 10;
    // mid = 5 + (10 - 5)/2 = (10 + 5)/2;
```

## III. Some kind of Binary Search Challenges you should know and Sample challenges

### 1. Search value in an array and return the index

We can use normal binary search and it will work, not thing special. Effortless!!

```java
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while(left <= right){
        int mid = (int)Math.floor((left + right)/2);
        if(nums[mid] == target) return mid;
        else if(nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    // **CHECK_POINT
    return -1;
}
```

### 2. Find the index in an increase array which can push new value to

For example, Giving array `[1,3,4,5,8,9]`, find place to place `6`.
Same with the code above, but notice about the `CHECK_POINT`

* `left` always greater or equal `>=` `target` at `CHECK_POINT`.
* `right` always is index smaller than `target` at `CHECK_POINT`.

So with this note, we can found that, `left` will point to number `8`, and right will point to number `5`

### 3. Find position in a binary array [0,0,0,0,0,1,1,1,1] or [false,false,false,true,true,true]

If The value you need to get is first `1`, you can try this code

```java
while(left < right) {
    int mid = (int)Math.floor((left + right)/2);
    if(nums[mid] == target) return mid;
    else if(nums[mid] < target) {
        left = mid + 1;
    } else {
        right = mid;
    }
}
```

Why  `right = mid` in this stituation better than `right = mid - 1;`?
Because we know that, the first occurrence of `1` will be on this position or `left` of it.
Same with `right`, if you want to get the last of `0`, you should use `left = mid` and `right = mid - 1`.

### 4. Ascending Order and Rotated array

Rotated array is a Ascending Order array and was move some element to right.
For example  
`nums = [0,1,2,4,5,6,7]`
`[4,5,6,7,0,1,2] if it was rotated 4 times.`
`[0,1,2,4,5,6,7] if it was rotated 7 times.`

* To create a rotated array from asc array, for example `[0,1,2,4,5,6,7]` and `times = 4`.
We split it to `[0,1,2]` and `[4,5,6,7]`, reverse them to `[2,1,0]` and `[7,6,5,4]`. Now it will be `[2,1,0,7,6,5,4]`, reverse one time more, and it will be `[4,5,6,7,0,1,2]`.

* To find and item in a rotated array.  
You can see that, with condition `nums[i] < nums[0]` this condition can be convert to `[0,0,0,0,1,1,1]`
we can find the pivot to split array to `[0,0,0,0,0]` and `[1,1,1,1]`, and find value in two sub array.

* To find minimum from this kind of array, instead of compare with the `nums[0]` you should comare with `nums[right]`, like this:  
Cause the array can be `[1,2,3,4,5,6,7]` and left will be reach the `nums.length;`

```java
public int findMin(int[] nums) {
    int left = 0, right = nums.length - 1;
    while(left < right) {
        int mid = (int)Math.floor((right + left) / 2);
        if(nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}
```

### 5. Search displayed range of a number in array

For example  
`nums = [0,7,7,8,8,9] and target = 7`
You have to return `[1,2]`

```java
public int[] searchRange(int[] nums, int target) {
    if(nums == null || nums.length == 0) return new int[]{-1,-1};
    int left = 0, right = nums.length - 1;
    while(left + 1 < right){
        int mid = left + (right - left) / 2;
        if(nums[left]==nums[right]) break;
        if(nums[mid] == target) {
            if(nums[mid] > nums[mid - 1]) left = mid;
            else if(nums[left] < target) left++;
            
            if(nums[mid] < nums[mid + 1]) right = mid;
            else if(nums[right] > target) right--;
        } else if(nums[mid] < target) {
            left = mid;
        } else {
            right = mid;
        }
    }
    int[]  res = new int[]{-1, -1};
    if(nums[left] == target) {
        res[0] = left;
        res[1] = left;
    }    
    if(nums[right] == target){
        if(res[0] == -1) res[0] = right;
        res[1] = right;
    }
    return res;
}
```

### 6. Sample challenges
Easy - Medium  
[**704 - Binary Search**][3.1]  
[**278. First Bad Version**][3.2]  
[**35. Search Insert Position**][3.3]  
Medium - Hard  
[**287. Find the Duplicate Number**][287]  
[**4. Median of Two Sorted Arrays**][4]  
[**719. Find K-th Smallest Pair Distance**][719]  
[**410. Split Array Largest Sum**][410]  

[1]: https://www.geeksforgeeks.org/binary-search/
[3.1]: https://leetcode.com/problems/binary-search/
[3.2]: https://leetcode.com/problems/first-bad-version/
[3.3]: https://leetcode.com/problems/search-insert-position/

[069]: https://leetcode.com/problems/sqrtx/
[374]: https://leetcode.com/problems/guess-number-higher-or-lower/
[033]: https://leetcode.com/problems/search-in-rotated-sorted-array/
[278]: https://leetcode.com/problems/first-bad-version/
[162]: https://leetcode.com/problems/find-peak-element/
[153]: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
[34]: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/discuss/14880/search-for-a-range 
[287]: https://leetcode.com/problems/find-the-duplicate-number/
[4]: https://leetcode.com/problems/median-of-two-sorted-arrays/
[719]: https://leetcode.com/problems/find-k-th-smallest-pair-distance/
[410]: https://leetcode.com/problems/split-array-largest-sum/
