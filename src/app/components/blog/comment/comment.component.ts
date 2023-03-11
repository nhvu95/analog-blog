import {AfterViewInit, Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzCommentModule} from "ng-zorro-antd/comment";
import {NzIconModule} from "ng-zorro-antd/icon";
import {formatDistance} from 'date-fns';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzListModule} from "ng-zorro-antd/list";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {ICommentInfo} from "../../../../server/models/comment.model";
import {NzInputModule} from "ng-zorro-antd/input";
import {CommentService} from "../../../shared/services/comment.service";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, NzCommentModule, NzInputModule, NzIconModule, NzAvatarModule, NzListModule, NzFormModule, FormsModule, NzButtonModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements AfterViewInit {
  @Input() slug!: string;
  data: ICommentInfo[] = [];
  submitting = false;
  inputValue = '';

  constructor(private commentService: CommentService) {
  }

  like(comment: ICommentInfo): void {
    if (comment.alreadyLike === undefined) {
      comment.liked ? comment.liked++ : comment.liked = 1;
      comment.alreadyLike = true;
      this.likeOrDislike(comment);
    } else if (!comment.alreadyLike) {
      comment.liked ? comment.liked++ : comment.liked = 1;
      comment.disliked ? comment.disliked-- : comment.disliked = 0;
      comment.alreadyLike = true;
      this.likeOrDislike(comment);
    }
  }

  dislike(comment: ICommentInfo): void {
    if (comment.alreadyLike === undefined) {
      comment.disliked ? comment.disliked++ : comment.disliked = 1;
      comment.alreadyLike = false;
      this.likeOrDislike(comment);
    } else if (comment.alreadyLike) {
      comment.liked ? comment.liked-- : comment.liked = 0;
      comment.disliked ? comment.disliked++ : comment.disliked = 1;
      comment.alreadyLike = false;
      this.likeOrDislike(comment);
    }
  }

  ngAfterViewInit() {
    this.commentService.getAllComment(this.slug).subscribe(async res => {
      res.forEach(res => {
        if (res.createdAt) {
          res.createdAt = formatDistance(new Date(), new Date(res.createdAt));
        }
      });
      this.data = [];
      this.data.push(...res);
    })
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    this.commentService.comment({slug: this.slug, content}).subscribe(res => {
      this.submitting = false;
      this.ngAfterViewInit();
    });
  }
  likeOrDislike(comment: ICommentInfo): void {
    this.commentService.likeComment(comment).subscribe();
  }
}
