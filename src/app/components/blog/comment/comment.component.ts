import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { formatDistance } from 'date-fns';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ICommentInfo } from '../../../../server/models/comment.model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommentService } from '../../../shared/services/comment.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    NzCommentModule,
    NzInputModule,
    NzIconModule,
    NzAvatarModule,
    NzListModule,
    NzFormModule,
    FormsModule,
    NzButtonModule,
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentComponent implements AfterViewInit {
  @Input() slug!: string;
  data: ICommentInfo[] = [];
  submitting = false;
  inputValue = '';

  constructor(
    private commentService: CommentService,
    private cdr: ChangeDetectorRef
  ) {}

  like(comment: ICommentInfo): void {
    this.likeOrDislike(comment);
    comment.alreadyLike = !comment.alreadyLike;
  }

  dislike(comment: ICommentInfo): void {
    this.likeOrDislike(comment, true);
    comment.alreadyDislike = !comment.alreadyDislike;
  }

  ngAfterViewInit() {
    this.commentService.getAllComment(this.slug).subscribe(async (res) => {
      res.forEach((res) => {
        if (res.createdAt) {
          res.createdDayAgo = formatDistance(
            new Date(),
            new Date(res.createdAt)
          );
        }
      });
      this.data = [];
      this.data.push(...res);
    });
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.commentService
      .comment({ slug: this.slug, content })
      .subscribe((res) => {
        this.submitting = false;
        this.ngAfterViewInit();
      });
  }

  likeOrDislike(comment: ICommentInfo, dislike = false): void {
    const oldComment = comment;
    if (!dislike)
      this.commentService.likeComment(comment).subscribe((res) => {
        comment.liked = res.liked;
        comment.disliked = res.disliked ?? 0;
      });
    else
      this.commentService.dislikeComment(comment).subscribe((res) => {
        comment.liked = res.liked;
        comment.disliked = res.disliked ?? 0;
      });
  }
}
