---
title: 'CircleCI. How to retry after the build process fails?'
description: 'This technique is my lesson learned from personal website development. I use Scully to generate static pages and It usually crashes my CI/CD pipelines.'
date_start: '2022/01/28'
date_end: '2022/01/28'
published: true
image: 'https://i.imgur.com/lqerKpt.png'
header_image: 'https://i.imgur.com/bFv4Nwd.png'
tags: ['Today I Learned','CICD','CircleCI','Tips']
priority: 1
link: '/blog/cicd-retry-build-failed'
slug: cicd-retry-build-failed
location: 'Phutho, Vietnam'
---

The slogan of CircleCI is quite good, right?

Back to the main content of this topic, before we into it now, I will show you my flow when I create my website, then I'm going to explain my issue first. After that, I will share my tries, and the final solution.

<img src="https://i.imgur.com/DmRlVqm.png" width="100%" />

This approach help me to only care about to write markdowns and don't need to care about other things. It was called [**Jamstack**][1], and almost modern frontend frameworks like Angular and VueJS, or Library like ReactJS aslo support this.  
It 's not relevant about this topic, so may I will write about it in another post.

Back to my issue, cause I use [**Scully**][2] for Jamstack, and Scully is not works stable, so when I build the static pages, will take awhile, and stuck infinitive.

```bash
npx scully -- --scanRoutes
```

```bash
#!/bin/bash -eo pipefail
npx scully -- --scanRoutes
using plugins from folder "./scully"
 ☺   new Angular build imported
Starting background servers with: node ./node_modules/@scullyio/scully/src/scully.js serve --tds false --pjf false --ls warning --noCache true --project portfolio
 ☺   Started servers in background
⠸ warming up Finding all routes in application.
⠸ warming up traversing app for routes
⠸ warming up ⠸ Loading guess-parser Pull in data to create additional routes.
⠼ Loading guess-parser Finding files in folder "./blog"
⠼ Loading guess-parser ⠼ Loading guess-parser ⠼ content files added 1⠼ content files added 2⠼ content files added 3⠼ content files added 4⠼ content files added 5⠼ content files added 6⠼ content files added 7⠼ content files added 7⠼ Creating Route List: 1/3⠼ Creating Route List: 2/3⠼ Creating Route List: 3/3Route list created in files:
  "./src/assets/scully-routes.json",
  "/home/circleci/scully-personal-website/dist/static/assets/scully-routes.json",
  "/home/circleci/scully-personal-website/dist/portfolio/browser/assets/scully-routes.json"

⠼ Creating Route List: 3/3⠼ Starting puppeteer ⠴ Starting puppeteer ⠦ Starting puppeteer ⠦ Starting puppeteer ⠧ Starting puppeteer ⠇ Starting puppeteer ⠇ Starting puppeteer ⠏ Starting puppeteer ⠏ Starting puppeteer ⠋ Starting puppeteer Route "/404" rendered into file: "./dist/static/404/index.html"
⠋ Starting puppeteer ⠋ Starting puppeteer ⠙ Starting puppeteer Route "/blog/algo-two-pointers" rendered into file: "./dist/static/blog/algo-two-pointers/index.html"
⠹ Starting puppeteer ⠹ Starting puppeteer Route "/blog/algo-sliding-window" rendered into file: "./dist/static/blog/algo-sliding-window/index.html"
⠹ Starting puppeteer Route "/blog/lambda-layers" rendered into file: "./dist/static/blog/lambda-layers/index.html"
⠸ Starting puppeteer ⠸ Starting puppeteer Route "/blog/dns-resource-type" rendered into file: "./dist/static/blog/dns-resource-type/index.html"
⠸ Starting puppeteer Route "/blog/intersection-observer-api" rendered into file: "./dist/static/blog/intersection-observer-api/index.html"
⠸ Starting puppeteer Route "/blog/algo-binary-search" rendered into file: "./dist/static/blog/algo-binary-search/index.html"
⠼ Starting puppeteer Route "/blog/spring-core-1" rendered into file: "./dist/static/blog/spring-core-1/index.html"
⠼ Starting puppeteer ⠼ Starting puppeteer Route "" rendered into file: "./dist/static/index.html"
⠼ Starting puppeteer ⠼ Rendering Routes: 9/9⠼ calculate timings 
Generating took 7.01 seconds for 9 pages:
  That is 1.29 pages per second,
  or 780 milliseconds for each page.
  
  Finding routes in the angular app took 3.02 seconds
  Pulling in route-data took 10 milliseconds
  Rendering the pages took 3.17 seconds

#   And it will stuck here forever
```

No matter what the next step is, no matter the reason cause is error or timeout, a step failed, the Job will be failed.

<p align="center" width="100%">
    <img src="https://i.imgur.com/EpSlNku.png" alt="Circle CI failed"/>
</p>

And this will cause CircleCI got build failed, and the deploy job never trigger.

<p align="center" width="100%">
    <img src="https://i.imgur.com/RJB5BJv.png" alt="Circle CI failed"/>
</p>

I have tried a code in the [forum][3], to hack it always to return true if the job gets timeouts. But It did not work in my case.

So, my solution is, set timeout for step build `no_output_timeout: 1m`, and if it was timeout (`when: on_fail`), CircleCI would create a new commit to GitHub to re-trigger a new pipeline.

```yml
- run: 
    command: npx scully -- --scanRoutes
    no_output_timeout: 1m
- run:
    name: Rebuild on fail build scully (hack)
    command: |
      git config user.email "nhvu.95@gmail.com"
      git config user.name "Vue Nguyen"
      echo 'nhvu95.com' > ./CNAME
      echo $((1 + $RANDOM % 1000)) >> ./CNAME
      git add .
      git commit -m "[ci] Re build :D"
      git push origin main
    when: on_fail
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Cause we cannot commit a new version without change, I was update a temporary file with a random number`echo $((1 + $RANDOM % 1000)) >> ./CNAME` in `./CNAME`

And when new commit comes, the CircleCI was triggered again. :D

```yml
- run:
      name: Deploy to gh-pages branch
      command: |
        echo 'nhvu95.com' > ./dist/static/CNAME
        gh-pages --message "[skip ci] deploy gh-pages" -d ./dist/static
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

To avoid trigger CircleCI when commit build result to Github Pages, I add the `[skip ci] ` before the commit message.

### My complete .yml file

```yml
jobs:
  build:
    working_directory: ~/scully-personal-website
    docker:
      - image: circleci/node:12-browsers
    steps:
      - checkout
      - restore_cache:
          key: scully-personal-website-{{ .Branch }}-{{ checksum "package-lock.json" }}
      - run: npm ci
      - save_cache:
          key: scully-personal-website-{{ .Branch }}-{{ checksum "package-lock.json" }}
          paths:
            - ~/.npm
            - ~/.cache
      - run: |
          npm run build
      - run: 
          command: npx scully -- --scanRoutes
          no_output_timeout: 1m
      - run:
          name: Rebuild on fail build scully (hack)
          command: |
            git config user.email "nhvu.95@gmail.com"
            git config user.name "Vue Nguyen"
            echo 'nhvu95.com' > ./CNAME
            echo $((1 + $RANDOM % 1000)) >> ./CNAME
            git add .
            git commit -m "[ci] Re build :D"
            git push origin main
          when: on_fail
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - persist_to_workspace:
          root: ~/scully-personal-website
          paths:
            - dist/*
  deploy:
    working_directory: ~/scully-personal-website
    docker:
      - image: node:8.10.0
    steps:
      - add_ssh_keys:
          fingerprints:
            - 'your_finger_prints'
      - checkout
      - attach_workspace:
          at: ~/scully-personal-website
      - run:
          name: Install gh-pages
          command: |
            npm install -g --silent gh-pages
      - run:
          name: Configure git
          command: |
            git config user.email "nhvu.95@gmail.com"
            git config user.name "Vue Nguyen"
      - run:
          name: Deploy to gh-pages branch
          command: |
            echo 'nhvu95.com' > ./dist/static/CNAME
            gh-pages --message "[skip ci] deploy gh-pages" -d ./dist/static
          env:
            GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

workflows:
  version: 2
  build_deploy:
    jobs:
      - build:
          filters:
            branches:
              ignore:
                - gh-pages
      - deploy:
          requires:
            - build
          filters:
            branches:
              only:
                - main
```

[1]: https://jamstack.org/
[2]: https://scully.io/
[3]: https://discuss.circleci.com/t/run-command-with-timeout-but-always-with-exit-code-0/26488/5
