import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  SearchBarComponent,
  TopicFilterComponent,
} from '../../shared/shared-ui';
import { BlogItem, BlogItemComponent } from './blog-item/blog-item.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-blog',
  standalone: true,
  imports:[
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    SearchBarComponent,
    TopicFilterComponent,
    BlogItemComponent,
    NzFormModule,
    NzGridModule,
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export default class BlogComponent {
  topicList = [
    { value: 'All', label: 'All' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'DidIMiss', label: 'Did I Miss' },
    { value: 'ZeroCode', label: 'ZeroCode' },
    { value: 'TID', label: 'Today I Learned' },
  ];
  postList: BlogItem[] = [
    {
      title:
        'An Extraordinary WebLG Has Been Released By Great China Scientists',
      image: 'https://i.imgur.com/AxItho4.png',
      shortDescription:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative director Alessandro Michele's, unique ability to combine the platform to only one",
      tags: ['Technology'],
      date: '2022/02/19',
      avatar: 'https://i.imgur.com/6jVNuDb.jpg',
    },
    {
      title:
        'An Extraordinary WebLG Has Been Released By Great China Scientists',
      image: 'https://i.imgur.com/AxItho4.png',
      shortDescription:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative director Alessandro Michele's, unique ability to combine the platform to only one",
      tags: ['Frontend'],
      date: '2022/02/19',
      avatar: 'https://i.imgur.com/6jVNuDb.jpg',
    },
    {
      title:
        'An Extraordinary WebLG Has Been Released By Great China Scientists',
      image: 'https://i.imgur.com/AxItho4.png',
      shortDescription:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative director Alessandro Michele's, unique ability to combine the platform to only one",
      tags: ['Frontend'],
      date: '2022/02/19',
      avatar: 'https://i.imgur.com/6jVNuDb.jpg',
    },
    {
      title:
        'An Extraordinary WebLG Has Been Released By Great China Scientists',
      image: 'https://i.imgur.com/AxItho4.png',
      shortDescription:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative director Alessandro Michele's, unique ability to combine the platform to only one",
      tags: ['Frontend'],
      date: '2022/02/19',
      avatar: 'https://i.imgur.com/6jVNuDb.jpg',
    },
    {
      title:
        'An Extraordinary WebLG Has Been Released By Great China Scientists',
      image: 'https://i.imgur.com/AxItho4.png',
      shortDescription:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative director Alessandro Michele's, unique ability to combine the platform to only one",
      tags: ['Frontend'],
      date: '2022/02/19',
      avatar: 'https://i.imgur.com/6jVNuDb.jpg',
    },
    {
      title:
        'An Extraordinary WebLG Has Been Released By Great China Scientists',
      image: 'https://i.imgur.com/AxItho4.png',
      shortDescription:
        "Back in 2019, Gucci brought video games to its app with a new section called Gucci Arcade, inspired by creative director Alessandro Michele's, unique ability to combine the platform to only one",
      tags: ['Frontend'],
      date: '2022/02/19',
      avatar: 'https://i.imgur.com/6jVNuDb.jpg',
    },
  ];
}
