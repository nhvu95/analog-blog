import {AfterViewInit, Component, Input, ViewEncapsulation} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzRateModule} from "ng-zorro-antd/rate";
import {FormsModule} from "@angular/forms";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzIconModule} from "ng-zorro-antd/icon";
import {RouterLink} from "@angular/router";
import {PostMetadata} from "@models";
import {PostService} from "../../../shared/services/post.service";

@Component({
  selector: "app-post-list-item",
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzRateModule,
    FormsModule,
    NzStatisticModule,
    NzIconModule,
    RouterLink
  ],
  templateUrl: "./post-list-item.component.html",
  styleUrls: ["./post-list-item.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class PostListItemComponent implements AfterViewInit {
  @Input() size: "small" | "large" = "small";
  @Input() content?: PostMetadata;
  _localState = {like: false, comment: false};
  liked = false;
  commented = false;
  constructor(public postServ: PostService) {

  }
  likePost(slug: string) {
    this.postServ.likePost(slug, !this.liked).subscribe(res => {
      this.liked = !this.liked;
      this.liked ? this.content!.liked++ : this.content!.liked--;
      this._localState.like = this.liked;
      localStorage.setItem(slug, JSON.stringify(this._localState));
    })
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if(!this.content) return;
      const state = localStorage.getItem(this.content.slug);
      if (state) {
        this._localState = JSON.parse(state);
        this.liked = this._localState.like;
        this.commented = this._localState.comment;
      }
    },0 );
  }
}
