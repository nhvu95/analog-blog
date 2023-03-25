---
title: 'Gang of Four. A bedside book for all developer'
description: 'Dynamic programming is hard. It''s hard to use and hard to detect. I am usually confused when I have to face this kind of challenge on LeetCode. This is my note when practicing with it.'
date_start: 2022/03/20
date_end: 2022/03/20
published: false
image: 'https://i.imgur.com/hlAfXAK.png'
header_image: 'https://i.imgur.com/TGeCfBM.jpg'
tags: ['Today I Learned']
priority: 0
link: /blog/algo-dynamic-programming
slug: gang-of-four
location: 'Hanoi, Vietnam'
---

_**This series is my notes when I practice algorithm in LeetCode. Actually, I'm not a good person who best knows about the algorithm, my knowledge just learned from my friend and summary from the internet. But I hope this may help you for the next interview.**_



* Việc design để đáp ứng tính scale, tính tái sử dụng, minimize ngay từ lần đầu tiên design là rất khó, nếu không muốn nói là bất khả thi. Thay vào đó họ sẽ làm và cải thiện nó dần dần, đồng thời cố gắng đáp ứng từng tiêu chí một sau những lần sửa.
* Họ tái sử dụng những design ở những dự án trước đó, sử dụng những cái tốt và loại bỏ những cái chưa tốt và tiếp tục sử dụng nó cho những cái tiếp theo.
* Trong khuôn khổ của quyển sách này, họ hệ thống design patterns thành 3 loại, Creational, Structural, và Behavioral và theo tên. Các tác giả cũng hướng dẫn người đọc có thể đọc quyển sách theo nhiều cách. Đọc tuần tự, - đọc theo kiểu muốn đọc cái nào thì đọc cái đó - đọc theo kiểu refer, Design pattern A sẽ refer đến cái F rồi mở cái F ra đọc - Hoặc đọc theo kiểu các bài toán thực tế và dùng những design patterns nào để giải quyết bài toán đó.
* Những design patterns được viết trong sáchd đều đã được chứng minh trong các dự án thực tế, trong sách không có những design patterns mới hoặc những cái chưa được chứng minh.
* Đây là những design patterns mà "only a fraction of what an expert might know". Không có design patterns giải quyết bài toán concurrency, distributed programming hoặc realtime programming. Không có design pattern cho một app trong một domain cụ thể ( Y tế, giáo dục, ngân hàng vv) vì những domain đó có những patterns của riêng nó, và sẽ có người khác catalog chúng.

I. Design patterns là gì ?

Christoper Alexander nói :"Each pattern describes a problem which occurs over and over again in our environment, and then describe the core of solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice".

Thực ra ông này nói về patterns ở trong lĩnh vực xây dựng, nhưng cái ông ấy nói cũng đúng đối với OOP design patterns. Tuy có khác nhau về hình thức biểu thị, một bên là tường - cửa, sân-vườn, còn 1 bên là các object, interface. Nhưng điểm chung đều là 1 giải pháp cho 1 vấn đề khi đặt trong 1 ngữ cảnh.

1 Design Pattern có 4 yếu tố cơ bản, ngoài ra ở phần sau họ sẽ chỉ ra còn 1 tá các mục khác, nhưng nhìn chung về cơ bản thì chỉ có 4 cái sau thôi:

 - Patten name: 1 hoặc 2 từ dùng để mô tả 1 design pattern, có thể nó có thể là tên giải pháp, các kết quả sau khi apply hoặc 1 hình thái na ná của cái design pattern đó. Để khi nhắc đến ta có thể  tưởng tượng ra và trình bày nó với những người khác. Ví dụ : Singleton, Builder, Observer.

 - Problem: Mô tả khi nào thì nên apply design pattern này. Phần này sẽ giải thích bài toán gặp phải và ngữ cảnh design pattern này nên được sử dụng, nó cũng có thể mô tả cụ thể design problem đang gặp phải, các dấu hiệu nhận biết, các điều kiện cần và đủ để apply.

 - Solution: Mô tả các yếu tố làm nên cái design này, mối quan hệ của chúng, vai trò và cách chúng cộng tác với nhau. Phần này sẽ không mô tả cụ thể 1 thiết kế hoặc 1 cách implement. Pattern sẽ chỉ như là 1 template và áp dụng nó cho nhiều tình huống khác nhau. Thay vào đó, pattern sẽ đưa ra 1 mô tả trừu tượng (chung chung) của 1 design problem, và cách sắp xếp, cấu trúc các thành phần (class, objects) sao cho giải quyết cái design problem đó.

 - Consequences: là các kết quả(hậu quả) và cả những thứ bạn sẽ phải đánh đổi khi apply cái pattern này. Những cái này khó để lường trước vì tuỳ thuộc vào bài toán và cách implement nữa, nhưng túm lại là nó quan trọng trong việc chúng ta cần tìm 1 giải pháp thay thế cái pattern này hoặc dùng cái pattern này để thay thế một cái khác. Cũng giúp chúng ta cân nhắc được giữa cost và benefit để quyết định có apply nó hay không.
 Consequences thường là việc đánh đổi giữa 2 yếu tố, space và time, đôi khi cũng có thể là trade-off giữa đa ngôn ngữ và các vấn đề trong quá trình implement.
Giống như tính reuse trong thiết kế hướng đối tượng, Consequences of pattern bao gồm các ảnh hưởng của nó lên hệ thống như tính flexibility, extendsibility, portability ( tính di động)

* Đoạn sau thì các tác giả chỉ chém gió, đại khái là góc nhìn có thể ảnh hưởng đến 1 pattern có phải là design pattern hay không. Pattern đối với người này có thể là 1 design pattern nhưng đối với người khác có thể chỉ là 1 viên gạch trong cả toà nhà. Chính vì thế trong quyển sách này mấy ông ấy chỉ tập trung vào pattern ở một mức độ nhất định.

* Họ cũng khẳng định rằng patterns ở trong quyển sách này không phải là 1 design kiểu như Linked List hay Hashmap. Chúng cũng không quá phức tạp để apply cho toàn bộ app trong 1 lĩnh vực cụ thể. 

_"Design patterns in this book are descriptions of communicating objects and classes that are customize to solve a general design problem in a particular context"_

* Đoạn sau đoạn này thì tác giả bị viết lặp lại đoạn trên, chắc để tổng kết lại... cũng giải thích lý do về việc sao các ông ấy chọn Smalltalk/C++ trong quyển sách này để mô tả và diễn giải design pattern. Đại khái là hồi các ông ấy viết sách thì là năm 1994, C++ thời điểm đó là ngon nhất rồi, có hỗ trợ hướng đối tượng và nhiều yếu tố khác. Java mãi đến cuối năm 1995 đầu 1996 mới ra đời...

II. Giới thiệu về Design Pattern trong Smalltalk MVC
* Phần này chủ yếu giới thiệu về MVC Design Pattern. Về cơ bản MVC bao gồm 3 loại đối tượng chính
- The Model is the application object.
- The View is screen presentation
- The Controller defines the way the user interface react to the user input.

Trước khi MVC ra đời, user interface được thiết kế theo xu hướng là gộp tất cả những yếu tố bên trên lại với nhau. Sự ra đời của MVC đã tách chúng ra, giúp tăng tính linh hoạt (flexibility) và tái sử dụng (reuse).

MVC phân tách view và models ra làm 2 phần, bằng cách khởi tạo 1 cơ chế subcrive/ notify giữa chúng. 1 View phải đảm bảo rằng nó sẽ phản chiếu chính xác trạng thái của model. Bất cứ khi nào model data thay đổi thì model sẽ notify tất cả các cái view đang sử dụng nó. Đáp lại, mỗi view sẽ có cơ hội để tự update chính nó thay vì nhờ đối tượng khác update. Hướng tiếp cận này cho phép bạn attach nhiều view vào 1 model, qua đó có thể tạo ra nhiều cách thể hiện khác nhau trên nhiều màn hình khác nhau. Bạn cũng có thể tạo thêm 1 view mới cho 1 model mà không cần viết lại nó.

* Đoạn tiếp theo tác giả show 1 showcase, đại khái là 1 model đính kèm với 3 màn hình, 1 màn hình hiển thị bảng, 2 màn hình hiển thị 2 chart khác nhau. Thay đổi data ở 1 màn hình cũng đồng thời update data ở 2 màn còn lại

* Một tính năng khác của MVC là nó có thể lồng nhau, 1 view phức tạp có thể bao gồm nhiều view con.

* MVC có thể bao gồm nhiều design pattern khác nhau 
- Composite - dùng khi muốn nested các view, các model, tạo các sub view
- Strategy - Dùng để quản lý mối quan hệ giữa view và controller.
- Factory Method - để specify 1 default controller
- Decorator
- Observer

Nói chung là MVC có thể được implement theo nhiều cách khác nhau và sử dụng nhiều design pattern con khác nhau để tạo nên.


III. Describing Desing Patterns

* Phần này các tác giả trình bày rõ hơn và chi tiết hơn về cách 1 design pattern trong quyển sách này sẽ được mô tả

=> Lưu ý của tôi, Thời điểm tác giả viết sách thì họ làm với C++ và vào thời điểm đó thì Java cũng chưa ra đời, do đó "abstraction" mà các tác giả nhắc tới, các bạn có thể coi nó bao gồm cả interface và abstract.

1. Pattern name và Classification
- Một cái tên xịn cực kì thiết yếu,
- Tên của pattern sẽ truyền đạt bản chất của nó một cách cô đọng.
- Classification (phân loại) sẽ phản ánh cơ chế nó hoạt động

2. Intent
- Đây là 1 đoạn ngắn để trả lời cho những câu hỏi kiểu như: Design pattern này dùng làm gì? Cơ sở lý luận và mục đích của nó là gì? Và nó giải quyết vấn đề design nào?

3. Also know as ( 1 Cái tên khác của design pattern này, nếu có)

4. Motivation

Kịch bản thiết kế nào khiến cái design problem này xảy ra? và làm  thế nào mà cái design pattern này cùng các design structure, object, class .. của nó đã giải quyết được cái design issue này.

Như phần trước có mô tả rằng design pattern sẽ chỉ viết theo hướng chung chung - trừu tượng và sẽ không cụ thể cũng như đi sâu vào chi tiết. Việc đọc kịch bản sẽ giúp bạn hiểu thêm về các mô tả trừu tượng mà cái design này đang theo đuổi, để có thể áp dụng vào nhiều bài toán khác nhau.

5. Applicability

Tình huống nào thì cái design pattern này có thể apply. Có ví dụ nào cho việc design ngu (poor design) mà cái pattern này có thể giải quyết không? Và làm thế nào để bạn có thể nhận biết được nó?

6. Structure

Nó là diagram, giống Class diagram kết hợp với Interaction Diagram , cái mà các bạn đã học ( hoặc sẽ) trong môn OOAD (Object Oriented Analysis and Design) ở đại học. Không được vẽ bằng mấy tool kiểu Astah như ngày nay chúng ta vẽ mà sẽ được vẽ bằng tool OMT (Lưu ý tác giả viết sách từ năm 1994 nên không có tool ngon hơn)

7. Participants

Những class và những object tham dự vào trong cái design pattern này, và trách nhiệm của chúng nó.

8. Collaboration

Cách mà những Participants hợp tác, giao tiếp với nhau để thực hiện nhiệm vụ của chúng nó

9. Consequences

Design pattern này đã giúp giải quyết mục tiêu đề ra như thế nào? Cái giá của việc apply nó là gì? phải đánh đổi gì? và kết quả đạt được là gì?
Khía cạnh nào của new design cho phép bạn có thể thay đổi (modify, update) 1 cách độc lập trong tương lai/

10. Implementation

Có pitfall (cạm bẫy), gợi ý, hoặc kỹ thuật nào mà bạn cần phải chú ý khi implement design pattern này không? Có vấn đề cụ thể nào liên quan đến programming language không?

11. Sample code
12. Known uses
Một vài ví dụ của pattern được sử dụng trong các dự án thực tế, các tác giả đảm bảo rằng sẽ có ít nhất 2 ví dụ ở 2 domain (lĩnh vực) khác nhau
13. Related pattern
Có những design pattern nào gần với design pattern này? Sự khác biệt giữa chúng là gì? Hoặc design pattern nào có thể được sử dụng để implement cái design pattern này? 

* Ngoài các nội dung chính trên , các phần phụ lục sẽ cung cấp thêm các thông tin nền tảng (background information) và sẽ giúp bạn hiểu thêm về design pattern và những thảo luận xoay quanh chúng. Apendix A sẽ là bảng chú giải các thuật ngữ, còn Apendix B sẽ chú giải các ký hiệu. Appendix C sẽ chứa source code của các class cơ bản mà tác giả dùng trong toàn bộ quyển sách.


IV. The catalog of Desing patterns.

* Ở những phần sau các tác giả sẽ đi vào chi tiết, ở phần này họ sẽ liệt kê cho chúng ta 23 design pattern trong sách và các Intent của chúng nó, để các bạn có 1 cái nhìn tổng quát.
=> Việc dịch word by word tiếng anh sẽ khá khó. Mình sẽ post bản gốc ở đây và bao gồm cả giải thích theo ý hiểu của mình để mọi người có thể dễ hiểu hơn.

**Abstract Factory:** Provide an interface for creating families of related or dependent objects without specifying their concrete classes.  
=> Cung cấp 1 interface dùng để tạo ra anh em họ hàng của nó hoặc các đối tượng phụ thuộc nó, mà không cần chỉ định ra 1 lớp cụ thể.

**Adapter:** Convert the interface of a class into another interface clients expect. Adapter let classes work together that couldn't otherwise because of incompatible interfaces.
=> Trong thực tế, các class với các interface khác nhau không thể work cùng nhau, vì chúng khác interface. Adapter giúp chuyển đổi, hoặc chuẩn hoá chúng, khiến chúng có thể làm việc với nhau.

**Bridge:** Decouple an abstraction from its implementation so that the two can vary independently.
=> "Tách một abstraction từ một implementation của nó để cả 2 có thể thay đổi 1 cách độc lập".
=> Nghe thì có vẻ khó hiểu, nhưng lát nữa vào ví dụ và giải thích thì sẽ dễ hiểu hơn. Các bác viết hơi hàn lâm chứ thực ra nó cũng dễ hiểu. Cứ nhớ vậy tí nữa sẽ rõ

**Builder:** Separate the construction of a complex object from its representation so that the same construction process can create different representation.
=> Để mình viết lại một cách dễ hiểu hơn, "Separate the construction of a complex object from its representation(class) so that the same construction process can create different representations(instance)."
