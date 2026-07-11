import { Injectable } from '@angular/core';

type SoundName = 'typing' | 'unlock' | 'door-open' | 'beep' | 'hover' | 'ambient';

@Injectable({ providedIn: 'root' })
export class AudioService {
  enabled = false;
  private ambient?: HTMLAudioElement;

  play(name: SoundName, volume = 0.28): void {
    if (!this.enabled) {
      return;
    }

    const audio = new Audio(`assets/sounds/${name}.mp3`);
    audio.volume = volume;
    audio.play().catch(() => undefined);
  }

  startAmbient(): void {
    if (!this.enabled || this.ambient) {
      return;
    }

    this.ambient = new Audio('assets/sounds/ambient.mp3');
    this.ambient.loop = true;
    this.ambient.volume = 0.14;
    this.ambient.play().catch(() => undefined);
  }
}
