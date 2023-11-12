import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '@shared';
import { CareerComponent } from '../components/career/career.component';

@Component({
  selector: 'app-creative-page',
  standalone: true,
  template: `
    <app-layout>
      <app-career></app-career>
    </app-layout>
  `,
  styles: [``],
  imports: [RouterOutlet, LayoutComponent, CareerComponent],
  providers: [],
})
export default class CreativePageComponent {}
