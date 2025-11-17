import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appFallbackImg]',
  standalone: true
})
export class FallbackImageDirective {
  @Input({ required: true }) appFallbackImg = '';

  private hasAppliedFallback = false;

  @HostListener('error', ['$event'])
  protected onError(event: Event): void {
    if (this.hasAppliedFallback || !this.appFallbackImg) {
      return;
    }

    const target = event.target as HTMLImageElement | null;

    if (!target) {
      return;
    }

    this.hasAppliedFallback = true;
    target.src = this.appFallbackImg;
  }
}

