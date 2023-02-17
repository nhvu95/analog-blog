import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuItem} from "@models";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NavigationBarComponent} from "../shared/shared-ui";
import { RouteMeta } from '@analogjs/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
      <nz-layout class="!bg-transparent">
          <nz-header class="!h-[150px] !bg-transparent !px-0">
              <app-navbar [logo]="logo" [menus]="menus" [subLogos]="subLogos" class="mt-72"></app-navbar>
          </nz-header>
          <nz-content>
              <router-outlet></router-outlet>
          </nz-content>
          <nz-footer class="!bg-transparent"></nz-footer>
      </nz-layout>`,
  styles: [``],
  imports: [
    RouterOutlet,
    NzLayoutModule,
    NavigationBarComponent,
  ],
  providers: []
})
export default class LayoutComponent {
  title = 'portfolio';
  logo = 'src/assets/icons/favicon-196x196.png';
  subLogos: MenuItem[] = [
    {label: 'linkedin', link: '/about-me'},
    {label: 'github', link: '/about-me'},
  ];
  menus: MenuItem[] = [
    {label: 'About me', link: '/about-me'},
    {label: 'Creative studio', link: '/creative'},
    {label: 'Blog', link: '/blog'},
    {label: 'My career', link: '/career'},
  ];
  constructor() {}
}
