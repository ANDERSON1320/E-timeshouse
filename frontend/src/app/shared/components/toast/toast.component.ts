import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Toast } from '../../../core/services/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of notificationService.toasts$ | async"
           class="toast"
           [ngClass]="toast.type"
           @toastAnimation>
        <div class="toast-content">
          <span class="message">{{ toast.message }}</span>
          <button class="close-btn" (click)="remove(toast.id)">&times;</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .toast {
      min-width: 300px;
      padding: 15px;
      border-radius: 8px;
      background: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-left: 5px solid #ccc;
      color: #333;
    }
    .toast.success { border-left-color: #2ecc71; }
    .toast.error { border-left-color: #e74c3c; }
    .toast.info { border-left-color: #3498db; }
    .toast.warning { border-left-color: #f1c40f; }
    
    .toast-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #999;
    }
    .close-btn:hover {
      color: #333;
    }
  `],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent {
  constructor(public notificationService: NotificationService) { }

  remove(id: number): void {
    this.notificationService.remove(id);
  }
}
