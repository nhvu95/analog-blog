---
title: 'Bad code. What is worse than bad code?'
description: "Cái gì tệ hơn code tệ? Thủa sinh viên mình từng nghĩ rằng code là tất cả, code là lẽ sống, và phàm trong quá trình phát
triển phần mềm, có mỗi việc viết code mà còn code tệ nữa thì chỉ ăn 💩."
date_start: '2023/01/01'
date_end: '2022/03/11'
published: true
image: 'https://i.imgur.com/eEbelqe.png'
header_image: 'https://i.imgur.com/eEbelqe.png'
tags: ['ZeroCode','Vietnam']
priority: 0
link: '/blog/what-is-worse-than-bad-code'
slug: what-is-worse-than-bad-code
location: 'Hanoi, Vietnam'
type_index: 0
---

# Cái gì tệ hơn code tệ?

Cái gì tệ hơn code tệ? Thủa sinh viên mình từng nghĩ rằng code là tất cả, code là lẽ sống, và phàm trong quá trình phát
triển phần mềm, có mỗi việc code mà còn code tệ nữa thì chỉ ăn 💩.
Theo thời gian mình đã ra trường, may mắn được tham gia những dự án khác nhau của các công ty khác nhau, có product và
cũng có outsource cả trong nước và ngoài nước. Và rồi sau khi bị vả lật mặt lên xuống, mình đã nhận ra một bài học sâu
sắc 😂. Bởi vì bằng một cách thần kỳ nào đó dù có code tệ đến đâu thì đến 1 lúc nào đó cái đống shit đó cũng sẽ hoàn
thành yêu cầu mấy cái CRUD đề ra, Brute Force thần chưởng vẫn sẽ chạy, Promise hell vẫn sẽ get set được data. Và code
của một bạn intern sau 10 lần sửa đi viết lại chắc cũng sẽ chạy được... Nhưng vấn đề ở đây là, tại sao lại tốn tận 10
lần để làm nó đúng trong khi ta có thể chỉ cần 1-2 lần?
**Code tệ không phải là tệ nhất, cái tệ hơn code tệ là một đống code tệ ở trong một process tệ. 😌**

## I. Tại sao một process lại quan trọng đến vậy

Có thể các bạn đang chửi thầm, "Bố thằng điên, đang nói về process tệ tự nhiên lại nói về tầm quan trọng của process".
Nhưng không, mọi thứ đều có lý do của nó, phải hiểu nó quan trọng như thế nào thì mới hiểu được tại sao nó tệ sẽ dẫn
đến... tất cả mọi thứ tệ.
Đầu tiên ta phải nói rằng process sinh ra để giải quyết bài toán phát triển phần mềm trong môi trường công nghiệp. Một
vài người thì có thể không cần process, nhưng khi dự án bắt đầu có sự tham gia của chục người, vài chục người, hoặc
nhiều dự án hoạt động đồng thời với nhau thì lúc đó bữa tiệc bắt đầu vui rồi đấy 😆.

### 1. Process giải quyết bài toán gì?

Chắc hẳn hồi học OODA ở đại học, các bạn đã được học một số câu chuyện đẫm máu về những dự án tỉ đô phát triển trong cả
chục năm phải đập đi làm lại rồi 😅. Nên thôi, ở khuôn khổ của một blog xàm thì mình sẽ không nhắc lại nữa mà sẽ chốt
những ý chính mà mình nhận thấy luôn.

- [ ] Đảm bảo việc giao tiếp giữa các team, sub team trong dự án.
- [ ] Đảm bảo làm đúng yêu cầu và giải quyết đúng bài toán. Đảm bảo chất lượng sản phẩm đầu ra (phần nhìn thấy).
- [ ] Giảm thiểu rủi ro liên quan đến chi phí, thời gian, và workload. Đảm bảo lợi nhuận.
- [ ] Đảm bảo chất lượng source code và chất lượng bảo trì trong tương lai (phần không nhìn thấy)

### 2. Thế process tệ thì sao?

Làm sao để biết một process là tệ? Mình sẽ cho các bạn một số dấu hiệu nổi bật mà nhìn vào một cái bạn sẽ biết nó tệ
ngay 🤣

- [ ] Deadline phi thực tế, deadline bị giãn ra nhiều hoặc vô thời hạn.
- [ ] Giao tiếp tệ, mọi người không biết người khác đang làm gì. Không biết người đang cần gì từ mình, mình cần gì từ
  mọi người. Và cái mình đang làm sẽ ảnh hưởng đến người khác như thế nào?
- [ ] Bug bị tái hiện thường xuyên, open, close, open..vv Và sau quãng thời gian như vậy không có actions gì hoặc các
  actions đề ra không giải quyết được gì.
- [ ] Tưởng vậy mà không phải vậy, sản phẩm đang không hoạt động như nhóm phát triển nghĩ, hoặc mỗi team nghĩ một kiểu.
- [ ] Không có tài liệu, không có test spec, không có estimate, không có backup plan, không có requirement - spec (
  không cần rõ ràng nhưng cần đầy đủ và ít nhất đủ để làm căn cứ cho quá trình phát triển).

## II. Tại sao post này ra đời?

Có lẽ đây mới là phần nội dung chính của bài viết này. Bài viết này để tổng kết và đúc rút những process mà mình đã may
mắn được gặp trong quá khứ và hiện tại, những cái hay mà mình cảm thấy hay và những cái dở mà mình cảm thấy dở trong quy
trình phát triển phần mềm ở các công ty trong vỏn vẹn mấy năm làm nghề.
Mới vài năm làm nghề thì có gì mấy để mà nói nhỉ ? 🤣 Kệ chứ, có thể tại thời điểm này mình chưa thấy nó hay, cũng có thể
sau vài năm nữa mình mới cảm được nó. Nhưng đó sẽ là một câu chuyện khác với nội dung khác, biết đâu lúc đó mình sẽ quay
lại update bài viết này thì sao. Kệ đi, vì đó sẽ là truyện của tương lai.

Tất nhiên những câu chuyện kể ở đây sẽ không phải kiểu "Có vấn đề sao không báo với quản lý cấp cao đi, đăng lên đây làm
gì?". Tất nhiên những gì mình cảm thấy không ổn đã được báo và góp ý ngay từ trong quá khứ rồi 💁 Những gì còn ở đây chỉ
là kỉ niệm, và như mình vừa nói "để tổng kết và đúc rút.🙈"

### Một startup product nhỏ (trước 2018)

Đây là một startup liên quan đến lĩnh vực giáo dục, nơi mình làm việc với vai trò là một intern Android Developer.
Một startup nhỏ thì hiển nhiên họ sẽ không có process rõ ràng
Và hiển nhiên 1 intern parttime thì cũng không thể chiếm một vị trí quá quan trọng trong process.
**Những điều mình nhận thấy.**

- [ ] Không dùng Swagger hay bất công cụ gì cả. Thứ duy nhất dùng là excel. mà theo dạng copy paste sample json vào
  excel chứ không design rõ từng field và kiểu, loại dữ liệu.
- [ ] Không dùng công cụ quản lý task hay bug gì cả, task giao bằng mồm. Bug log bằng excel.
- [ ] Không phân tích yêu cầu hay gì cả, thứ duy nhất có là một file mock design bằng photoshop hoặc img.
  **Và hệ quả là**
- [ ] Việc API design thông qua excel, chỉ có duy nhất sample Json khiến việc intergate giữa client và server tốn rất
  nhiều thời gian. Các field bị thiếu điều kiện hoặc out scope.
- [ ] Trong quá trình làm việc mình thường xuyên gặp phải vấn đề API hôm qua chạy nhưng hôm nay không chạy nữa. Ra là
  API thay đổi không thông báo, thay đổi theo yếu tố tâm linh, không có note thông báo cho người vắng mặt. Và vì không
  quản lý API version nên mới đè cũ.
- [ ] Việc không quản lý task rõ ràng hay có những bước phân tích yêu cầu, cũng như các tài liệu design cụ thể khiến
  việc implement sai yêu cầu và không đồng nhất ý tưởng là điều thường xuyên gặp. Những file design duy nhất bằng hình
  ảnh đôi khi gây hiểu lầm.

### Một công ty outsource vừa

Đây là một công ty outsource cho thị trường Nhật. Mình tham gia dự án với vai trò C/C++ Developer.
Ở công ty này, những tài liệu được làm sẽ tuỳ thuộc vào yêu cầu của khách hàng. Khách hàng muốn có những tài liệu nào
thì sẽ làm những tài liệu đó. Tài liệu là dành cho khách hàng chứ không phải dành cho team. Họ chơi kiểu code từ a-z rồi
mới viết tài liệu, và thường tài liệu sẽ được viết vào giai đoạn cuối dự án trước khi chuẩn bị ship cho khách, leader sẽ
là người đảm nhiệm vai trò này, và đôi khi ổng viết không kịp thì sẽ lôi anh em ra viết cùng cho kịp.

**Những điều mình nhận thấy.**

- [ ] Requirement design là những file notepad ngắn gọn vài gạch đầu dòng. Khi chuyển thành tài liệu cho khách thì bốc
  phét ra đủ thứ trên trời dưới đất. Chuyện, xin khách 8 man month mà viết ít quá thì cũng hơi kỳ.
- [ ] Họp, rất thích họp, không phải là họp giữa khách hàng với team mà là giữa nội bộ team. Nhưng những cuộc họp này
  không giải quyết được vấn đề gì và không đi đến đâu (Riêng case này hơi dị, Ông leader có background làm quản lý bên
  lĩnh vực khác chứ k có background liên quan đến IT và công việc IT).
- [ ] Bug log bằng mồm. Bug fix realtime, test cũng realtime luôn. Tất nhiên là cũng có những giai đoạn test, nhưng chủ
  yếu là realtime.
- [ ] Làm việc với thiết bị và phần mềm nhạy cảm nhưng không có quản lý rủi ro, không có UT, chỉ có IT, mỗi khi code có
  vấn đề thì sẽ khoá cmnl thiết bị lại, và thiết bị sẽ đem vứt hoặc phải gửi về nhà máy để thay mainboard.
  **Và hệ quả là**
- [ ] Vì làm tài liệu ở cuối dự án, và viết tài liệu cho khách, không phải cho team, nên có rất nhiều thứ phát sinh ở
  cuối dự án.

* Có những thứ phải làm thêm vì viết tài liệu nó có ở đó, mà cái đó không thể bỏ khỏi tài liệu được, chuất chưa 😎
* Có những thứ cả test và dev đều không biết là nó cần phải vậy, cho đến khi cuối dự án khách hàng test ra. => Leader
  nghĩ 1 kiểu, viết tài liệu gửi cho khách 1 kiểu, team dev nghĩ 1 kiểu, thực tế lại là một kiểu khác.
* Có những thứ phải đối chiếu với code để viết vào tài liệu. Rồi đọc code để làm sequence diagram. Rồi mới phát hiện ra
  code flow có vấn đề. Mà như đã nói, tài liệu làm vào cuối dự án, thế nên là vừa khóc vừa sửa code, vừa viết tài liệu
  trong vô vọng.

### Một công ty outsource lớn

Đây là một công ty lớn trong 1 tập đoàn lớn của Nhật. Những dự án mà mình làm ở đây đa phần đều là những dự án lớn với
ngân sách cũng lớn.
Để mà nói một cách công bằng, thì đây có lẽ là công ty có process chuẩn chỉ nhất mà mình từng làm việc. Mọi thứ được làm
khá bài bản, hầu hết tài liệu và các bước trong toàn bộ quy trình đều được sinh ra có chủ đích.
Quy trình phát triển phần mềm ở đây giống kiểu lai giữa Agile và WalterFall. Dự án bắt đầu từ RA-Requirement Analys đến
BD-Basic Design, DD-Detail Design, CD-Coding, UT-Unit Testing, và kết thúc ở IT-Intergration Testing.
Tuy vậy, đôi khi phải làm quá nhiều thứ đối với mình cũng là một số điểm trừ.

**Những điều mình nhận thấy**

- [ ] Tất cả các tài liệu ở đây đều rất rất chi tiết. Đôi khi là hơi quá chi tiết. Đúng hay sai, cứ refer theo tài liệu.
  Code sai thì gõ đầu thằng viết code, viết tài liệu sai thì gõ đầu thằng viết tài liệu.
- [ ] Những tài liệu sinh ra đều có mục đích của nó, và ở đây trong công việc hầu hết chúng mình giao tiếp với nhau bằng
  tài liệu 😎.
  Ví dụ: sau khi có RA document thì tài liệu này sẽ được chuyển cho QA team để nghiên cứu dần testcase và team Dev để
  bắt đầu làm BD, Output của BD sẽ quy định ID của từng màn hình và cả ID, Data type, Length lủng, các hành vi ... của
  các label, button, checkbox, trên màn hình đó. Mỗi thứ hiển thị trên màn hình sẽ map với từng trường dữ liệu trong API
  document luôn. Dựa vào đống tài liệu BD này sẽ chuyển cho bên QA team để viết testcase....
- [ ] Daily meeting, Weekly meeting giống Agile.
- [ ] Có Openning meeting để quyết định những cái sẽ làm trong sprint này, chiến lược timeline rõ ràng, estimate từng
  module rõ ràng. Có closing meeting để tổng kết sprint này cái gì làm tốt cái gì làm chưa tốt.
- [ ] Bug log, task, đều có công cụ quản lý rõ ràng. Không bị miss. Cuối sprint leader sẽ chạy tool để analyze xem có
  bao nhiêu bug, nguyên nhân chủ yếu dẫn đến bug là gì. Có bao nhiêu task bị chậm deadline, nguyên nhân chậm deadline là
  gì. Và quan trọng nhất là cùng nhau họp đưa ra action để giải quyết nó.
- [ ] Review các thể loại, review tài liệu, review code, review fix action, review cái review, team review, senior
  review.
  **Và hệ quả là**
  Nếu tốt vậy thì có gì để mà chê nhỉ? 😆 Không hẳn vậy, một process như vậy cũng có những góc tối và có cả những điểm
  bất hợp lý.
- [ ] Quá nhiều tài liệu, văn hoá tài liệu in sâu vào trong văn hoá của công ty. Tất nhiên tài liệu sinh ra để giải
  quyết vấn đề nào đó hoặc lưu trữ gì đó. Nhưng có những thứ có thực sự cần tài liệu không, thì đó lại là một câu chuyện
  khác.
- [ ] Nhiều khi mình cảm thấy văn hoá viết tài liệu tạo nên văn hoá evidence. Mọi thứ bạn viết sẽ là thứ chống lại bạn
  trước toà. Nếu không được control mởi một leader tốt, văn cái evidence đó thay vì giúp product tốt hơn sẽ trở thành
  cái để mọi người blame lẫn nhau. Văn hoá như vậy sẽ rất là toxic, team của mình dù được control bởi một leader giỏi,
  thi thoảng cũng sẽ có những moment như vậy. ( Cũng may là nó sẽ nhanh chóng bị dập trong trứng nước)
- [ ] Khi bạn làm trong 1 process vừa Walterfall vừa Agile thì bạn sẽ phải Viết doc nhiều như Walterfal và Rework nhiều
  như Agile. Khác biệt thêm một chỗ là ngoài viết lại code, bạn còn phải viết lại cả Doc nữa 😂 Việc viết lại doc khá là
  củ chuối và tù, vì ở đây đa phần doc viết bằng excel, cũng chả có tool tự động nào cả. Khi một requirement change thì
  chúng mình phải kiểm tra impact, sau đó update code, sau đó test code, review code, update doc rồi review doc. Mấy
  việc kiểu này chiếm rất nhiều quỹ thời gian của bọn mình.

### Một công ty product vừa.

Đây là một công ty của Châu Âu. Khi bước vào môi trường này mình đã bị choáng ngợp vì hai lý do chính của họ, team
culture và team process. Toàn bộ dự án chạy theo Scrum, quản lý dùng AzureDevOps cũng rất Clean và rõ ràng.
À, mình ngợp không phải vì nó hoàn toàn tốt đâu, nói thật là nó cũng có những điểm hơi tệ 😅. Điểm mình thấy choáng ngợp
là cách họ lắng nghe, cách họ hài lòng với những gì họ làm được và cách họ phản hồi để cải thiện nó trong những lần tiếp
theo.

**Những điều mình nhận thấy**

- [ ] Hầu hết các công ty sẽ dùng 1 platform nào đó để quản lý task và bug, và công ty mình cũng vậy, dự án của bọn mình
  dùng Azure DevOps. Vì làm việc dùng 100% Scrum nên các feature bọn mình sẽ làm theo kiểu User Story. Mô tả của User
  Story khá là sơ sài, kiểu như "As an user I want abcd..." chấm hết.
- [ ] Một điều bất hợp lý ở đây mình nhận thấy đó là team không có văn hoá estimate task, cũng không có backup time. Mỗi
  1 kỳ các bạn sẽ list các tính năng muốn làm và bắt đầu chia sprint cho nó.
  Thường ở Việt nam, vì task có thể phụ thuộc vào độ phức tạp và khối lượng công việc,
  nên chúng ta dev sẽ là người estimate task đúng không nào, và tự set deadline cho mình để cố gắng hoàn thành nó. Khi
  bắt đầu sprint thì leader sẽ check xem có ai có plan nghỉ phép hay sẽ có dịp nghỉ lễ nào dài không để dãn deadline. Ở
  đây chúng tôi KHÔNG làm vậy 👍
- [ ] Work-life balance và respect people là điều rõ rệt nhất mình nhận thấy. Để mà nói một cách công bằng thì tốc độ
  làm việc khá chậm, thường chỉ 1-2 task một ngày, và task xong khi nó xong. Giống như trong 1 Scrum process, thứ người
  ta quan tâm là đúng 3 thứ: cái bạn đã làm, có blocking issue gì không / có câu hỏi gì không, và tiếp theo bạn sẽ làm
  gì.
- [ ] Tuy vậy, mình có cảm giác là họ không respect process. Respect process là tôn trọng những gì đã được thống nhất và
  đề ra, cũng như tôn trọng quy trình Scrum. Ông scrum master akka Project leader kiêm BA, ông CTO nhảy vào code cùng
  team, bởi vì ở đây họ không đề ra gì khi bắt đầu cả nên sự cải thiện của process là không nhiều. Đây có lẽ phần nhiều
  sự khác biệt mà mình cảm nhận được đến từ việc làm thuê (outsourcing) và khi làm chủ (product), khi mình làm thuê thì
  mình sẽ phải có deadline và nhiều thứ để thoả mãn khách hàng, còn khi làm chủ thì sẽ có quyền chủ động trong công việc
  và extend cái deadline nếu cần.
- [ ] Process hơi kỳ. Việc merge merge code vào master rồi mới test + Chất lượng test không đảm bảo là một vấn đề lớn.
-

**Hệ quả là**

- [ ] Req không clean, Không có definition of done. Không có revision change,
- [ ] Overestimate, task no deadline and done when it done. Release plan thường xuyên bị trễNếu không estimate time,
  không có backup time thì làm như thế nào? Tất nhiên trễ deadline là điều tất yếu.
- [ ] không respect process.
- [ ] Action improve không hiệu quả. Performance không cao.

### Tổng kết

Vậy có process nào hoàn hảo không?
Cái gì là quan trọng nhất trong 1 process? Thái độ và sự tôn trọng.
Vậy cái gì tệ hơn code tệ?
