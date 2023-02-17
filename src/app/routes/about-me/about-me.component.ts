import { Component, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: "app-about-me",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NzAvatarModule,
    NzGridModule,
    NzTypographyModule,
    NzIconModule,
    NzButtonModule,
    NzStatisticModule
  ],
  templateUrl: "./about-me.component.html",
  styleUrls: ["./about-me.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export default class AboutMeComponent {
  years = new Date().getFullYear() - 2018;
}
