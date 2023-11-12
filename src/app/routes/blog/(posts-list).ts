import { Component } from '@angular/core';
import { PostListComponent } from '../../components/blog/post-list/post-list.component';

@Component({
  selector: 'app-post-list-page',
  standalone: true,
  template: ` <app-post-list></app-post-list>`,
  styles: [``],
  imports: [PostListComponent],
  providers: [],
})
export default class PostsListComponent {}
