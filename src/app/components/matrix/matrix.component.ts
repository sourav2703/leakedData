import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-matrix',
  standalone: true,
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.css'
})
export class MatrixComponent implements AfterViewInit, OnDestroy {
  @Input() density = 1;
  @Input() opacity = 0.32;
  @Input() compact = false;
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationId = 0;
  private columns: number[] = [];
  private readonly glyphs = '01<>/{}[]$#ACCESSROOTNODEVAULT';

  constructor(
    private readonly zone: NgZone,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.resize();
      window.addEventListener('resize', this.resize);
      this.draw();
    });
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.resize);
  }

  private readonly resize = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    const fontSize = this.compact ? 13 : 17;
    const count = Math.ceil(canvas.width / (fontSize * ratio));
    this.columns = Array.from({ length: count }, () => Math.random() * canvas.height);
  };

  private draw = (): void => {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const ratio = window.devicePixelRatio || 1;
    const fontSize = (this.compact ? 13 : 17) * ratio;
    ctx.fillStyle = `rgba(2, 2, 2, ${this.compact ? 0.18 : 0.11})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

    this.columns.forEach((y, index) => {
      const glyph = this.glyphs[Math.floor(Math.random() * this.glyphs.length)] ?? '0';
      const x = index * fontSize;
      const bright = Math.random() > 0.94;
      ctx.fillStyle = bright ? 'rgba(216,255,232,.95)' : `rgba(0,255,136,${this.opacity})`;
      ctx.shadowBlur = bright ? 12 : 3;
      ctx.shadowColor = '#00ff88';
      ctx.fillText(glyph, x, y);

      const speed = (fontSize * (0.38 + Math.random() * 0.34)) * this.density;
      this.columns[index] = y > canvas.height + Math.random() * 800 ? 0 : y + speed;
    });

    this.animationId = window.requestAnimationFrame(this.draw);
  };
}
