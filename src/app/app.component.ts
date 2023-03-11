import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styles: [``],
})
export class AppComponent {
}
