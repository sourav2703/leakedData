import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime = '';
  private timer?: number;

  ngOnInit(): void {
    this.updateTime();
    this.timer = window.setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.timer);
  }

  private updateTime(): void {
    this.currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }
}
