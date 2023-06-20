import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AboutMeComponent} from "../components/about-me/about-me.component";
import {LayoutComponent} from "@shared";
import {RouteMeta} from "@analogjs/router";
import {provideContent, withMarkdownRenderer} from "@analogjs/content";

export const routeMeta: RouteMeta = {
  title: 'Vu Hieu Nguyen',
  meta: [{ name: 'description', content: 'Analog Blog Posts' }],
};

@Component({
  selector: 'app-blog-page',
  standalone: true,
  template: `
      <app-layout>
          <router-outlet></router-outlet>
      </app-layout>`,
  styles: [``],
  imports: [
    RouterOutlet,
    AboutMeComponent,
    LayoutComponent,
  ],
  providers: [
    provideContent(withMarkdownRenderer()),
  ]
})
export default class AboutMePageComponent {
}
