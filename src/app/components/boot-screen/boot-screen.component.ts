import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatrixComponent } from '../matrix/matrix.component';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-boot-screen',
  standalone: true,
  imports: [MatrixComponent],
  templateUrl: './boot-screen.component.html',
  styleUrl: './boot-screen.component.css',
  animations: [
    trigger('lineReveal', [
      transition('* => *', [
        query('.terminal-line', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(120, animate('260ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class BootScreenComponent implements OnInit, OnDestroy {
  @Output() complete = new EventEmitter<void>();

  readonly messages = [
    'Whatsapp Group Data...',
    'Connecting Secure Network...',
    'Authentication Success',
    'ACCESS GRANTED'
  ];

  typedLines: string[] = [];
  activeLine = '';
  progress = 0;
  private lineIndex = 0;
  private charIndex = 0;
  private timer?: number;
  private progressTimer?: number;

  constructor(private readonly audio: AudioService) {}

  ngOnInit(): void {
    this.audio.play('typing', 0.18);
    this.typeNextCharacter();
    this.progressTimer = window.setInterval(() => {
      this.progress = Math.min(100, this.progress + 2.2);
    }, 105);
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.timer);
    window.clearInterval(this.progressTimer);
  }

  private typeNextCharacter(): void {
    const line = this.messages[this.lineIndex];
    if (!line) {
      this.progress = 100;
      this.timer = window.setTimeout(() => this.complete.emit(), 650);
      return;
    }

    this.activeLine = line.slice(0, this.charIndex + 1);
    this.charIndex += 1;

    if (this.charIndex >= line.length) {
      this.typedLines = [...this.typedLines, line];
      this.activeLine = '';
      this.lineIndex += 1;
      this.charIndex = 0;
      this.timer = window.setTimeout(() => this.typeNextCharacter(), this.lineIndex === this.messages.length ? 180 : 330);
      return;
    }

    const speed = line === 'ACCESS GRANTED' ? 38 : 22 + Math.random() * 28;
    this.timer = window.setTimeout(() => this.typeNextCharacter(), speed);
  }
}
