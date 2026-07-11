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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, HeaderComponent, MatrixComponent, SidebarComponent, UserCardComponent],
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
  searchStep: 'idle' | 'challenge' | 'email' | 'done' = 'idle';
  searchMessage = '';
  private tweens: gsap.core.Tween[] = [];
  private resizeTimer?: number;

  constructor(userData: UserDataService, private readonly audio: AudioService) {
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

    this.selectedUser = null;
    this.daddyAnswer = '';
    this.requestEmail = '';
    this.searchStep = 'challenge';
    this.searchMessage = 'who is your daddy ? type sourav for view result.';
    this.audio.play('beep', 0.14);
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
    this.searchMessage = 'Submitted. This is a dummy request only.';
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
