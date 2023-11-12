import {
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe, isPlatformBrowser, NgIf } from '@angular/common';
import { ContentFile, MarkdownComponent } from '@analogjs/content';
import { Observable, take } from 'rxjs';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PostService } from '../../../shared/services/post.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    NgIf,
    NzTypographyModule,
    NzBackTopModule,
    NzButtonModule,
    NzIconModule,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class PostComponent implements OnInit {
  _localState = { like: false, comment: false };
  liked: boolean = false;
  commented: boolean = false;
  // @ts-ignore
  @Input() post$: Observable<ContentFile<any>>;

  constructor(
    private postServ: PostService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit() {
    this.post$.pipe(take(1)).subscribe((res) => {
      if (isPlatformBrowser(this.platformId)) {
        const state = localStorage.getItem(res.slug);
        if (state) {
          this._localState = JSON.parse(state);
          this.liked = this._localState.like;
          this.commented = this._localState.comment;
        }
      }
      this.postServ.viewPost(res.slug).subscribe();
    });
  }

  likePost(slug: string): void {
    this.liked = !this.liked;
    this.postServ.likePost(slug, this.liked).subscribe((res) => {
      this._localState.like = this.liked;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(slug, JSON.stringify(this._localState));
      }
    });
  }

  goToComment(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }
}
