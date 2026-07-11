import { AsyncPipe } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { TerminalLogService } from '../../services/terminal-log.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent implements AfterViewChecked {
  @ViewChild('logViewport') private logViewport?: ElementRef<HTMLElement>;
  readonly logs$ = this.terminalLog.logs$;

  constructor(private readonly terminalLog: TerminalLogService) {}

  ngAfterViewChecked(): void {
    const viewport = this.logViewport?.nativeElement;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }
}
