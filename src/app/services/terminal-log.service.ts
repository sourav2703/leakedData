import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, map, scan, startWith } from 'rxjs';

export interface TerminalLog {
  time: string;
  text: string;
  tone: 'normal' | 'warn' | 'accent';
}

@Injectable({ providedIn: 'root' })
export class TerminalLogService {
  private readonly messages = [
    'Decrypting secure sector...',
    'Connected',
    'Fetching records...',
    'Packet received',
    'Firewall bypassed',
    'Loading profiles...',
    'Accessing database...',
    'Rotating access key',
    'Scanning biometric echo',
    'Node handshake accepted',
    'Trace route masked',
    'Mirror tunnel synchronized'
  ];

  private readonly seed$ = new BehaviorSubject<TerminalLog>(this.createLog('Terminal stream initialized', 'accent'));

  readonly logs$ = interval(1800).pipe(
    startWith(-1),
    map(() => this.randomLog()),
    scan<TerminalLog, TerminalLog[]>((logs, log) => [...logs.slice(-48), log], [this.seed$.value])
  );

  private randomLog(): TerminalLog {
    const message = this.messages[Math.floor(Math.random() * this.messages.length)] ?? 'Packet received';
    const tone = Math.random() > 0.84 ? 'warn' : Math.random() > 0.68 ? 'accent' : 'normal';
    return this.createLog(message, tone);
  }

  private createLog(text: string, tone: TerminalLog['tone']): TerminalLog {
    return {
      time: new Date().toLocaleTimeString([], { hour12: false }),
      text,
      tone
    };
  }
}
