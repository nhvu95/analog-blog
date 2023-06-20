---
title: 'Confirming rumors. Does lazy loading impact security?'
description: "Recently, I was asked a question during an interview by a French SA that got me thinking: \"Does lazy-loading impact security?\" Initially, my answer was no. However, the interviewer brought up an interesting point: sometimes, users have to authenticate before loading the remaining modules through lazy-loading. This is better than loading everything at the initial loading time."
date_start: '2023/06/01'
date_end: '2023/06/11'
published: true
image: 'https://i.imgur.com/hPfE5Py.jpg'
header_image: 'https://www.coverphotosforfb.com/files/covers/72-lazy-cat.jpg'
tags: ['ZeroCode','Vietnam']
priority: 0
link: '/blog/rumors-lazy-loading-and-security'
slug: rumors-lazy-loading-and-security
location: 'Hanoi, Vietnam'
type_index: 0
---

Recently, I was asked a question during an interview by a French SA that got me thinking: "Does lazy-loading impact security?" Initially, my answer was no. However, the interviewer brought up an interesting point: sometimes, users have to authenticate before loading the remaining modules through lazy-loading. This is better than loading everything at the initial loading time.

Curious about this topic, I took to Facebook and posted the question. I received a response from a GDE who said, "But it doesn't make sense because to do lazy-loading, it still has to link the first bundle with the lazy-loading bundles. And someone can still load them by doing the trick."

Today, we will confirm whether this is true or not.

## I. Let's check the rumors first - Do we still can load the remaining modules by do a trick?

Because I familiar with Angular, so let try with the famous Angular website https://angular.io/
<figure align="center" width="100%">
    <img src="https://i.imgur.com/M7xTGRS.png"/>
</figure>

Three first scripts are loaded in this website

* **runtime.js** : This is a webpack loader. A tiny file with Webpack utilities that are needed to load the other files.
* **main.js**: This is where the action happens. This file contains all your code.
* **polyfills.js**: This one should be self explanatory. It contains all the polyfills you declare in your polyfills.ts file.

So let's check the `runtime.js` file  
 [1] select the runtime file
 [2] select this button to beautify the source code

<figure align="center" width="100%">
    <img src="https://i.imgur.com/dIFhQV3.png"/>
</figure>

Use Ctrl+F to search the `.js` word, Tadah 🎆 ; they are here. I can see lazy loading bundles were linking here.

<figure align="center" width="100%">
    <img src="https://i.imgur.com/UZtWFTT.png"/>
</figure>

But even I got their name, how can I load it? After trying, it's quite simple. I copied two string from this part, `src_app_custom-elements_resource_resource-list_module_ts` and `c6da9b798e3c43bc` then combine them together.

`https://angular.io/src_app_custom-elements_resource_resource-list_module_ts.c6da9b798e3c43bc.js`

Boom, here is the code of the unloaded bundle use by lazy loading. And this file will match with the route https://angular.io/resources?category=community 

<figure align="center" width="100%">
    <img src="https://i.imgur.com/7X4C06j.png"/>
</figure>

**Although we can still load lazy modules by doing tricks, I believe it is still better than loading everything initially. I can confirm with the GDE man: It does impact the security, but not much - and he is talking the TRUTH.**

## II. Can we improve security for this case?

Come up with this challenge, I'm thinking about the solution to make it better.

### 1. Solution 1: Divided web application into two parts, Login page, Inner Pages

The login page could be SSR (Server side rendering) page or SSO (Single Sign On) page, then redirect to the Inner Pages which is SPA or whatever. In this way, we can make sure users must be login first, they cannot load all the source code until they loged-in.

But what happened if the user accesses the inner pages directly via URLs? Be aware that we don't just prevent users use inner pages, we want them cannot load bundles and source code as well.

I thought about a solution that uses some API gateway like NGINX / APACHE to solve this issue. Well well, Be honest I'm not a master of NGINX / APACHE, so I asked ChatGPT. Basically, NGINX configuration looks like this. I believe maybe we have a better way than @Teapot 418 😁 but this one is fast and easiest for a demo.

```yaml
worker_processes auto;
events {
  worker_connections 1024;
}

http {
  map $http_cookie $access_token {
	default "";
	"~*access_token=(?<token>[^;]+)" "Bearer $token";
  }
  
  server {
    listen 7890;
    server_name localdomain;

    location / {
	  set $auth_url http://192.168.1.50:5000/auth/verify-token;

      proxy_pass $auth_url;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
	  proxy_set_header Authorization $access_token;
      proxy_cache_bypass $http_upgrade;
	  proxy_set_header X-Original-Status $status;

	  proxy_intercept_errors on;
	  proxy_redirect off;
	  
      error_page 400 401 402 403 405 500 501 502 503 504 @login;
	  error_page 418 @server_up;
	  
    }

	location @server_up {
	  root /usr/share/nginx/html;
	  try_files /index.html =404;
    }

	location @login {
      # Serve login.html for error pages
      root /usr/share/nginx/html;
      try_files /login.html =404;
    }

  }
}
```

After a bunch of questions and fixing a thousand bugs. Finally, I got an example of this idea.
ChatGPT help me create almost of things, HTML, CSS, NestJS for Backend, Nginx configuration, Dockerfile, Docker compose...

#### Apache is much better
After taking a few days with Nginx, Lua, Luarocks and Openresty as well to try to find a better solution but go nowhere. I come up with Apache.

```yaml
ServerName localdomain
<VirtualHost *:80>

    DocumentRoot /var/www/html/
    RewriteEngine On
    LogLevel debug

    <LocationMatch "^/(?!login)">
        Order allow,deny
        Allow from all

        RewriteCond %{HTTP_COOKIE} !access_token= [NC]
        RewriteRule ^ /login [R,L]

        RewriteCond %{HTTP_COOKIE} access_token=([^;]+) [NC]
        RewriteRule ^ - [E=AUTH_TOKEN:%1]

        RewriteCond %{ENV:AUTH_TOKEN} .
        RewriteRule ^ - [E=VERIFY_URL:http://192.168.1.50:5000/auth/verify-token]

        RewriteCond %{ENV:VERIFY_URL} .
        RewriteRule ^ - [P]

        RewriteCond %{ENV:VERIFY_STATUS} !=200
        RewriteRule ^ /login [R,L]

        RewriteRule ^ /index.html [L]
    </LocationMatch>

    <Location /login>
        Order allow,deny
        Allow from all

        RewriteRule ^ /login.html [L]
    </Location>

</VirtualHost>
```
It looks more clear and much better, isn't it?

#### Source code

You can refer to this project [here](https://github.com/nhvu95/lazy-loading-with-separate-login-screen) and try it yourself
    
### 2. Solution 2: Verify the token before load bundles
Dividing an application into two HTML seems not suitable for all projects, some people don't want that. I think this could be another solution.

In section I, I already show you a list of bundles that will lazy-loading. Now same as the Apache approach, We just need to check routes when the browser gets more bundles. If they have no permission or no role, just redirect that request to 404.html or another route.

Sound good, but what if we have dynamic bundles? I believe Ideas is allowing only the first bundles, but then all other bundles need to verify the token.

What if I just want to verify only some lazy-loading bundles and ignore others? The answer is Customization Webpack bundle names. After running the build process we can attract the list of lazy-load bundle names by using a trick like
`ng build >> result.txt` then read that file to get the list. 

```result.txt
Initial Chunk Files               | Names         |      Size
styles.f5569776d791a765b7d7.css   | styles        |   3.36 MB
main.b93c138a86ff7a3d44c3.js      | main          |   1.21 MB
polyfills.6af472174c8d1d45f160.js | polyfills     |  63.17 kB
runtime.0c83c549e3becd697e97.js   | runtime       |   2.28 kB

| Initial Total |   4.63 MB

Lazy Chunk Files                  | Names         |      Size
1.62a4dfcef6b675ce110a.js         | -             | 102.40 kB
5.2c48c24029dbf1d76721.js         | -             |  73.54 kB
6.3295e1ce90b8aef8b9b3.js         | -             |  16.47 kB

Build at: 2023-06-18T16:03:24.922Z - Hash: 55c655b7b75b2e705234 - Time: 48749ms
```

The next thing we need to do is make sure we update apache.conf in CI/CD to make it ignore some bundles in the list.


### 3. Solution 3: Unknow

I'm still thinking about it, If you have other ideas, please comment bellows. It will be welcome.
Thank you for your time.
