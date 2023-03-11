import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AboutMeComponent} from "../components/about-me/about-me.component";
import {LayoutComponent} from "@shared";

@Component({
  selector: 'app-about-me-page',
  standalone: true,
  template: `
    <app-layout>
        <app-about-me></app-about-me>
    </app-layout>`,
  styles: [``],
  imports: [
    RouterOutlet,
    AboutMeComponent,
    LayoutComponent,
  ],
  providers: []
})
export default class AboutMePageComponent {
}
