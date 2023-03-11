---
title: 'Knuth-Morris-Pratt algorithm. What is it?'
description: "After 12 hours of reading and learning about this algorithm, I want to write a note about it, to conclude my knowledge and save my time for the future."
date_start: "2022/02/10"
date_end: '2022/02/10'
published: true
image: 'https://i.imgur.com/rVSEDix.png'
header_image: 'https://i.imgur.com/CTSoNPy.png'
tags: ['Did I Miss','Algorithm','KMPSearching','knuth-morris-pratt']
priority: 1
link: '/blog/algo-knuth-morris-pratt'
slug: algo-knuth-morris-pratt
location: 'Phu Tho, Vietnam'
---

_**This series is my notes when I practice algorithm in LeetCode. Actually, I'm not a good person who best knows about the algorithm, my knowledge just learned from my friend and summary from the internet. But I hope this may help you for the next interview.**_

This algorithm came to me when I was practicing in Leetcode. The problem is quite simple and also mark as Easy level in Leetcode. Essentially, It's the same with implementing by hand **String.includes()**, **String.indexOf()**, or **strStr()**.

>[**28.Implement strStr()**][1]  
Return the index of the first occurrence of `needle` in `haystack`, or -1 if `needle` is not part of `haystack`.  
**Clarification**:  
What should we return when `needle` is an empty string? This is a great question to ask during an interview.
For the purpose of this problem, we will return 0 when `needle` is an empty string. This is consistent to C's strstr() and Java's indexOf().

## I. Normal way

This was come first in my mind, **Brush Force**. People say two nested loops beat all things, the best of the best :D you know. First loop to browser all the `haystack` and second loop to check it match with `needle` or not.

The complexity of it is `O(m*n)` for time and `O(1)` for space.


## II. Knuth-Morris-Pratt

And Knuth-Morris-Pratt algorithm is the next thing I used to beat 100% submit. My elderly brain takes 12 hours to learn and read about it. Poorly.

The main idea of Knuth, Morris, and Pratt is instead of learning nothing from an incorrect matching string like Brush Force way. We store them and use them for the next comparison. And from the `O(m*n)`, the time complexity reduce to `O(m+n)`. It's sound good, right?

So this is the way they do it.

1. KMP algorithm preprocesses `needle[]` and constructs an temporary array `lps[]` of size m (same as size of `needle`) which is used to skip characters while matching.

2. The name `lps` indicates "**longest proper prefix**" which is <ins>**also suffix**</ins>. A proper prefix is prefix with whole string not allowed.
   For example:  
   Prefixes of “ABC” are “”, “A”, “AB” and “ABC”, and **proper prefixes are “”, “A” and “AB”**.
   Suffixes of the string are “”, “C”, “BC” and “ABC”.  

   `lps[i]` be defined as longest prefix which is also proper suffix.  
    >Example:  
    **For the pattern “AAAE”**  
    `lps[]` is `[0, 1, 2, 0]`  
    **For the pattern "AABCDA"**  
    `lps[]` is `[0, 1, 0, 0, 0, 1]`  
    **For the pattern "AABCADAABE"**  
    `lps[]` is `[0, 1, 0, 0, 1, 0, 1, 2, 3, 0]`  
    **For the pattern "AEAAEAAACEA"**  
    `lps[]` is `[0, 0, 1, 1, 2, 3, 4, 1, 0, 0, 1]`  

    >Explains: **The index of array start at 1**  
    **For the pattern "AABCADAABE"**  
    A |**A**| B C A D A A B E  
    "A" match index 1, `lps[2] = 1`
    >
    >A A |**B**| C A D A A B E  
    "B" not match any before, `lps[3] = 0`
    >
    >A A B |**C**| A D A A B E  
    "C" not match any before, `lps[4] = 0`
    >
    >A A B C |**A**| D A A B E  
    "A" match index 1, `lps[5] = 1`
    >
    >A A B C A |**D**| A A B E  
    "D" not match any before `lps[6] = 0`
    >
    >A A B C A D |**A** **A** **B**| E  
    Because "A A B" match index 1 2 3 in order,  so `lps[7] = 1` `lps[8] = 2` `lps[9] = 3`
    >
    >A A B C A D A A B |**E**|  
    "E" not match, `lps[10] = 0`
    >
    >Final LPS is : `[0, 1, 0, 0, 1, 0, 1, 2, 3, 0]`  

3. After got `LPS` we use it to skip and back to a specific and item don't need to check again items before it.

    **For the `needle`: "ISSIP" and `haystack`: "MISSISSIPPI"**  
    `lps[]` is `[0, 0, 0, 1, 0]`  

    Cause the `lps` start from index 1, so we create an entry index 0 for `lps`.  
    `lps[]` is `[0, 0, 0, 0, 1, 0]`

    For example, when we compare the  
    
    "P" in " I S S I `P`"  
    **with**  
    "S" in "M | I S S I `S` | S I P P I"

    Of course they are not matching, we will back to compare from corresponding index of "P" in `needle` and so `index = 4`.
    The value of `lps[4]` is `1`. So we back to index `1` in the [ I `S` S I P ] and start compare again from here.

    By this way, instead of starting compare again from  
    "[ M I `S` S I S S I P P I ]" like **Brush Force** way. We continue compare from  

    [ I `S` S I P ]  
    with  
    "[ M I S S I `S` S I P P I P I ]"

    It help us to skip alot of time. Cause for each character we skip, we save `needle.length` times to compare them.

## II. Here is my code. Hope this help ;) 

```java
class Solution {
    public int[] calculateLPS(String needle){
        int [] lps = new int[needle.length() + 1]; // cause lps start from 1;
        int len = lps.length;
        for(int i = 2; i < len; i++){
            int j = lps[i - 1];
            // Back to the start, or back until it match
            while(j > 0 && needle.charAt(i - 1) != needle.charAt(j)) j = lps[j];
            if(j > 0 || needle.charAt(i - 1) == needle.charAt(j)) lps[i] = j + 1;
        }
        return lps;
    }
    
    public int strStr(String haystack, String needle) {
        if(needle.length() == 0) return 0;
        if(needle.length() <= haystack.length()) {
            int [] lps = calculateLPS(needle);
            for(int num: lps) System.out.print(num);
            int i = 0, j = 0, hLen = haystack.length(), nLen = needle.length();
            while(i < hLen) {
                if(haystack.charAt(i) == needle.charAt(j)) {
                    i++;
                    j++;
                    if(j == nLen) return i - j;
                } else if (j > 0) {
                    j = lps[j];
                } else {
                    i++;
                }
            }
        }
        return -1;
    }
}
```

[1]: https://leetcode.com/problems/implement-strstr/
