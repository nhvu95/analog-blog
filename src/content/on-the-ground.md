---
title: 'On The Ground. A journey to stand on my own feet'
description: 'Vài tháng trước mình vừa nhận một hoá đơn hơn 200$ từ AWS chỉ vì quên cmn tắt 2 cái services demo khi phỏng vấn tìm việc. Quá xót tiền, vậy là 1 con đỗ nghèo khỉ như mình lại tìm đường quay về mặt đất. Một phần cũng vì tò mò những hệ thống on-premise trước giờ họ deploy và public ra như thế nào.'
date_start: 2022/10/08
date_end: 2022/10/08
published: true
image: 'https://i.imgur.com/yDaMrZV.png'
header_image: 'https://i.imgur.com/VgWRVd8.jpg'
tags: ['DevOps','Docker','Vietnamese']
priority: 0
link: /blog/on-the-ground
slug: on-the-ground
location: 'Hanoi, Vietnam'
---

_**Hồi ở công ty cũ, mình cũng hay phải deploy các dự án cho Team dev và cả team Test. Nhưng chủ yếu việc deploy sẽ chỉ xoay quanh ở các local server trong cùng mạng LAN, hoặc nếu không thì sẽ sử dụng các dịch vụ cloud kiểu như Azure Storage, Azure Function, AWS EC2, AWS RDS, Github Page. Thế nên đây là lần đầu tiên mình tự public 1 server, và deploy ở đó.  
Sau khi dùng thử mình cũng thấy rằng, không chỉ ở trên cloud, ở mặt đất cũng có nhiều cái hay đó chứ , và nếu bạn đang đọc bài viết này, thì nó đang được serve hoàn toàn từ máy tính của mình đó 😁**_

Mình đã thử với 2 giải pháp. Cái đầu tiên không thực sự thành công nên sau đó mình đã đến với giải pháp thứ 2, và đây cũng là cách mà mình thấy ổn hơn và quyết định sử dụng nó. Thế nên, nếu các bạn không có thời gian rảnh để nghịch mấy cái tào lao và muốn tìm 1 giải pháp tốt và work ngay lập tức, mình recommend giải pháp thứ 2, bạn có thể scroll xuống thẳng [**giải pháp thứ 2**](#solution).

## **I. Giải pháp 1: Tự host và tự facing internet.**

Những thứ mình đã làm với giải pháp này sau 1 buổi mò trên internet và 2 buổi tìm solution cho cái rắc rối mà mình gặp phải
 1. **Đầu tiên mình set static IP cho con máy tính của mình & mở port ở trên windows firewall.**
 2. **Mở forward port ở trên modem setting (192.168.1.1).**
 3. **Cài Docker và chạy Docker/nginx để serve app.**
 4. **Setup DDNS từ domain của mình trên Google Domain về máy cá nhân của mình. Tools / Dịch vụ mà mình đã tử là NoIP, DDclient và DDNS Updated Admin.**
 5. **Kiểm tra thử và phát hiện lỗi.**

Giải pháp này chạy ổn cho đến khi mình phát hiện ra toàn bộ web app của mình không thể được truy cập từ các thiết bị di động. Sau khi nhờ support từ các bạn senior Dev-Ops trong group [**DevOps VietNam**](https://www.facebook.com/groups/608821322646056) và kiểm nghiệm cá nhân, mình đã tìm ra lý do, lý do mình sẽ nói chi tiết trong phần hướng dẫn của giải pháp 1 này.

## **II. Giải pháp 2: Tự host và dùng Cloudflare để facing với internet thông qua Cloudflare tunnel.**

Giải pháp này đến với mình sau khi mình đăng câu hỏi lên group [**DevOps VietNam**](https://www.facebook.com/groups/608821322646056). Cũng từ gợi ý và giúp đỡ từ một người em (bạn) [**Phạm Sơn**](https://www.facebook.com/sonpnuet), và cả comment từ một vài senior ở đây, mình đã hiểu vấn đề và thử cách này.

1. **Sẵn con Docker và Docker - nginx được cấu hình sẵn từ bước 3 của Giải pháp 1. Mình tiếp tục sử dụng nó**
2. **Cấu hình con domain (Google Domain) của mình sang dùng DNS server của Cloudflare.**
3. **Tạo Application trên Cloudflare**
4. **Tạo Tunnel và connect server đến Cloudflare tunnel.**

Mình không ước biết giải pháp này sớm hơn, mình còn thấy may vì nhờ đã thử giải pháp 1 mà mình học được khá nhiều thứ hay ho.
_______________
# **I. Tự host và tự facing internet.**

**Chuẩn bị:**
- Máy tính
- Quyền truy cập modem
- 1 Domain

Máy tính mình recommend các bạn nên kết nối mạng thông qua cáp LAN, vì kết nối của nó sẽ ổn định hơn qua wifi, và cũng tiện cho việc cấu hình hơn.

## **1. Set IP Tĩnh**

Đầu tiên là set IP tĩnh cho con máy đã, IP tĩnh giúp IP không bị thay đổi, và để modem có thể forward port đến máy của chúng ta trong mạng LAN mà không sợ IP bị thay đổi.

Các bạn ấn `Windows + R` gõ `ncpa.cpl` rồi ấn OK
Hoặc từ thanh address của windows Explorer gõ `Control Panel\All Control Panel Items\Network Connections`

Chuột phải vào mạng bạn đang sử dụng, (Ở đây mình dùng mạng lan Ethernet), chọn Properties

Tiếp đó một dialog sẽ hiện lên, chọn > `TCP/IPv4` chọn tiếp > `Properties`

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/oMc7lEf.png"/>
</figure>

Tiếp tục ấn `Windows + R` gõ `cmd` rồi ấn OK/Enter. Nhập `ipconfig /all`.

```bash
> ipconfig /all

Ethernet adapter Ethernet:

   Connection-specific DNS Suffix  . :
   Description . . . . . . . . . . . : Intel(R) Ethernet Connection (2) I219-V
   Physical Address. . . . . . . . . : 30-9C-23-68-E4-08
   DHCP Enabled. . . . . . . . . . . : No
   Autoconfiguration Enabled . . . . : Yes
   IPv6 Address. . . . . . . . . . . : 2405:4802:377:6f30:d4e9:c778:f58:6204(Preferred)
   IPv6 Address. . . . . . . . . . . : 2405:4802:377:6f30:ffff:ffff:ffff:ffed(Preferred)
   Lease Obtained. . . . . . . . . . : Friday, October 7, 2022 8:11:43 AM
   Lease Expires . . . . . . . . . . : Friday, October 7, 2022 9:30:18 PM
   Temporary IPv6 Address. . . . . . : 2405:4802:377:6f30:407f:9ea6:98f8:6ffc(Preferred)
   Link-local IPv6 Address . . . . . : fe80::d4e9:c778:f58:6204%3(Preferred)
   IPv4 Address. . . . . . . . . . . : 192.168.1.50(Preferred)
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : fe80::7e9f:7ff:fea0:9da8%3
                                       192.168.1.1
   DHCPv6 IAID . . . . . . . . . . . : 321952803
   DHCPv6 Client DUID. . . . . . . . : 00-01-00-01-23-33-8F-9E-30-9C-23-68-E4-08
   DNS Servers . . . . . . . . . . . : fe80::1%3
                                       1.1.1.1
                                       1.0.0.1
   NetBIOS over Tcpip. . . . . . . . : Enabled

```

Kéo lên phần Ethernet đúng với mạng mà bạn đang sử dụng, bạn sẽ thấy `Default Gateway` là 1 dãy IP có dạng `192.168.1.1`. IP này có thể sẽ khác ở trên máy của bạn. 
Nhưng cho dù nó là mịa gì, chỉ cần tăng số cuối lên trong khoảng từ 2-223. Trường hợp này mình để static IP của mình là `192.168.1.50`.

Quay trở về dialog lúc nãy điền IP address là IP static mới này, còn Default Gateway và Subnet Mask giống như trong command line

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/hwX1YTs.png"/>
</figure>

Nếu có người sử dụng IP này rồi thì sao? Yên tâm, nếu có người dùng thì nó sẽ lỗi ngay, hiện warning 😆biết ngay, thay thành IP khác là được.

Phần DNS server thì mình đang dùng DNS server của Cloudflare, các bạn điền giống thế cũng được. Ưu điểm của cái này là vào được Medium và mấy trang cơ bản bị chặn ở VN.

&nbsp;
### **Tiếp đến việc chúng ta cần làm là mở port windows.** 

Ấn phím `Windows + S` nhập `Firewall`. Chọn **Windows Defender Firewall with Advanced Security**

Từ tab bên trái chọn `Inbound Rules` > `New Rule`. Và tạo mới 1 rule, chọn `Port` > `Next`

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/IP33IkF.png"/>
</figure>

Chọn protocol mà bạn muốn mở, ở đây mình sẽ mở TCP với các cổng lần lượt là 
80, 443, 5000-5010. Trong đó 80 là cổng mặc định của windows, Mở thêm 443 để support cho HTTPS, và thêm 5000 để cho Docker.

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/8YdCY36.png"/>
</figure>

- Ở bước Action bạn chọn Allow the Connection
- Bước Profile cứ để mặc định
- Bước Name bạn điền tên tuỳ ý. Mình thì để là SelfHostRule cho dễ tìm

=> **Tiếp đến tạo 1 rule tương tự cho `Outbound Rules`**


## **2. Mở Port Forward ở Modem.**

Từ Cửa sổ browser, các bạn gõ 192.168.1.1 Đây là IP mặc định để cấu hình modem, Mỗi loại modem sẽ có 1 ip khác nhau. Các bạn có thể tìm thấy nó ở mặt đáy của modem.

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/zlTqhP8.png"/>
</figure>

Thường thì tài khoản và mật khẩu mặc định sẽ là `admin / admin`. Nhưng đôi khi thì nó đã bị kỹ thuật viên đổi mật khẩu rồi.  
Nếu là modem của FPT thì mật khẩu thường sẽ là 7 chữ số cuối trong mã hợp đồng internet ( bạn có thể tìm thấy ở trong hoá đơn mạng). Ví dụ Mã hợp đồng là `HHNAAP1234` thì mật khẩu sẽ là `AAP1234`

Dù là modem của hãng nào cũng sẽ có phần Security Setup và cũng sẽ có phần Port Forwarding

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/Iu8MJUS.png"/>
</figure>

Các bạn điền như hình để mở cả TCP/UDP cho Port 80. Ở phần IP address thì bạn điền static IP của bạn.
Phần WAN Port của mình vì mình hay dùng những cổng này nên mình mở port range từ 20 đến 80. Nếu không muốn mở range các bạn có thể điền nguyên 80 thôi cũng được

Làm tương tự, tạo thêm 1 cái với Port 443 để HTTPS có thể hoạt động, và điền nguyên 443 nếu không muốn public các port không dùng đến

## 3. Cài Docker và cấu hình Docker/Nginx

Việc cài Docker thì khá đơn giản rồi, chỉ việc lên [**trang chủ**](https://www.docker.com/) và tải về thôi.

Kiểm tra cài đặt docker thành công hay chưa bằng command

```bash
> docker --version
~~~~~~~~~~~~~~~~~~~~
Docker version 20.10.17, build 100c701
```

Để cài nginx chạy nginx trên docker, ta dùng command

```bash
> docker pull nginx
```

Thực ra phần tốn thời gian nhất của mình trong bước này đó chính là cấu hình `nginx` cho sub domain ( wildcard DNS), tiếp đó là việc cấu hình SSL cho nó.

Tạo 1 Dockerfile kiểu như thế này

```bash
# Dockerfile
# STAGE3: Run
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
RUN mkdir /etc/nginx/sites-enabled
COPY ./webrtc/f2f.nhvu95.com.conf /etc/nginx/sites-available/f2f.nhvu95.com
COPY ./webrtc/dist/webrtc /usr/share/nginx/html/f2f.nhvu95.com
COPY ./scully-personal-website/nhvu95.com.conf /etc/nginx/sites-available/nhvu95.com
COPY ./scully-personal-website/dist/static /usr/share/nginx/html/nhvu95.com
RUN ln -s /etc/nginx/sites-available/nhvu95.com /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/f2f.nhvu95.com /etc/nginx/sites-enabled/
```

Giải thích qua một chút về dockerfile của mình, lúc đầu đây là một dockerfile multi-stage. Lúc đầu mình sẽ có
- STAGE1: build domain nhvu95.com 
- STAGE2: build sub domain f2f.nhvu95.com
- STAGE3: initialize nginx

Nhưng sau mình nhận ra là việc dùng multi-stage để build code (STAGE1 / STAGE2) trong code sẽ tốn rất nhiều RAM, hoặc nói đúng hơn là nó chiếm RAM cho Docker và sau đó không giải phóng đi 😥 Mở Task Manager lên lúc nào `Vmmem` cũng toàn `~16Gb`.  
Và khi mình thay đổi ở project của sub domain, mình cũng phải thay đổi cả project của domain chính. Chết tiệt. Thế nên giờ Dockerfile chỉ còn lại stage 3 này.

Đây là cấu trúc project của mình với Dockerfile này

```bash
>   - Dockerfile 
    - nginx.conf    # nginx root config
    - certbot/nhvu95.com/* # Folder store SSL certification
    - scully-personal-website
        - nhvu95.com.conf # nhvu95.com nginx configuration file
        - dist/static/    # nhvu95.com build folder
    - webrtc 
        - f2f.nhvu95.com.conf   # f2f.nhvu95.com nginx configuration file
        - dist/webrtc           # f2f.nhvu95.com build folder
```

Các bạn có thể thấy là` Dockerfile, nginx.conf` và thư mục `certbot/nhvu95.com/*` sẽ nằm ở root, đây cũng sẽ là nơi chúng ta sẽ gọi command để build và chạy Docker

```bash
#nginx.conf
events{}
http {
    include /etc/nginx/mime.types;
    include /etc/nginx/sites-enabled/*;
}
```

```bash
#nhvu95.com.conf
server {
    listen 80 default_server;
    listen [::]:80 default_server ;

    listen 443 ssl default_server;
    listen [::]:443 ssl default_server;
    ssl_certificate     cert/fullchain.pem;
	ssl_certificate_key cert/privkey.pem;

    root /usr/share/nginx/html/nhvu95.com;
    index index.html;
    server_name nhvu95.com www.nhvu95.com;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
#f2f.nhvu95.com.conf
server {
    listen 80;
    listen [::]:80;

    listen 443 ssl;
    listen [::]:443 ssl;
    ssl_certificate     cert/fullchain.pem;
	ssl_certificate_key cert/privkey.pem;

    root /usr/share/nginx/html/f2f.nhvu95.com;
    index index.html;
    server_name f2f.nhvu95.com www.f2f.nhvu95.com;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Như các bạn có thể thấy thì ở đây còn có `fullchain.pem; privkey.pem;`. Đây chính là các chứng chỉ SSL được generate ra từ [**Certbot**](https://certbot.eff.org/instructions?ws=other&os=windows) với command:

```bash
certbot certonly --standalone -d nhvu95.com,f2f.nhvu95.com,soundmemos.nhvu95.com,api.nhvu95.com --expand
```

Từ khoá expand ở đây dùng trong trường hợp bạn đã có cert cho `nhvu95.com` và muốn "expand" nó ra để dùng cho cả `f2f.nhvu95.com`.

Nếu không có gì thay đổi thì certbot sẽ tự động lưu SSL cert cho bạn ở 
`C:\Certbot\live`. Copy chúng nó về và dùng thôi.

Mở thư mục chứa Dockerfile (thư mục root bên trên), chuột phải, chọn `powershell` và chạy command dưới đây để build Docker image, nhớ giữ dấu chấm cuối command

```bash
docker build -t <image_name> .

#ex: docker build -t self-host-image .
```

Để chạy docker, bạn sử dụng 2 comman sau.
Command thứ nhất để tạo một network, sau này chúng ta sẽ dùng chung nó với `Cloudflare tunnel` ở giải pháp thứ 2

```bash
docker network create tunnel

docker run --detach --restart unless-stopped --network tunnel --name <container_name> -v ${PWD}/certbot/nhvu95.com:/etc/nginx/cert -p 80:80 -p 443:443 <image_name>

#ex: docker run  --detach --restart unless-stopped --network tunnel --name self-host-container -v ${PWD}/certbot/nhvu95.com:/etc/nginx/cert -p 80:80 -p 443:443 self-host-image
```

Sau bước này, nếu mọi thứ OK thì bạn đã có thể mở website bằng `http://localhost/` rồi đó.
Nếu đen, windows mặc định sẽ có 1 services sử dụng port 80 này và lúc này thứ browser hiện ra không phải trang web của bạn. Việc bạn cần làm là tắt cái windows services đó đi, yên tâm, không ảnh hưởng gì cả.  

`Windows + S` > gõ `services` > Tìm cái services này, chuột phải vào properties và tắt nó đi

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/3iMouWf.png"/>
</figure>

==> Lúc này `http://localhost/` của bạn sẽ vào bình thường

Và cộng với việc public port ở các bước trước, lúc này bạn đã có thể truy cập thông qua public ipv6. Bạn có thể lấy public IPv6 ở [**đây**](https://whatismyipaddress.com/).  
Bạn có thể dùng IPv6 để truy cập website bằng địa chỉ như sau, nhớ giữ 2 dấu **[** **]** ở trên URL thì mới hoạt động được

>https://[2405:4802:377:6f30:xxx:94fe:xxxx:50b5]/

Tiếc là Public IPv4 của bạn lấy được ở các trang web online thường sẽ không hoạt động. Cái mà họ trả về thường sẽ là public IPv4 của ISP(các nhà cung cấp dịch vụ mạng) chứ không phải Public IPv4 máy tính của bạn.  
Mở modem setting lên, vào phần WAN Status, WAN Ipv4 ở đây mới đúng là public IPv4 của bạn, và nếu bạn thử với IpV4 này thì nó sẽ hoạt động.
>http://21.xxx.xxx.100/

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/osMLL94.png"/>
</figure>

## **4. Setup DDNS**

Như bình thường, nếu chúng ta dùng Domain với Record Type là `A/AAAA` và trỏ thẳng đến public `IPv4/IPv6` thì website của chúng ta sẽ hoạt động. Hửm, nhưng chuyện gì sẽ xảy ra nếu mất điện? hoặc giả server bị reset và IP của chúng ta bị thay đổi?

Có những dịch vụ kiểu như `No-IP` sẽ support việc này, hoặc chúng ta có thể dùng các tool như `ddclient`, `dydns` hoặc `DDNS Updater Admin`. 
Về bản chất của chúng nó là giống nhau, đều là các tool cài trên server, khi phát hiện public IP thay đổi thì thông báo cho DNS server qua API hoặc socket.  
Mình kiểm tra thử thì `No-IP` mất phí, `ddclient` và `dydns` thì chạy quá là sida trên docker. Cuối cùng mình quyết định dùng `DDNS Updater Admin` vì nó free và ổn định.

Đầu tiên mình sẽ cố gắng setup domain trông giống như thế này.

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/qoSu7DL.png"/>
</figure>

Khi tạo DDNS họ sẽ cho mình account và key để update IP
<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/Z1jmxhd.png"/>
    <img loading="lazy" src="https://i.imgur.com/rVESLTd.png"/>
</figure>

Tải [**"DDNS Updater Admin**"](https://ddnsupdater.videocoding.org/download.html) về mở lên. Điền URL dưới đây, thay bằng domain của bạn, và account password của bạn

```bash
https://domains.google.com/nic/update?hostname=nhvu95.com&myip=%IP%
```
<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/BItUqPZ.png"/>
</figure>

Bản thân thằng `**DDNS Updater Admin**` này cũng check IP của bạn theo thời gian từ các nguồn web online như:

- http://[icanhazip.com]/
- http://[www.trackip.net]/ip
- http://[ip.appspot.com]/  
...

Mình không điền cái IPv4 update URL vì như đã nói ở trên, Public IPv4 lấy về toàn sai, vì vậy mình chỉ dùng duy nhất IPv6.

Sau khi Save, Apply bạn reload lại trang Google Domain, thấy domain đã được cập nhật IPv6 giống hình của mình thì là thành công.

**_Từ giờ phút này bạn đã có thể truy cập trang web bằng domain của bạn_**

## **5. Kiểm tra thử và phát hiện lỗi.**

Mọi thứ hoạt động rất ổn cho đến khi mình phát hiện ra mình không thể truy cập website của mình bằng 4G trên điện thoại.  
Điện thoại nếu kết nối wifi thì vào được, hoặc nếu dùng 4G và bật VPN (Warp 1111) thì vào ngon lành, nhưng tắt đi thì chịu.  
Chẳng nhẽ trang web của mình đã bị đối xử như po*nhub 😞. Mình còn đã kiểm tra domain của mình (nhvu95.com) có khi nào có chữ "vu" bị hiểu nhầm thành chữ "v.ú" không cơ 😁. Rất may qua comment của các anh em đã giải thích cho mình

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/Bqmeqgy.png"/>
</figure>

Mình kiểm tra thì đúng thế thật :O, Hơn nữa IPv4 lấy được còn là IPv4 của ISP Viettel, Đây có lẽ chính là lý do mà dù ở phía server mình có trỏ DDNS đến WAN IPv4 (Cái trong modem setting) của mình thì điện thoại cũng không kết nối được.
Tuy nhiên khi dùng Wifi hoặc VPN thì IPv6 và IPv4 của điện thoại đều được cấp bình thường 😁. Kiến thức mới này đã được tiếp thu 😀.

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/q3fgRqh.jpg"/>
</figure>
_______________

# II. **Tự host và dùng Cloudflare để facing với internet thông qua Cloudflare tunnel.**
### Solution
Thay vì public port và rồi cấu hình DDNS một đống thứ từa lưa khác giống như cách 1, thì đại khái đây sẽ là cách mà chúng ta làm lại.
Cloudflare sẽ giúp chúng ta xử lý vụ định tuyến, IP các thứ loằng ngoằng bên trên, chúng ta chỉ cần cấu hình `Cloudflare tunnel` trỏ đến server của chúng ta là được.

Sau khi có được keyword về `Cloudflare tunnel` và tìm hiểu nó, mình thấy nó khá giống với `ngrok` một trong những thứ mình từng dùng ngày trước. `Ngrok` cũng cho phép publich localhost nhưng sẽ phải sử dụng domain của `ngrok`.

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/QEKfpK1.png"/>
</figure>

Trên hình thì sẽ có các services của Cloudflare, nhưng thực ra thì nếu chỉ self-host không thôi thì không cần dùng đến các thứ đó.  
Những thứ bạn cần chuẩn bị cho giải pháp này

- Domain
- Cloudflare account
- Server có kết nối mạng

## 1. Con Docker và Nginx cấu hình tương tự như giải pháp 1
Chúng ta cứ giữ nguyên phần này
## 2. Cấu hình con domain (Google Domain) của mình sang dùng DNS server của Cloudflare.

Việc đăng ký account Cloudflare rất dễ rồi, các bạn tự mò.

Sau khi login Cloudflare sẽ điều hướng chúng ta đến một trang quản trị. Việc chúng ta cần làm đầu tiên là trỏ Domain của chúng ta đến Clouldflare đã.

Chọn `Websites > Add a Site` và điền domain của bạn vào đây, rồi sau đó ấn Next.
VD: nhvu95.com.
<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/Aq1DcKa.png"/>
</figure>


Sẽ có 4 plan để cho chúng ta chọn, ở đây nhu cầu của mình chỉ dùng đến Free plan, nên mình chọn free plan. Nếu có nhu cầu chọn những plan mất phí, bạn cần phải add thêm thẻ visa/mastercard trước khi tiếp tục (`Billing > Payment Info`), còn nếu bạn không có nhu cầu, chúng ta có thể tiếp tục qua bước tiếp theo.

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/2tcWPoh.png"/>
</figure>

1. Chọn > `Continue`

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/XSuYcMW.png"/>
</figure>

2. Một dialog hiện lên để confirm về việc Add records later, chọn > `Confirm`
3. Copy 2 Cloudflare name server ở màn hình tiếp theo và paste ra notepad hoặc chỗ nào đó để dùng sau này.

```
xxxx.ns.Cloudflare.com
xxxx.ns.Cloudflare.com
```
4. Màn hình tiếp theo sẽ đưa các bạn đến 1 cái quicks-start guide. Ở đây sẽ có các tuỳ chọn cho phép bạn tối ưu security hay performance cho domain của mình. 
Ví dụ như:
- Rewrite lại HTTPS, nếu bạn bật cái này thì bạn không cần generate SSL cert từ Certbot nữa cũng được ( Chắc vậy 😁 mình cũng chưa thử).
- Hoặc tuỳ chọn luôn luôn sử dụng HTTPS
- Tuỳ chọn auto minify JS, CSS, HTML. Hoặc nén Brotli để load trang nhanh hơn

Túm lại là muốn dùng cái nào thì cấu hình cái đó, tuỳ mỗi người.

Bấm chọn > `Finish`

5. Lúc này Cloudflare sẽ đưa bạn đến một màn hình Overview. Tạm kệ nó ở đó đã. Việc chúng ta cần làm lúc này là mở tab khác và về trang quản lý domain.

Bất kì platform bán domain nào cũng sẽ có chỗ để cấu hình DNS Server, dù là Google Domain, Name cheap, Godady...  
Mở phần đó lên và điền 2 DNS server đã copy trước đó vào, rồi > `Lưu`.
<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/b2PbGXI.png"/>
</figure>

Sẽ mất 1 lúc để domain có thể hoạt động, các bạn quay về tab > `Websites` của Cloudflare và thấy domain đã được tích xanh thì có nghĩa là đã thành công.
<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/j3UXVab.png"/>
</figure>

Vậy là đã xong bước cấu hình domain.

## **3. Tạo Application trên Cloudflare**


Từ thanh công cụ Của Clouldflare, chọn > `Zero Trust`. Cloudflare sẽ đưa bạn đến Dashboard của Cloudflare Zero Trust.

Tại đây, chúng ta chọn `Access` > `Application` > `Add an application` > `Self-hosted`.

**\> Configure App** - Config domain, path và tên app

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/gwlHpsW.png"/>
</figure>

**\> Add policies** - Config policies để truy cập app  
- Nếu muốn public để tất cả mọi người có thể truy cập, bạn nên chọn `Action` là `Bypass` và ở phần `Includes` để là `Everyone`. Còn nếu muốn giới hạn những người có thể truy cập, vd theo email, ip, location thì bạn có thể tuỳ chỉnh, khi đó muốn xem được trang của bạn bắt buộc user phải đăng nhập thông qua 1 page login của Cloudflare gọi là Cloudflare Access trông như thế này.

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/nwDVja1.png" alt="JS components"/>
</figure>


**\> CORS settings** - CORS, Cookie, etc
- Ở bước này sẽ cho phép bạn bật tắt CORS, filter các resful method như GET, PUT, POST ..etc
- Và ở đây cũng có tuỳ chọn khác về Cookie..

Chọn > `Add application` Để tạo 1 application

## **4. Tạo Tunnel và connect server đến Cloudflare tunnel**

Từ Zero Trust Dashboard, chọn `Access` > `Tunnels` > `Create a tunnel`.

- Đền tên tunnel > `Save tunnel`

Ở bước `> Install connector`, tuỳ thuộc vào hệ điều hành mà server sử dụng sẽ có cách cài đặt khác nhau. Nhìn chung mấy thằng kia không có gì khó. Docker thì hơi dị chút vì phải cấu hình network.

Mình dùng Docker - Nginx để serve website nên mình cũng dùng luôn docker tunnel cho tiện quản lý.

\> Chọn `Docker` > Copy command

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/YOrBrXG.png" alt="JS components"/>
</figure>

sửa một chút cho command trông giống như sau và chạy

```
docker run --detach --restart unless-stopped --network tunnel Cloudflare/Cloudflared:latest tunnel --no-autoupdate run --token eyJhIjoiZDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Nếu kết nối đến tunnel thành công, IP và connector ID sẽ xuất hiện ở phần `Connectors` phía dưới khung cửa sổ. Ấn > `Next`

Tại bước cấu hình > **Route tunnel**, bạn chọn domain kết nối đến tunnel này
Riêng về phần services: bạn điền http://localhost/. Nếu bạn serve trên docker thì hơi khác 1 chút, bạn phải để là static local IP của bạn thì nó mới ăn http://192.168.1.50:80.  
Đây có lẽ là vấn đề của Cocker/Cloudflare tunnel. Mình mất gần 1 buổi mới tìm ra cách xử lý 😞

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/ZQYJAdH.png" alt="JS components"/>
</figure>

Nếu có nhiều sub domain, bạn cứ save nó lại trước đã rồi quay trở về màn hình List `tunnels` > chọn `Configure`.

Ở tab Public Hostname, bạn add thêm public hostname cho sub domain

<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/MMuM4HT.png" alt="JS components"/>
</figure>

Khi tạo tunnel thành công. Bạn quay trở về Cloudflare Dashboard, chọn domain vừa cấu hình.
<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/qX1ErOH.png" alt="JS components"/>
</figure>
<figure align="center" width="100%">
    <img loading="lazy" src="https://i.imgur.com/SSTP5d0.png" alt="JS components"/>
</figure>

Lúc này những DNS Records mới sẽ được tự động tạo ra cho domain của bạn để kết nối đến Tunnel, riêng 2 record `_domainconnect` và `_dmarc` giống như trên hình, nếu như chúng không có thì bạn chỉ cần tự tạo thêm là được.

Và Yes. Đến lúc này thì toàn bạn đã có thể hoàn toàn truy cập website của mình rồi đó.

Chúc các bạn thành công.

https://nhvu95.com/  
https://f2f.nhvu95.com/#/

_____________

**Note riêng cho Angular/Scully:** Sau khi sử dụng Scully - angular host trên nginx cùng với Cloudflare, Thì thằng Optimization của Cloudflare nó sẽ làm hỏng kiến trúc của Scully. Issue về nó mình cũng đã tìm thấy ở đây: https://github.com/scullyio/scully/issues/131

**Giải pháp 1:** `Website` > `<domain_name>` > `Caching`> `Configuration` > Và bật chế độ Dev mode của nó lên là được. Tuy nhiên CDN sẽ không cache nữa, sẽ làm tăng thời gian load static html.  
**Giải pháp 2:** `Website` > `<domain_name>` > `Speed`> `Optimization` > `Auto Minify` và bỏ chọn minify của HTML đi là được

