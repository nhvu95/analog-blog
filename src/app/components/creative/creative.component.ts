import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  SearchBarComponent,
  TopicFilterComponent,
} from '@shared';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'app-creative',
  standalone: true,
  imports: [
    CommonModule,
    TopicFilterComponent,
    SearchBarComponent,
    HeaderComponent,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzTypographyModule,
    NzPopoverModule,
  ],
  templateUrl: './creative.component.html',
  styleUrls: ['./creative.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreativeComponent {
  webs = [
    {
      image: 'https://i.imgur.com/8DKnnkf.png',
      techs: ['Angular15', 'AnalogJS', 'Tailwind', 'NgZorro'],
      name: 'Portfolio website',
      description:
        'This website is a place where I jot down my daily musings, share my ideas, and experiment with new concepts that capture my imagination. Additionally, I also use this platform to curate and share interesting tidbits from the vast expanse of the internet.',
      modified: '04/03/2023',
      link: 'https://nhvu95.com/',
      source: 'https://nhvu95.com/',
    },
    {
      image:
        'https://dsm01pap001files.storage.live.com/y4m_l2-87cWnvEQCLUFPhFvadlUsNdBdiON2V1p-N4s56XNq7oYGtj-Qa-7rxrWdfqStFbY7j0pU3Gd6Eo8mipF9A64Syv0lz5bgHviWiVkognnc7lLa3yhqw9lhq7D1fIO1DY42M-RM3rmtWOoEMmVfkoJZ_HeeC37e9BPLwLiFsA7X6su3gXasHAYX84G-mKX?width=256&height=256&cropmode=none',
      techs: ['VuesJS', 'Wavesuffer', 'Quasar'],
      name: 'Sound Memos',
      description:
        'Sound Recording Web Application, all sound resolve process is handled on the browser side, and do not store any data of the user. Fast and easy to use.',
      modified: '10/10/2021',
      link: 'https://soundmemos.nhvu95.com/',
      source: 'https://github.com/nhvu95/soundmemos-vuejs',
    },
    {
      image: 'https://i.imgur.com/5nOvx8E.jpg',
      techs: ['OpenVSCode Server', 'Docker', 'Cloudflare'],
      name: 'Playground',
      description:
        "This is virtual VsCode where I can write some basic logic or check to insurance all things work as expected. Sometimes I use this one when I work with a stranger's computer.",
      modified: '30/06/2023',
      link: 'https://playground.nhvu95.com/?folder=/tmp/playground',
      source: 'https://playground.nhvu95.com/?folder=/tmp/playground',
    },
    {
      image: 'https://i.imgur.com/2O9end0.jpg',
      techs: [
        'Angular12',
        'SpringBoot',
        'WebRTC',
        'ActiveMQ',
        'PostgresSQL',
        'TURN-Server',
      ],
      name: 'Files to Friends',
      description:
        'This website allows users to send files directly between two browsers using a Peer to Peer connection without the need to save the file on external servers post.ts Google Drive or OneDrive. Additionally, our website can function as a torrent browser, enabling a browser to share large files with anyone.',
      modified: '01/02/2023',
      link: 'https://f2f.nhvu95.com/#/',
      source: 'https://github.com/nhvu95/angular-send-file-peer-to-peer',
    },
  ];
  web: any;
}
