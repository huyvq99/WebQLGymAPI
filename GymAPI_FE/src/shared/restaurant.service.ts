import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) {
  }

  public getRestaurantByAreaId(id: string) {
    return this.httpClient.get(
      `${environment.localDomain}/api/Restaurants/area/${id}`
    );
  }
}
