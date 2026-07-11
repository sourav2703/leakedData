import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-vault-door',
  standalone: true,
  templateUrl: './vault-door.component.html',
  styleUrl: './vault-door.component.css'
})
export class VaultDoorComponent implements AfterViewInit, OnDestroy {
  @Output() complete = new EventEmitter<void>();
  @ViewChild('vaultScene', { static: true }) private sceneRef!: ElementRef<HTMLElement>;
  @ViewChild('leftPanel', { static: true }) private leftPanelRef!: ElementRef<HTMLElement>;
  @ViewChild('rightPanel', { static: true }) private rightPanelRef!: ElementRef<HTMLElement>;
  @ViewChild('wheel', { static: true }) private wheelRef!: ElementRef<HTMLElement>;

  unlocked = false;
  private timeline?: gsap.core.Timeline;

  constructor(private readonly audio: AudioService) {}

  ngAfterViewInit(): void {
    const scene = this.sceneRef.nativeElement;
    const left = this.leftPanelRef.nativeElement;
    const right = this.rightPanelRef.nativeElement;
    const wheel = this.wheelRef.nativeElement;

    this.timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => this.complete.emit()
    });

    this.timeline
      .from(scene, { scale: 1.16, opacity: 0, duration: 0.55, ease: 'power2.out' })
      .to(wheel, { rotate: 165, duration: 1.12, ease: 'back.inOut(1.4)' }, 0.42)
      .call(() => {
        this.unlocked = true;
        this.audio.play('unlock', 0.36);
      }, undefined, 1.35)
      .to('.scanner-line', { yPercent: 310, duration: 0.85, repeat: 1, yoyo: true, ease: 'sine.inOut' }, 0.62)
      .to('.smoke-particle', { opacity: 0.62, y: -70, x: 'random(-45, 45)', stagger: 0.055, duration: 1.1 }, 1.55)
      .call(() => this.audio.play('door-open', 0.4), undefined, 1.75)
      .to(left, { xPercent: -105, duration: 1.15 }, 1.85)
      .to(right, { xPercent: 105, duration: 1.15 }, 1.85)
      .to(scene, { scale: 1.42, filter: 'brightness(1.45)', duration: 1.15 }, 1.85)
      .to('.inside-light', { opacity: 1, scale: 1.4, duration: 1.05 }, 1.95);
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
  }
}
