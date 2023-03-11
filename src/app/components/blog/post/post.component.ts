import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {ContentFile, MarkdownComponent} from "@analogjs/content";
import {Observable, take} from "rxjs";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzBackTopModule} from 'ng-zorro-antd/back-top';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {PostService} from "../../../shared/services/post.service";
import {CommentComponent} from "../comment/comment.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, NzTypographyModule, NzBackTopModule, NzButtonModule, NzIconModule, CommentComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class PostComponent implements OnInit {
  _localState = {like: false, comment: false};
  liked: boolean = false;
  commented: boolean = false;
  // @ts-ignore
  @Input() post$: Observable<ContentFile<any>>;

  constructor(private postServ: PostService) {
  }

  ngOnInit() {
    this.post$.pipe(take(1)).subscribe(res => {
      const state = localStorage.getItem(res.slug);
      if (state) {
        this._localState = JSON.parse(state);
        this.liked = this._localState.like;
        this.commented = this._localState.comment;
      }
      this.postServ.viewPost(res.slug).subscribe();
    });
  }

  likePost(slug: string): void {
    this.liked = !this.liked;
    this.postServ.likePost(slug, this.liked).subscribe(res => {
      this._localState.like = this.liked;
      localStorage.setItem(slug, JSON.stringify(this._localState));
    });
  }

  goToComment(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
