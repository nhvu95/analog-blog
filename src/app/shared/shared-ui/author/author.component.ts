import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule, NzAvatarModule],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss'],
})
export class AuthorComponent {
  // @Input() author: { avatar: string; nmae };
}
