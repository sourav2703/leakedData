import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { HeaderComponent } from '../header/header.component';
import { MatrixComponent } from '../matrix/matrix.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { VaultUser } from '../../models/user.model';
import { UserDataService } from '../../services/user-data.service';
import { AudioService } from '../../services/audio.service';
import { LeakOsintService } from 'src/app/services/leak-osint.service';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, HeaderComponent, MatrixComponent, SidebarComponent, UserCardComponent,KeyValuePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('cardShell') private cardShells!: QueryList<ElementRef<HTMLElement>>;
  readonly users: VaultUser[];
  readonly codeSnippets = ['root.access()', 'packet://443', 'AES-256', '0x7AF19B', 'sudo trace --mask', 'AUTH_OK'];
  selectedUser: VaultUser | null = null;
  searchMobile = '';
  daddyAnswer = '';
  requestEmail = '';
  searchResult: any = null;
  searchStep: 'idle' | 'challenge' | 'email' | 'done' = 'idle';
  searchMessage = '';
  couponCode = '';
  activeCoupon = '';
  couponMessage = '';
  isCheckingCoupon = false;
  showPaymentPanel = false;
  readonly requestLimit = 3;
  readonly paymentQr = 'assets/images/qr.jpg';
  private tweens: gsap.core.Tween[] = [];
  private resizeTimer?: number;
  private readonly usedCouponStorageKey = 'cyber-vault-used-coupons';

  constructor(userData: UserDataService, private readonly audio: AudioService, private leakService: LeakOsintService
  ) {
    this.users = userData.getUsers();
  }

  ngAfterViewInit(): void {
    this.audio.startAmbient();
    window.setTimeout(() => this.animateCards(), 0);
    window.addEventListener('resize', this.handleResize);
  }

  ngOnDestroy(): void {
    this.tweens.forEach((tween) => tween.kill());
    window.clearTimeout(this.resizeTimer);
    window.removeEventListener('resize', this.handleResize);
  }

  cardLeft(index: number): string {
    const lanes = [7, 23, 39, 56, 72, 15, 48, 80];
    return `${lanes[index % lanes.length]}%`;
  }

  get resultDatabaseCount(): number {
    return this.searchResult?.List ? Object.keys(this.searchResult.List).length : 0;
  }


 

  getValue(value: any): any {
  return value;
}


  selectUser(user: VaultUser): void {
    this.selectedUser = user;
    this.audio.play('beep', 0.16);
  }

  clearSelectedUser(): void {
    this.selectedUser = null;
  }

  startMobileSearch(): void {
    if (!this.searchMobile.trim()) {
      this.searchStep = 'idle';
      this.searchMessage = 'Enter mobile number to begin search.';
      return;
    }


    this.showPaymentPanel = true;
    this.couponMessage = 'Coupon used. Pay Rs. 10 and enter a new coupon for another search.';
    this.searchResult = null;
    this.leakService.search(this.searchMobile).subscribe({

      next: (res) => {

        console.log(res);

        this.searchResult = res;

        this.searchMessage = '';
       
        this.showPaymentPanel = true;

      },

      error: (err) => {

        console.error(err);

        this.searchMessage = 'Search failed.';
      }

    });

    this.selectedUser = null;

    this.audio.play('beep', 0.14);
  }

  exportResultsAsPdf(): void {
    if (!this.searchResult?.List) {
      this.searchMessage = 'No result data available to export.';
      return;
    }

    const reportWindow = window.open('', '_blank', 'width=1100,height=800');
    if (!reportWindow) {
      this.searchMessage = 'Please allow popups to export PDF.';
      return;
    }

    reportWindow.document.open();
    reportWindow.document.write(this.buildPdfReport());
    reportWindow.document.close();
    reportWindow.focus();
    window.setTimeout(() => reportWindow.print(), 350);
  }

  verifyDaddyAnswer(): void {
    if (this.daddyAnswer.trim().toLowerCase() !== 'sourav') {
      this.searchMessage = 'Wrong answer. Type sourav for view result.';
      return;
    }

    this.searchStep = 'email';
    this.searchMessage = 'Will give you email, please provide email.';
    this.audio.play('beep', 0.14);
  }

  submitDummyEmail(): void {
    if (!this.requestEmail.trim()) {
      this.searchMessage = 'Please provide email.';
      return;
    }

    this.searchStep = 'done';
    this.searchMessage = 'Submitted. wait few moments.';
    this.audio.play('beep', 0.14);
  }

  @HostListener('window:keydown.escape')
  closeOnEscape(): void {
    this.clearSelectedUser();
  }

  private readonly handleResize = (): void => {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => this.animateCards(), 180);
  };



 


  private buildPdfReport(): string {
    const query = this.escapeHtml(this.searchMobile || 'Unknown query');
    const generatedAt = this.escapeHtml(new Date().toLocaleString());
    const databases = Object.entries(this.searchResult.List ?? {});
    const cards = databases.map(([name, value]) => this.buildPdfDatabaseCard(name, value)).join('');

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Leak Report - ${query}</title>
  <style>
    @page { margin: 16mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #020806;
      color: #d8ffe8;
      font-family: "Segoe UI", Arial, sans-serif;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }
    .report {
      min-height: 100vh;
      padding: 28px;
      background:
        radial-gradient(circle at 15% 0%, rgba(0, 255, 136, 0.18), transparent 35%),
        linear-gradient(180deg, #020806, #06100c);
    }
    .report-header {
      padding: 20px;
      border: 1px solid rgba(0, 255, 136, 0.45);
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.48);
      margin-bottom: 18px;
    }
    .eyebrow {
      color: #3ae7ff;
      font-size: 12px;
      text-transform: uppercase;
    }
    h1 {
      margin: 8px 0 12px;
      color: #00ff88;
      font-size: 30px;
      line-height: 1.05;
      text-transform: uppercase;
    }
    .meta {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      color: rgba(216, 255, 232, 0.72);
      font-size: 13px;
    }
    .db-card {
      break-inside: avoid;
      margin-bottom: 16px;
      border: 1px solid rgba(0, 255, 136, 0.42);
      border-radius: 8px;
      overflow: hidden;
      background: rgba(8, 18, 13, 0.94);
    }
    .db-header {
      padding: 14px 16px;
      border-bottom: 1px solid rgba(0, 255, 100, 0.22);
      background: rgba(0, 0, 0, 0.3);
    }
    h2 {
      margin: 0 0 6px;
      color: #00ff88;
      font-size: 18px;
    }
    .db-header p {
      margin: 0;
      color: rgba(216, 255, 232, 0.72);
      font-size: 13px;
      line-height: 1.45;
    }
    .record-card {
      margin: 12px;
      border: 1px solid rgba(0, 255, 120, 0.16);
      border-radius: 8px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.24);
      break-inside: avoid;
    }
    .field-row {
      display: grid;
      grid-template-columns: 190px minmax(0, 1fr);
      border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
      font-size: 12px;
    }
    .field-row:last-child { border-bottom: 0; }
    .field-name,
    .field-value {
      padding: 8px 10px;
      overflow-wrap: anywhere;
    }
    .field-name {
      color: #00ff88;
      font-weight: 700;
      background: rgba(0, 255, 136, 0.06);
    }
    .field-value { color: #ffffff; }
  </style>
</head>
<body>
  <main class="report">
    <header class="report-header">
      <div class="eyebrow">Connected to Secure Server</div>
      <h1>Leaked Details Report</h1>
      <div class="meta">
        <div><strong>Query:</strong> ${query}</div>
        <div><strong>Generated:</strong> ${generatedAt}</div>
        <div><strong>Sources:</strong> ${databases.length}</div>
        <div><strong>Format:</strong> PDF Export</div>
      </div>
    </header>
    ${cards}
  </main>
</body>
</html>`;
  }

  private buildPdfDatabaseCard(name: string, value: unknown): string {
    const source = value as { InfoLeak?: unknown; Data?: Array<Record<string, unknown>> };
    const infoLeak = this.escapeHtml(this.formatPdfValue(source.InfoLeak ?? 'No leak information available'));
    const rows = Array.isArray(source.Data) ? source.Data : [];
    const recordCards = rows.map((row) => {
      const fields = Object.entries(row).map(([fieldName, fieldValue]) => `
        <div class="field-row">
          <div class="field-name">${this.escapeHtml(fieldName)}</div>
          <div class="field-value">${this.escapeHtml(this.formatPdfValue(fieldValue))}</div>
        </div>`).join('');

      return `<section class="record-card">${fields}</section>`;
    }).join('');

    return `<article class="db-card">
      <header class="db-header">
        <h2>${this.escapeHtml(name)}</h2>
        <p>${infoLeak}</p>
      </header>
      ${recordCards || '<section class="record-card"><div class="field-row"><div class="field-name">Status</div><div class="field-value">No records found</div></div></section>'}
    </article>`;
  }

  private formatPdfValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private animateCards(): void {
    this.tweens.forEach((tween) => tween.kill());
    this.tweens = [];

    const height = window.innerHeight;
    this.cardShells.forEach((shell, index) => {
      const el = shell.nativeElement;
      const duration = 16 + (index % 4) * 2.4 + Math.random() * 2;
      const rotation = index % 2 === 0 ? -4 - index * 0.3 : 4 + index * 0.22;
      const tween = gsap.fromTo(el, {
        y: height + 180,
        opacity: 0,
        scale: 0.86,
        rotate: rotation
      }, {
        y: -260,
        opacity: 1,
        scale: 1,
        rotate: -rotation * 0.4,
        duration,
        repeat: -1,
        ease: 'none',
        onRepeat: () => {
          gsap.set(el, { opacity: 0.16, scale: 0.88 + Math.random() * 0.14 });
        }
      });
      tween.progress(index / this.users.length);
      this.tweens.push(tween);
    });
  }
}
