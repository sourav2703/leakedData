import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const fadeScale = trigger('fadeScale', [
  transition(':enter', [
    animate('520ms cubic-bezier(.2,.8,.2,1)', keyframes([
      style({ opacity: 0, transform: 'scale(.98)', offset: 0 }),
      style({ opacity: 1, transform: 'scale(1.01)', offset: 0.72 }),
      style({ opacity: 1, transform: 'scale(1)', offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate('360ms ease-in', style({ opacity: 0, transform: 'scale(1.04)' }))
  ])
]);
