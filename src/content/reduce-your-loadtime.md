---
title: 'These tips will reduce your website load time'
description: 'Load Time is very important and especially important for SEO websites. These are some notes of mine when improving the load time of my website to get better SEO scores.'
date_start: '2022/02/05'
date_end: '2022/02/06'
published: true
image: 'https://i.imgur.com/syl1NsF.png'
header_image: 'https://i.imgur.com/rkyvoO6.png'
tags: ['Frontend','SEO','Tips', 'Did I Miss']
priority: 0
link: '_blog_reduce-load-time'
slug: 'reduce-your-loadtime'
location: 'Phutho, Vietnam'
---

Website load time is crucial for user experience, and for an SEO website, It is more important.
I start to read about SEO after one of my brothers said: "Why don't you set sitemap to make better SEO?". Of course, It is not relevant to this topic too much. The true reason is when I test my SEO scores, it's so terrible. And because I usually use a super-fast internet connection, I don't notice that the loading time of my website is slow (Until I get bad SEO scores).

## I. Overview about my understanding

The website loading time is primarily dependent on two actors.

1. Time to send requests, and get files. Files in this case are about web files ( HTML, CSS, JS, images...)
2. Time to render and display them on the screen

If your page call more than 20 request to get file, script at the loading page time, SEO analyze will not appreciate that. Cause it take a lot of time to send and receive the respone back. So to improve the load time, we just need to reduce the times above as much as **possible**.

## II. Reduce the get files time

Let's look a bit about my comment I got in the https://seositecheckup.com/

<p align="center" width="100%">
    <img src="https://i.imgur.com/2uH0RqE.png" alt="Reduce the get files time"/>
</p>

### 1. Reduce the images file size

To reduce the images file size, I usually use some way bellow:

* Lazy-load image. Plenty of way, you can found them on google.

* [**iloveimg**][2]: to resize images. Smaller image size makes smaller file size.

* [**compresspng**][1]: to compress images file size, It support some popular file type like JPG, PNG, GIF, and also PDF

* For icons use for all in the website, I usually merge them to one file only like this.

<p align="center" width="100%">
    <img src="https://i.imgur.com/DRgt33T.png" alt="Reduce the images file size"/>
</p>

My favorite tool is [**Figma**][3], you can use other tools of course, like **Adobe Photoshop** or **Adobe Illustrator**... what ever you want.  
And in case your icon is not svg (png) may be, you can use the tool like [**Shoebox**][4]. It's amazing and usually use for game development or in case you make sprites animation. It will auto-detect items in the png file and allowed you to choose which will be used, and also return the XY coordinate of each frame to a .txt file.

<p align="center" width="100%">
    <img src="https://i.imgur.com/pDBri6d.jpg" alt="Image animation 1"/>
    <img src="https://i.imgur.com/MBSqkH9.jpg" alt="Image animation 2"/>
</p>

By merging them together as I mention, the size of the images will be reduced. See the image below and you will notice that `icon sets.svg` is smaller than the total of all icons.
<p align="center" width="100%">
    <img src="https://i.imgur.com/DIZDlNS.png" alt="Reduce the images file"/>
</p>

This trick is also help us to reduce the time to send - receive requests when get each icons. And by cache image, we don't need to load them again. And I sure 100% that It will save your time better than send request for each like my stupid yesterday :(

<p align="center" width="100%">
    <img src="https://i.imgur.com/Dk3xkwF.png" alt="HTML bad practice"/>
</p>

After load the `icon_sets.svg` or `icon_sets.png`, you can cut and use it by plenty way.
- [**image-clipper**][5]
- [**image-to-slices**][6]
- .....

Or you can do like I did, just increase the XY coordinate to fit. Please remember divide it by a ratio in case you change the background-size, or need change icon size.

```css
$bg-size: 313.75px 263.5px;
$bg-image: url("/assets/images/icon_sets.svg");

.gmail {
    background-image: $bg-image;
    background-size: $bg-size;
    background-position-x: -2.75px;
    background-position-y: -163.75px;
}
.gmail:hover {
    background-position-x: -52.75px;
    background-position-y: -163.75px;
}
```

### 2. Reduce the .js file size / bundle file size

**source**: [indepth.dev][7]

I will note some main content in this post.

1. Check your bundle size. Try to build at -prod mode, -dev mode and check bundle size.

2. F12 in browser and check your file return was gzipped or not by finding the "Content-Encoding: gzip" in Response Headers. If not (do like in the [source][7] or find a way by yourself :D )

3. Analyze your webpack bundle by use [**webpack-bundle-analyzer**][8]. It help you to detect unused package, or inappropriate large-sized third party package.

4. Lazy loading, lazy load module, lazy load component, do what ever can help you faster load.  
For example, If I add `matTabContent` and push the content inside `ng-template`, the component only loads when the corresponding tab was activated. And It can reduce your first load `bunddle.js`from 1Mb to 300Kbs.

```typescript
<mat-tab-group mat-align-tabs="center" dynamicHeight (selectedTabChange)="tabChanged($event)" [selectedIndex]="defaultSelect" id="mainTab">
    <mat-tab label="ABOUT ME">
        <ng-template matTabContent>
            <app-hello></app-hello>
        </ng-template>
    </mat-tab>
    <mat-tab label="PORTFOLIO">
        <ng-template matTabContent>
            <app-portfolio [currentNavIndex]="navIndex"></app-portfolio>
        </ng-template>
    </mat-tab>
    <mat-tab label="AFTER WORK">
        <ng-template matTabContent>
            <app-after-work [currentNavIndex]="navIndex"></app-after-work>
        </ng-template>
    </mat-tab>
</mat-tab-group>
```

5. Reduce your `.js / .json` load in `<script>` by merge they to one, then minify them. Always true the script with `*.min.js` - it already minify.
6. In the `angular.json` > `configurations` > `production` like `optimization`, `buildOptimizer` for "aot",`vendorChunk`, `namedChunks` which you can use to optimize your bundle size. If you use VScode as IDE, it will show you the purpose of each of them. Try to customize it as you want to fit your purpose.

### 3. Others file

* Almost popular file types like SVG, png, json, jpg and pdf can compress. If it was a manual, a guide file, you should compress it before publish as a static file.
* If you have a lot of files that need to load, you can compress them to `.zip` and load one time. It makes a better performance.

## III. Reduce the render time

Nowaday render time is not important as 10 years ago, but in some case, it still be affect your user experience.

1. **Lighthouse**  
Source: https://web.dev/render-blocking-resources/  
Lighthouse in Chrome Dev Tool can help you detect the render-blocking resource. Normally, link with the `rel=stylesheet` property will be the main reason and effective your render time. You should set the correct type rel, or set `async`/`defer` if not required.
You also can read more about `rel` [here][9].

2. **Don't make browser tired**  
In case your browser runs on a very old computer or your customer use an old browser like IE. You should avoid using the CSS style which make browser tired :D 

- `overflow: hidden` + `border-radius`.
- `drop-shadow` or `box-shadow`.
- or combine two of them together.

    Of course, It will work fine if your page is small. But in case your page has a few thousand items with `overflow: hidden` and `border-radius`. It will be bad, trust me, I have once.

- In case you have to use `border-radius` you can use `outline` like Facebook did with their news feed.

Lighthouse can help you to check this problem, and it also talk you what to do,
for example

<figure align="center" width="100%">
    <img src="https://i.imgur.com/ZrZYNL1.png" alt="Lighthouse performance"/>
</figure>

3. **Prerender in the server or prerender at building time**
Yes, I'm talking about SSR and SSG. Two of these techniques will help you reduce your website loading time; the bundles' size will be smaller, and because HTML is already pre-rendered, so browsers are much easier to display.

SSR: Stands for Server side rendering, all your Frontend App / or some parts will be render at the backend then return html instead.
SSG: Stands for Static site generation, all your frontend app or some parts will be render at the building time.

[1]: https://compresspng.com/
[2]: https://www.iloveimg.com/resize-image
[3]: https://www.figma.com
[4]: https://renderhjs.net/shoebox/
[5]: https://github.com/superRaytin/image-clipper
[6]: https://www.npmjs.com/package/image-to-slices
[7]: https://indepth.dev/posts/1217/how-to-reuse-common-layouts-in-angular-using-router
[8]: https://www.npmjs.com/package/webpack-bundle-analyzer
[9]: https://www.w3schools.com/tags/att_link_rel.asp
