import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [ngClass]="['animate-pulse bg-gray-200 rounded', className]" 
         [style.width]="width" 
         [style.height]="height">
    </div>
  `,
    styles: []
})
export class SkeletonLoaderComponent {
    @Input() width: string = '100%';
    @Input() height: string = '20px';
    @Input() className: string = '';
}
