import { Component } from '@angular/core';
import { TerminalComponent } from '../terminal/terminal.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TerminalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly nodes = ['DEL', 'MUM', 'BLR', 'HYD', 'PUN', 'CHE'];
}
