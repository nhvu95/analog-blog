import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent, SearchBarComponent, TopicFilterComponent } from "../../shared/shared-ui";
import { NzGridModule } from "ng-zorro-antd/grid";
import {RouterOutlet} from "@angular/router";
import { RouteMeta } from '@analogjs/router';

@Component({
  selector: 'app-creative',
  standalone: true,
  imports: [RouterOutlet,CommonModule, TopicFilterComponent, SearchBarComponent, HeaderComponent, NzGridModule],
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export default class CreativeComponent {
  topicList = [
    { value: 'All', label: 'All' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Tool&App', label: 'Tool&App' },
  ];

  projects = [
    {
      "0": {
        guide: "https://github.com/HieuNguyenVu/angular-send-file-peer-to-peer",
        image: "https://i.imgur.com/2O9end0.jpg",
        demo: "https://f2f.nhvu95.com/",
        source: "https://github.com/HieuNguyenVu/angular-send-file-peer-to-peer",
        date_start: "2021/09/02",
        date_end: "2021/09/20",
        technologies: [
          "Angular",
          "WebRTC",
          "Stomp",
          "TaigaUI",
          "NgXS"
        ]
      },
      "1": {
        guide: "https://github.com/nhvu95/serverless-send-file-peer-to-peer",
        image: "https://i.imgur.com/2O9end0.jpg",
        demo: "https://f2f.nhvu95.com/",
        source: "https://github.com/nhvu95/serverless-send-file-peer-to-peer",
        date_start: "2021/09/02",
        date_end: "2021/09/20",
        technologies: [
          "Severless",
          "Lambda",
          "ActiveMQ",
          "DynamoDB"
        ]
      },
      "3": {
        guide: "https://github.com/HieuNguyenVu/angular-send-file-peer-to-peer",
        image: "https://i.imgur.com/2O9end0.jpg",
        demo: "https://f2f.nhvu95.com/",
        source: "https://github.com/nhvu95/serverless-send-file-peer-to-peer",
        date_start: "2021/09/02",
        date_end: "2021/09/20",
        technologies: [
          "Angular",
          "WebRTC",
          "AWSLambda",
          "ActiveMQ",
          "DynamoDB",
          "TaigaUI",
          "Severless",
          "NgXS",
          "Stomp"
        ]
      },
      title: "F2F: File to friends",
      description: "This website allow user send file directly Peer to Peer between two browser without save file in external server like google drive, one drive, etc. And it can work as torrent browser, which allow a browser share a big file for every one.",
      exist: true,
      projectTypes: [
        0,
        1, 3
      ]
    },
    {
      "0": {
        guide: "https://github.com/nhvu95/soundmemos-vuejs",
        image: "https://dsm01pap001files.storage.live.com/y4m_l2-87cWnvEQCLUFPhFvadlUsNdBdiON2V1p-N4s56XNq7oYGtj-Qa-7rxrWdfqStFbY7j0pU3Gd6Eo8mipF9A64Syv0lz5bgHviWiVkognnc7lLa3yhqw9lhq7D1fIO1DY42M-RM3rmtWOoEMmVfkoJZ_HeeC37e9BPLwLiFsA7X6su3gXasHAYX84G-mKX?width=256&height=256&cropmode=none",
        demo: "https://soundmemos.nhvu95.com/",
        source: "https://github.com/nhvu95/soundmemos-vuejs",
        date_start: "2021/10/01",
        date_end: "2021/10/10",
        technologies: [
          "VuesJS",
          "Wavesurfer",
          "Quasar"
        ]
      },
      "3": {
        guide: "https://github.com/nhvu95/soundmemos-vuejs",
        image: "https://dsm01pap001files.storage.live.com/y4m_l2-87cWnvEQCLUFPhFvadlUsNdBdiON2V1p-N4s56XNq7oYGtj-Qa-7rxrWdfqStFbY7j0pU3Gd6Eo8mipF9A64Syv0lz5bgHviWiVkognnc7lLa3yhqw9lhq7D1fIO1DY42M-RM3rmtWOoEMmVfkoJZ_HeeC37e9BPLwLiFsA7X6su3gXasHAYX84G-mKX?width=256&height=256&cropmode=none",
        demo: "https://soundmemos.nhvu95.com/",
        source: "https://github.com/nhvu95/soundmemos-vuejs",
        date_start: "2021/10/01",
        date_end: "2021/10/10",
        technologies: [
          "VuesJS",
          "Wavesurfer",
          "Quasar"
        ]
      },
      title: "Sound Memos",
      description: "Sound Recording Web Application, all sound resolve process is handled on the browser side, and do not store any data of the user. Fast and easy to use.",
      exist: true,
      projectTypes: [
        0,
        3
      ]
    },
    {
      "0": {
        guide: "https://github.com/nhvu95/scully-personal-website",
        image: "/assets/icons/favicon-196x196.png",
        demo: "https://github.com/nhvu95/scully-personal-website",
        source: "https://github.com/nhvu95/scully-personal-website",
        date_start: "2021/09/01",
        date_end: "2050/01/01",
        technologies: [
          "Angular",
          "JamStack - Scully"
        ]
      },
      "3": {
        guide: "https://github.com/nhvu95/scully-personal-website",
        image: "/assets/icons/favicon-196x196.png",
        demo: "https://github.com/nhvu95/scully-personal-website",
        source: "https://github.com/nhvu95/scully-personal-website",
        date_start: "2021/09/01",
        date_end: "2050/01/01",
        technologies: [
          "Angular",
          "JamStack - Scully"
        ]
      },
      title: "Portfolio Website",
      description: "This is my personal website, best for SEO scores and Performance scores, PWA, and also available mobile.",
      exist: true,
      projectTypes: [
        0,
        3
      ]
    },
    {
      "0": {
        guide: "https://github.com/nhvu95/host-image-client",
        image: "https://i.imgur.com/CHSIb86.png",
        demo: "https://github.com/nhvu95/host-image-client",
        source: "https://github.com/nhvu95/host-image-client",
        date_start: "2021/12/28",
        date_end: "2021/12/04",
        technologies: [
          "Angular",
          "TaigaUI",
          "RxJS"
        ]
      },
      "1": {
        guide: "https://github.com/nhvu95/hosting-image",
        image: "https://i.imgur.com/CHSIb86.png",
        demo: "https://github.com/nhvu95/hosting-image",
        source: "https://github.com/nhvu95/hosting-image",
        date_start: "2021/12/28",
        date_end: "2021/12/04",
        technologies: [
          "SpringBoot",
          "PostgresSQL",
          "Imgur"
        ]
      },
      "3": {
        guide: "https://github.com/nhvu95/host-image-client",
        image: "https://i.imgur.com/CHSIb86.png",
        demo: "https://github.com/nhvu95/hosting-image",
        source: "https://github.com/nhvu95/hosting-image",
        date_start: "2021/12/28",
        date_end: "2021/12/04",
        technologies: [
          "Angular",
          "SpringBoot",
          "TaigaUI",
          "PostgresSQL",
          "RxJS"
        ]
      },
      title: "Image Hosting",
      description: "Work In Progress!!!. Image hosting system, allow user upload image and get direct demo to download. Auto resize to multiple screen size, also support for lazy load.",
      exist: true,
      projectTypes: [
        0,
        1,
        3
      ]
    },
    {
      "2": {
        guide: "https://github.com/HieuNguyenVu/ebay-automation-tool",
        image: "https://dsm01pap001files.storage.live.com/y4mHbQmFlAEohIQ0aAnYAe6DQqkhRyklR6Ol8atm6BrLfFe2tKAnQBpJatpCzuDGtg3gWiL-FsIKT0m2H0iUE8Yhc5nrjVgD88vGKN8_DUCw29pwHi44BO9JHqa5etLCrgUVGmKclByzbFda9zqFrdRw10l0_RmZcHg5J5mW10anvt1hyn59g3grJPtR9XL5Xqn?width=284&height=177&cropmode=none",
        demo: "https://github.com/HieuNguyenVu/ebay-automation-tool",
        source: "https://github.com/HieuNguyenVu/ebay-automation-tool",
        date_start: "2021/08/20",
        date_end: "2021/08/25",
        technologies: [
          "Java 11",
          "JavaFX",
          "Selenium"
        ]
      },
      "3": {
        guide: "https://github.com/HieuNguyenVu/ebay-automation-tool",
        image: "https://dsm01pap001files.storage.live.com/y4mHbQmFlAEohIQ0aAnYAe6DQqkhRyklR6Ol8atm6BrLfFe2tKAnQBpJatpCzuDGtg3gWiL-FsIKT0m2H0iUE8Yhc5nrjVgD88vGKN8_DUCw29pwHi44BO9JHqa5etLCrgUVGmKclByzbFda9zqFrdRw10l0_RmZcHg5J5mW10anvt1hyn59g3grJPtR9XL5Xqn?width=284&height=177&cropmode=none",
        demo: "https://github.com/HieuNguyenVu/ebay-automation-tool",
        source: "https://github.com/HieuNguyenVu/ebay-automation-tool",
        date_start: "2021/08/20",
        date_end: "2021/08/25",
        technologies: [
          "Java 11",
          "JavaFX",
          "Selenium"
        ]
      },
      title: "Ebay Automation Tool",
      description: "This is an automation tool, use to feed clone accounts of eBay. Clone Accounts will be used for many different purposes.",
      exist: true,
      projectTypes: [
        2,
        3
      ]
    },
    {
      "2": {
        guide: "https://www.npmjs.com/package/@nhvu95/scully-plugin-emoji",
        image: "https://i.imgur.com/EIaJsSc.png",
        demo: "https://www.npmjs.com/package/@nhvu95/scully-plugin-emoji",
        source: "https://github.com/nhvu95/scully-plugins/tree/master/projects/scully-plugin-emoji",
        date_start: "2022/02/22",
        date_end: "2021/02/24",
        technologies: [
          "Angular",
          "JamStack",
          "Scully"
        ]
      },
      "3": {
        guide: "https://www.npmjs.com/package/@nhvu95/scully-plugin-emoji",
        image: "https://i.imgur.com/EIaJsSc.png",
        demo: "https://www.npmjs.com/package/@nhvu95/scully-plugin-emoji",
        source: "https://github.com/nhvu95/scully-plugins/tree/master/projects/scully-plugin-emoji",
        date_start: "2022/02/22",
        date_end: "2021/02/24",
        technologies: [
          "Angular",
          "JamStack",
          "Scully"
        ]
      },
      title: "Scully Plugin - Emoji",
      description: "This is a scully plugin, Run as post process after static site was rendered to convert all emoji syntax like :grinning: to 😀",
      exist: true,
      projectTypes: [
        2,
        3
      ]
    },
    {
      "2": {
        guide: "https://www.npmjs.com/package/@nhvu95/scully-plugin-scroll2section",
        image: "https://i.imgur.com/EIaJsSc.png",
        demo: "https://www.npmjs.com/package/@nhvu95/scully-plugin-scroll2section",
        source: "https://github.com/nhvu95/scully-plugins/tree/master/projects/scully-plugin-scroll2section",
        date_start: "2022/02/22",
        date_end: "2021/02/24",
        technologies: [
          "Angular",
          "JamStack",
          "Scully"
        ]
      },
      "3": {
        guide: "https://www.npmjs.com/package/@nhvu95/scully-plugin-scroll2section",
        image: "https://i.imgur.com/EIaJsSc.png",
        demo: "https://www.npmjs.com/package/@nhvu95/scully-plugin-scroll2section",
        source: "https://github.com/nhvu95/scully-plugins/tree/master/projects/scully-plugin-scroll2section",
        date_start: "2022/02/22",
        date_end: "2021/02/24",
        technologies: [
          "Angular",
          "JamStack",
          "Scully"
        ]
      },
      title: "Scully Plugin - Scroll To Section",
      description: "This is a scully plugin, Run as post process after static site was rendered to help <a> tag can scroll to a specific section in the static site",
      exist: true,
      projectTypes: [
        2,
        3
      ]
    },
    {
      "2": {
        guide: "https://www.npmjs.com/package/@nhvu95/scully-plugin-lazydisplay",
        image: "https://i.imgur.com/EIaJsSc.png",
        demo: "https://www.npmjs.com/package/@nhvu95/scully-plugin-lazydisplay",
        source: "https://github.com/nhvu95/scully-plugins/tree/master/projects/scully-plugin-lazydisplay",
        date_start: "2022/03/28",
        date_end: "2021/03/28",
        technologies: [
          "Angular",
          "JamStack",
          "Scully"
        ]
      },
      "3": {
        guide: "https://www.npmjs.com/package/@nhvu95/scully-plugin-lazydisplay",
        image: "https://i.imgur.com/EIaJsSc.png",
        demo: "https://www.npmjs.com/package/@nhvu95/scully-plugin-lazydisplay",
        source: "https://github.com/nhvu95/scully-plugins/tree/master/projects/scully-plugin-lazydisplay",
        date_start: "2022/02/22",
        date_end: "2021/02/24",
        technologies: [
          "Angular",
          "JamStack",
          "Scully"
        ]
      },
      title: "Scully Plugin - Lazy Display",
      description: "This is a scully plugin, Run as post process after static site was rendered to help page display only the item on screen, and hidden item out of screen",
      exist: true,
      projectTypes: [
        2,
        3
      ]
    }
  ]
}
