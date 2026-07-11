import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VaultUser } from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input({ required: true }) user!: VaultUser;
  @Output() readonly selected = new EventEmitter<VaultUser>();

  select(): void {
    this.selected.emit(this.user);
  }
}
