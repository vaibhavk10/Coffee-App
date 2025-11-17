import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoffeeDrink } from '../types/coffee';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.sampleapis.com/coffee/hot';

  getHotCoffees(): Observable<CoffeeDrink[]> {
    return this.http.get<CoffeeDrink[]>(this.baseUrl);
  }
}

