import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NzCardModule } from "ng-zorro-antd/card";
import { Project_ } from "./project.model";

@Component({
  selector: 'app-ws-creative-item',
  standalone: true,
  imports: [CommonModule, NzCardModule],
  templateUrl: './creative-item.component.html',
  styleUrls: ['./creative-item.component.scss'],
})
export class CreativeItemComponent {
  @Input() content!: Project_;
}
