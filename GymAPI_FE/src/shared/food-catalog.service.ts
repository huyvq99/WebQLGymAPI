import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodCatalogService {

  constructor(private httpClient: HttpClient) {
  }

  public getFoodCatalogs() {
    return this.httpClient.get(
      `${environment.localDomain}/api/FoodCategories`
    );
  }

  public postFoodCategory(foodCategory: any) {
    return this.httpClient.post(
      `${environment.localDomain}/api/FoodCategories`, foodCategory
    );
  }

  public putFoodCategory(foodCategory: any) {
    return this.httpClient.put(
      `${environment.localDomain}/api/FoodCategories/${foodCategory.id}`, foodCategory
    );
  }

  public deleteFoodCategory(id: string) {
    return this.httpClient.delete(
      `${environment.localDomain}/api/FoodCategories/${id}`
    );
  }

}
