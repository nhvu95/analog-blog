import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {CreativeComponent} from "../components/creative/creative.component";
import {LayoutComponent} from "@shared";

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
