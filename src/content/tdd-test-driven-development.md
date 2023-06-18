---
title: 'Test Driven Development. Lesson learn from failure'
description: "I failed at the process 3rd of a company in Singapore cause I don't understand correctly about TDD and how it should be. I failed but you don't need to be."
date_start: '2022/04/08'
date_end: '2022/04/08'
published: true
image: 'https://i.imgur.com/obXzV6h.png'
header_image: 'https://i.imgur.com/bF64W2L.png'
tags: ['ZeroCode','Did I Miss','Vietnam','TDD']
priority: 1
link: '/blog/tdd-test-driven-development'
slug: tdd-test-driven-development
location: 'Hanoi, Vietnam'
type_index: 0
---

Xin gửi lời cảm ơn chân thành tới Mr. Thomas và Mr. Milan từ công ty Z đã dành thời gian cho em. Dù có thể 2 anh sẽ chẳng bao giờ đọc được mấy dòng này, nhưng cái gì cần cảm ơn thì vẫn cần phải cảm ơn 👍

... Sau buổi phỏng vấn mình đã học được rất nhiều, thế nên việc tạch này cũng không hẳn là một thất bại 😁 Như một nhà hiền triết thất bại hay nói

_**"Thất bại là khi bạn thất bại mà méo học được cái gì"**_

### I. Đầu đuôi ra sao

Chẳng là mình có apply vào một vị trí Java của một công ty Z có văn phòng tại Singapore. Vài vòng đầu khá nhẹ nhàng, và vòng tiếp theo này **sẽ diễn ra khá suôn sẻ** **nếu** mình thực sự dành thời gian để chuẩn bị cho buổi phỏng vấn tiếp theo. (Nếu), đúng rồi, vẫn là từ nếu.. 😆  
Tiếc không? Tiếc bình thường, vì mình cũng đã có 1 offer khác rồi, chỉ là mình muốn thử xem sẽ apply được bao xa với JD về Java. Nhưng thất bại, vẫn sẽ là thất bại, chúng ta không thể đổ lỗi hay coi thường nó vì chúng ta đã có những cơ hội khác.

Mình được biết nội dung về buổi phỏng vấn tiếp theo chủ yếu sẽ là check về việc thông tạo IDE và cả thông thạo về TDD (Test Driven Development). Thực ra mình cũng có đọc qua và cũng hiểu sơ qua về việc TDD hoạt động như thế nào nhưng cũng chỉ sơ qua thôi.  
Và cái TDD mà mình từng dùng ở công ty cũ nó có lẽ giống bản Shopee so với Amazon vậy. 👎

>Test Driven ấy gì? Viết test trước xong code, xong rồi chạy test update code, xong lại viết test tiếp rồi lại chạy code ấy gì? Đơn giản 😆

Chết mịa, ếch ngồi đáy giếng, bạn sẽ không bao giờ biết nó nếu chỉ đọc về nó, và gáy sớm thì ăn gì?

### II. Buổi phỏng vấn bắt đầu

Sau màn chào hỏi nhẹ nhàng, giới thiệu sơ qua, chả cần chi tiết về kinh nghiệm hay gì, vì đây là vòng trong rồi.

>Thomas: Chú biết gì về về TDD chưa? làm TDD bao giờ chưa?
>
>_Mình bắt đầu bật văn lên_  
>
>Tớ:   Tình hình là em có làm 1-2 lần rồi, nhưng, đại khái là như này... như này...
>
>Thomas: Ờ, suýt thì đúng..

Đến đoạn này thì mình bắt đầu thấy sai sai rồi 😄 nhưng kệ chứ, vào phỏng vấn phải thoải mái lên.  

Đề bài khá đơn giản, đại khái là bài này [Roman Number](https://leetcode.com/problems/roman-to-integer/)

Dễ ẹc mà nhỉ, k làm được thì thôi về luôn cho xong 😁. Nhưng méo bạn ạ, ở đây chúng tôi không care về algorithm, chúng tôi chỉ care TDD.

> Thomas: Rồi chú triển đi cho anh xem

À 😁 TDD ấy gì, quê em đầy. TDD viết testcase trước ấy gì 🙄

```java
class LibraryTest {
	@Test void normalTestCase() {
		Library lib = new Library();
		assertEquals(1, lib.convertRomanNumber("I"),"It should be 1");
		assertEquals(5, lib.convertRomanNumber("V"),"It should be 5");
		assertEquals(10, lib.convertRomanNumber("X"),"It should be 10");
        ...
	}
}
```
> **Thomas**: Dừng hình !!! sao mầy lại viết test case kiểu này hả em? Giải thích đi.  
>
> **Mình**: Ờ thì ở nhà em hay có kiểu nhét mấy case cơ bản này vào 1 cái test case làm case test normal. Đỡ phải tách ra nhiều testcase, test cho nhanh 😆
>
> **Thomas**: Có vẻ xuôi tai nhờ 😄? biết nhược điểm của cách viết này không cu?
>
> **Mình**: Khi thằng đầu tiên failed thì những thằng đàng sau sẽ không được gọi. Ờ thì em thấy nó cũng không sao cả lắm vì nó là 1 group normal test case, 1 thằng failed thì mấy thằng normal kia pass hay failed cũng không quan trọng lắm.
>
> **Thomas**: Không bé ơi, thế khi 1 thằng lỗi bé làm sao biết lỗi chỗ nào?
>
> **Mình**: Em có cái message bên cạnh đây thây 😁
>
> **Thomas**: Hự! bỏ đi em, viết tách ra thành 1 test case 1 cái tí anh sẽ giải thích cho chú vì sao lại làm thế 💯

Bụp thế là code sửa thành.

```java
class Library {
    public int convertRomanNumber() {
        return 0;
    }
}

class LibraryTest {
	@Test void normalTestCase() {
		Library lib = new Library();
		assertEquals(1, lib.convertRomanNumber("I"));
	}
}
```

> Chạy test, tất nhiên là nó failed. 

Nhìn lại cái hình này 1 chút nha, nguyên tắc của TDD là bạn chỉ được update code nếu có màu đỏ, tức testcase bị failed.

<figure align="center" width="100%">
    <img src="https://i.imgur.com/obXzV6h.png" alt="Image Hosting"/>
</figure>

Và màu đỏ ở đâu? Ở đây này... Màu đỏ của máu và nước mắt 😢 ...

<figure align="center" width="100%">
    <img src="https://i.imgur.com/FLf9GDy.png" alt="Image Hosting"/>
</figure>

Có màu đỏ rồi, giờ update code được rồi chứ nhở. Update code thôi...

```java
public class Library {
    
	public int convertRomanNumber(String roman) {
		return getValue(roman.charAt(0));
	}

	public int getValue(char c) {
		switch (c) {
            case 'I':
                return 1;
		}
        return 0;
	}
}
```

Chạy lại testcase, tất nhiên là nó chuyển thành màu xanh 😁
<figure align="center" width="100%">
    <img src="https://i.imgur.com/9JCEFOd.png" alt="Image Hosting"/>
</figure>

> **Thomas**: Sao lại `charAt(0)` ở kia hả em?
> 
> **Mình**: Ở sprint này em test case đơn giản nên không cần đọc tất cả String, chỉ lấy ký tự đầu thôi, thích nhiều hơn e sẽ viết thêm test case và update nó ở sprint sau.
>
> **Thomas**: Hợp lý. Có green rồi, giờ chuyển qua blue, bắt đầu refactor cho anh xem đi.
> 
> **Thomas**: Sao chú đổi tên hàm thành `convertRomanNumberToInt`?. blabla
>
> **Thomas**: Ờ chú đổi tên `class` thành `RomanConverter` à, cũng được đó.
>
> **Thomas**: Có cần đổi `access modifier` của `getValue` thành `private` không?...tại sao?...Không bé ơi, không make sense, chú không thể nào public hàm `getValue` ở một cái class `Converter` rồi để thằng khác nó gọi vào được. Nó sẽ bị loạn không biết nên gọi cái nào. Public duy nhất một thằng hàm `convertRomanNumberToInt` kia thôi.
> 
> **Thomas**: Xoá mấy cái comment autogen của IDE đi, để lại làm gì đâu...
>
> **Thomas**: Thằng switch case kia sao lại có `return` lạc ở ngoài kia? Vứt vào `default` đi, cho nó gọn code.

Sau một hồi update thì code của mình trông như thế này.

```java
public class RomanConverter {

	public int convertRomanNumberToInt(String roman) {
		return getValue(roman.charAt(0));
	}

	private int getValue(char c) {
		switch (c) {
		case 'I':
			return 1;
        default:
			return 0;
		}
	}
}

```

> **Thomas**: Xong rồi đấy, quay ra refactor tiếp test case đi em. Nhìn lại test case hiện tại một chút nhé. Em có thấy đang có vấn đề gì không ?

```java
// Java - AUTO Generated
//
class LibraryTest {
	@Test void normalTestCase() {
		Library lib = new Library();
		assertEquals(1, lib.convertRomanNumber("I"));
	}
}
```

> **Mình**: Vì bên kia em đã đổi tên class rồi, nên em sẽ đổi tên class thành `RomanConverterTest`.  
> **Mình**: Cái tên hàm kia cũng chưa ổn, e sẽ đổi tên nó thành `testRomanNumberI`.  
> ...  
> **Thomas**: Anh nghĩ vẫn có thể làm tốt hơn đó. Nghĩ thêm đi em.
>
> **Mình**: Em sẽ xoá thêm cái comment thừa thãi bên trên đi, và format - beautify lại code.
>
> **Thomas**: Ok tốt hơn đó, nhưng đó vẫn chưa phải cái anh nghĩ..
>
> **Mình**: Hiện giờ em đang chưa nhìn thấy cần phải cải thiện thêm chỗ nào cả 😖. Anh chỉ thêm cho em với, để cho code của chúng ta (our) có thể tốt hơn
>
> **Thomas**: Tên hàm, nếu em chỉ đặt `testRomanNumberI`, làm sao em biết kết quả của nó nên là gì? hay khi sai làm sao em biết nó sai ở đâu?
> **Thomas**: Tưởng tượng trong bài toán thực tế cùng với đầu vào `I` nhưng sẽ có nhiều case ra nhiều kết quả khác nhau, thì việc đặt tên như này thì chưa hợp lý.
>
> **Mình**: Vậy em sẽ sửa thành `testRomanNumberIEqualOne` hoặc `testRomanNumberIEqual1`. Trông có vẻ ổn hơn rồi anh nhỉ?
>
> **Thomas**: Ừ trông đẹp hơn rồi đó.

```java
class RomanConverterTest {
	@Test
	void testRomanNumberIEqualOne() {
		RomanConverter lib = new RomanConverter();
		assertEquals(1, lib.convertRomanNumber("I"));
	}
}
```

> **Thomas**: Giờ em chuyển sang case tiếp theo đi.
>
> **Thomas**: Dừng hình, đừng copy testcase rồi duplicate lên như thế. Đấy là nguồn gốc của tội ác đấy 😁
>
>
> _Mình chuyển qua gõ tay_
>
> **Thomas**: *Cười, dùng phím tắt đi em. Dùng shortkey hay mấy cái IDE hỗ trợ sẵn đi, gõ tay này bao giờ mới xong.
>
> **Mình**: Thú thực là em cũng chưa biết cái đó 💩
>
> **Thomas**: Gõ `test`. Xong `ctr + space`, chọn `_jupiter`. Ừ đúng, cái `blue` thứ 3 từ dưới lên ấy.

<figure align="center" width="100%">
    <img src="https://i.imgur.com/gDOnK89.png" alt="Image Hosting"/>
</figure>

```java
	@Test
	void testName() throws Exception {
	}
```
Và thế là chỉ với 1 nốt nhạc, test case mới đã được tạo, nó còn focus sẵn vào tên hàm, mình chỉ việc gõ tên mới là xong. 🥂
> **Mình** Nếu buổi phỏng vấn hôm nay em có tạch thì ít ra em cũng đã học được một cái gì đấy 😁
>
>
> *Hai ông phỏng vấn cười như được mùa *😁

Và buổi phỏng vấn của mình tiếp tục diễn ra như thế.
Thi thoảng mình sẽ có đoạn dừng:

> **Mình**: Em nghĩ em sẽ tiếp cận bài này từ hướng ngược lại từ cuối lên, chỉ là linh cảm của em thôi. Nhưng đó sẽ không phải là việc em làm lúc này,  
>
> **Mình**: **_tại thời điểm này_** và **_với test case này_** em sẽ cứ implement bằng cách duyệt tuần tự để giải test case này đã. Nếu những test case tiếp theo em cần implement và cách kia có thể giải quyết đc thì em sẽ refactor và re-implement theo hướng đó. Ok không anh?
>
> **Thomas**: Great, đó chính là tư tưởng của TDD, em bắt đầu nắm được TDD rồi đó.

Cũng sẽ có những lúc test case của mình failed

> **Thomas**: Đấy thấy không, bằng việc chia nhỏ nó ra, và đặt tên test case một cách clear như này, việc debug của em sẽ diễn ra nhanh hơn rất nhiều. Em thậm chí không cần đọc code test, mà nhìn tên hàm đã biết vì sao nó sai.

....
...

Và buổi phỏng vấn tiếp tục như vậy cho đến cuối. Mình không nhớ đích xác nội dung comment tổng kết, nhưng đại ý là như này

>**Thomas**: Anh và Milan rất vui được tham gia buổi phỏng vấn này với em. Cảm ơn em đã dành thời gian cho 2 anh và cả công ty Z.
>- Ban đầu em chưa nắm rõ được TDD, và điều này khiến em mất một lúc để làm quen.
>- Giai đoạn đầu em bảo vệ luận điểm của mình, ok, điều đó đúng, anh cũng thường làm vậy ở team của anh. Tiếc là cái em nói thì là thiên hướng kiểu behaviour driven hoặc lập trình tuần tự rồi.
>- Em học rất nhanh, sau khi được anh chỉ thì nắm và triển khai rất tốt
>- Em chưa thạo IDE này lắm đúng không, có vẻ em không dành 1 khoảng thời gian liên tục làm với nó, nên anh cảm thấy nhiều chỗ em bị khựng vì short key.
>- Vì đặc thù dự án nên bọn a cần người hardcode, cực kỳ thành thạo IDE và cả 100 công lực với cái TDD này nữa, nên em sẽ không phù hợp lắm, về luyện thêm đi, tầm 6 tháng 1 năm nữa thì quay lại đây. Biết đâu mình lại gặp nhau :grin:

Đoạn này đọc thì có vẻ nặng nề nhưng thực ra diễn khá nhẹ nhàng, vì lúc phỏng vấn mình cũng hay joke, không khí buổi phỏng vấn khá vui vẻ. Nên đoạn cuối cũng bình thường thôi. Mình thì mình biết sẽ tạch ngay từ lúc đặt tên test case rồi nên cũng không áp lực gì lắm 😀.

Cũng chỉ có cảm ơn, chia sẻ cảm nhận của mình về những gì học được trong buổi phỏng vấn này. Chém gió tào lao thêm một lúc rồi rời phòng meeting.

________________

**Chốt: Trên đây là ký sự đi phỏng vấn của mình, hi vọng phần nào giúp các bạn hiểu được về cách TDD hoạt động, và cũng như cách mà một buổi phỏng vấn IDE TDD ở các công ty Singapore đang dùng. Không phải công ty nào cũng check, nhưng thường là mấy công ty consulting sẽ có hỏi phần này. Chúc các bạn may mắn** ✌️

