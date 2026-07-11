import { Component, HostListener } from '@angular/core';
import { BootScreenComponent } from './components/boot-screen/boot-screen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VaultDoorComponent } from './components/vault-door/vault-door.component';
import { fadeScale } from './shared/cyber-animations';

type AppStage = 'boot' | 'vault' | 'dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BootScreenComponent, VaultDoorComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeScale]
})
export class AppComponent {
  stage: AppStage = 'boot';
  cursorX = 0;
  cursorY = 0;
  glitching = false;

  constructor() {
    window.setInterval(() => this.triggerGlitch(), 20000);
  }

  @HostListener('window:mousemove', ['$event'])
  trackMouse(event: MouseEvent): void {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
  }

  showVault(): void {
    this.stage = 'vault';
  }

  showDashboard(): void {
    this.stage = 'dashboard';
  }

  private triggerGlitch(): void {
    this.glitching = true;
    window.setTimeout(() => {
      this.glitching = false;
    }, 420);
  }
}
