import { Component, Input, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzRateModule } from "ng-zorro-antd/rate";
import { FormsModule } from "@angular/forms";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NzIconModule } from "ng-zorro-antd/icon";

export interface BlogItem {
  tags: string[];
  title: string;
  shortDescription: string;
  date: string;
  image: string;
  avatar: string;
  role?: string;
}

@Component({
  selector: "app-blog-item",
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzRateModule,
    FormsModule,
    NzStatisticModule,
    NzIconModule
  ],
  templateUrl: "./blog-item.component.html",
  styleUrls: ["./blog-item.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BlogItemComponent {
  @Input() size: "small" | "large" = "small";
  @Input() content?: BlogItem;
}
