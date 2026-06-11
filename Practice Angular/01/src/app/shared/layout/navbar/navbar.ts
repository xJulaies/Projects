import { Component, DOCUMENT, inject, Renderer2, signal } from '@angular/core';
import { Button } from '../../ui/atoms/button/button';

@Component({
  selector: 'app-navbar',
  imports: [Button],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly document = inject(DOCUMENT); // gets the document via inject
  private readonly renderer = inject(Renderer2); // sets DOM-attibute via inject

  protected readonly isProfileMenuOpen = signal(false); //useState
  protected readonly isMobileMenuOpen = signal(false);
  protected readonly isThemeLight = signal(false);

  protected toggleProfileMenu() {
    this.isProfileMenuOpen.update((isOpen) => !isOpen); //setState
  }

  protected toggleMobileMenu() {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  protected toggleTheme() {
    this.isThemeLight.update((isLight) => !isLight);
    const theme = this.isThemeLight() ? 'light' : 'dark';
    this.renderer.setAttribute(this.document.documentElement, 'data-theme', theme);
  }
}
