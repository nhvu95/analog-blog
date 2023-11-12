import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, NzTimelineModule, NzBackTopModule, NzIconModule],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
})
export class CareerComponent {}
