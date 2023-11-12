import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';

export type TopicFilterItem = { value: string; label: string };

@Component({
  selector: 'app-topic-filter',
  standalone: true,
  imports: [CommonModule, NzRadioModule, FormsModule],
  templateUrl: './topic-filter.component.html',
  styleUrls: ['./topic-filter.component.scss'],
})
export class TopicFilterComponent {
  @Input() topics: TopicFilterItem[] = [];
  @Output() output = new EventEmitter<string>();
  radioValue = 'All';
}
