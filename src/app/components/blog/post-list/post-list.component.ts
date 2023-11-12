import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  SearchBarComponent,
  TopicFilterComponent,
} from '@shared';
import { PostListItemComponent } from '../post-list-item/post-list-item.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { injectContentFiles } from '@analogjs/content';
import { PostMetadata } from '@models';
import { PostService } from '../../../shared/services/post.service';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SearchBarComponent,
    TopicFilterComponent,
    PostListItemComponent,
    NzFormModule,
    NzGridModule,
    NzBackTopModule,
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostListComponent implements OnInit {
  topicList = [
    { value: 'All', label: 'All' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Did I Miss', label: 'Did I Miss' },
    { value: 'ZeroCode', label: 'ZeroCode' },
    { value: 'Today I Learned', label: 'Today I Learned' },
  ];
  readonly posts = injectContentFiles<PostMetadata>();
  headPost: PostMetadata | null = null;
  postList: PostMetadata[] = [];
  postInfos: Map<String, { [name: string]: any }> = new Map<
    String,
    { [name: string]: any }
  >();
  currentSearch = '';
  currentFilter = '';

  constructor(private postServ: PostService) {}

  ngOnInit(): void {
    this.postServ.getAll().subscribe((res) => {
      res.forEach((p) => this.postInfos.set(p.slug, p));
      this.search();
    });
    this.search();
  }

  /**
   * Search Post
   */
  search(): void {
    const searchContent = this.currentSearch.trim().toLowerCase();
    const filterContent = this.currentFilter.trim().toLowerCase();
    const mPost = this.posts
      .map((post) => post?.attributes)
      .filter((post) =>
        post && this.currentSearch
          ? post.title.toLowerCase().includes(searchContent)
          : true
      )
      .filter((post) =>
        post && this.currentFilter && this.currentFilter !== 'All'
          ? post.tags.findIndex((tag) => tag.toLowerCase() === filterContent) >=
            0
          : true
      )
      .sort((postA, postB) => {
        const pre = postA.priority - postB.priority;
        if (pre != 0) return pre;
        else
          return new Date(postA?.date_end).getTime() -
            new Date(postB?.date_end).getTime() <
            0
            ? 1
            : -1;
      })
      .map((post) => {
        if (this.postInfos.has(post.slug)) {
          const val = this.postInfos.get(post.slug);
          post = { ...post, ...val };
        } else {
          post = { ...post, ...{ liked: 0, comment: 0, read: 0 } };
        }
        return post;
      });
    this.headPost = mPost[0];
    this.postList = mPost.slice(1);
  }
}
