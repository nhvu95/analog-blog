import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {MenuItem} from "@models";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  template: `
      <nz-layout class="!bg-transparent block px-[118px] max-w-[1706px] mx-auto">
        <nz-header class="!h-[150px] !bg-transparent !px-0">
          <app-navbar [logo]="logo" [menus]="menus" [subLogos]="subLogos" class="mt-72"></app-navbar>
        </nz-header>
        <nz-content>
          <ng-content></ng-content>
        </nz-content>
        <nz-footer class="!bg-transparent"></nz-footer>
      </nz-layout>`,
  styles: [``],
  imports: [
    CommonModule,
    RouterOutlet,
    NzLayoutModule,
    NavigationBarComponent
  ],
  providers: [NzLayoutModule]
})
export class LayoutComponent implements OnInit {
  title = 'portfolio';
  logo = '/icons/favicon-196x196.png';
  subLogos: MenuItem[] = [
    {label: 'linkedin', link: `https://www.linkedin.com/in/nhvu95/`},
    {label: 'github', link: `https://github.com/nhvu95`},
  ];
  menus: MenuItem[] = [
    {label: 'About me', link: './about-me'},
    {label: 'Creative studio', link: './creative'},
    {label: 'Blog', link: './blog'},
    {label: 'My career', link: './career'},
  ];

  ok = false;
  constructor() {}

  ngOnInit(): void {
        this.ok = true;
    }
}
