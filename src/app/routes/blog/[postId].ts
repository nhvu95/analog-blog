import {Component} from '@angular/core';
import {PostComponent} from "../../components/blog/post/post.component";
import {injectContent, MarkdownComponent} from "@analogjs/content";
import {CommonModule} from "@angular/common";

import {postMetaResolver, postTitleResolver} from './resolvers';
import {RouteMeta} from "@analogjs/router";
import {PostMetadata} from "@models";
import {PostService} from "../../shared/services/post.service";

export const routeMeta: RouteMeta = {
  title: postTitleResolver,
  meta: postMetaResolver,
};

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  template: `
    <app-post [post$]="post$"></app-post>
  `,
  styles: [``],
  imports: [
    CommonModule,
    PostComponent,
    MarkdownComponent
  ],
  providers: [PostService]
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostMetadata>("postId");
}
