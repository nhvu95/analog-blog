import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CreativeComponent} from "../components/creative/creative.component";
import {LayoutComponent} from "@shared";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTypographyModule} from "ng-zorro-antd/typography";

@Component({
  selector: 'app-creative-page',
  standalone: true,
  template: `
    <app-layout>
      <app-creative></app-creative>
    </app-layout>
  `,
  styles: [``],
  imports: [
    RouterOutlet,
    CreativeComponent,
    LayoutComponent
  ],
  providers: []
})
export default class CreativePageComponent {
}
