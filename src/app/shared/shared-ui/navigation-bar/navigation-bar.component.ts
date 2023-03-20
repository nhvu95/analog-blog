import {Component, Inject, Input, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {MenuItem} from "@models";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationBarComponent {
  @Input() logo = '';
  @Input() menus: MenuItem[] = [];
  @Input() subLogos: MenuItem[] = [];


  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }
  openLink(link: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.open(link);
    }
  }
}
