import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MenuItem} from "@models";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  @Input() logo = '';
  @Input() menus: MenuItem[] = [];
  @Input() subLogos: MenuItem[] = [];
}
