import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeService } from './services/coffee.service';
import { CoffeeDrink } from './types/coffee';
import { FallbackImageDirective } from './directives/fallback-image.directive';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FallbackImageDirective],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly coffeeService = inject(CoffeeService);

  protected readonly title = signal('Coffee Collective');
  protected readonly coffees = signal<CoffeeDrink[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);
  protected readonly fallbackImage = 'images/coffee-placeholder.svg';
  protected readonly currentYear = new Date().getFullYear();
  protected readonly totalCoffees = computed(() => this.coffees().length);
  protected readonly uniqueIngredients = computed(() => {
    const allIngredients = this.coffees().flatMap((coffee) => coffee.ingredients ?? []);
    return Array.from(new Set(allIngredients));
  });

  protected readonly featuredCoffee = computed(() => this.coffees()[0]);

  ngOnInit(): void {
    this.loadCoffees();
  }

  protected reload(): void {
    this.loadCoffees();
  }

  private loadCoffees(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.coffeeService.getHotCoffees().subscribe({
      next: (drinks) => {
        this.coffees.set(drinks);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
}
