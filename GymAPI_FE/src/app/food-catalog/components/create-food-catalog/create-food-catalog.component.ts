import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaService } from 'src/shared/area.service';
import { FoodCatalogService } from 'src/shared/food-catalog.service';
import { RestaurantService } from 'src/shared/restaurant.service';

@Component({
  selector: 'app-create-food-catalog',
  templateUrl: './create-food-catalog.component.html',
  styleUrls: ['./create-food-catalog.component.scss']
})
export class CreateFoodCatalogComponent implements OnInit {

  public foodCatalog = {
    name: '',
    restaurantId: '',
    isDeleted: false,
    status: 1
  }

  public areas = [];
  public restaurants = [];

  public selectedArea = null;
  public selectedRestaurant = null;

  constructor(
    public dialogRef: MatDialogRef<CreateFoodCatalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodCatalogService: FoodCatalogService,
    private areaService: AreaService,
    private restaurantService: RestaurantService,
  ) {
    this.getAllArea();
  }

  ngOnInit() {
  }

  public createFoodCatalog() {

    this.foodCatalog.restaurantId = this.selectedRestaurant;

      this.foodCatalogService.postFoodCategory(this.foodCatalog).subscribe((response: any) => {
        alert('Thêm mới thành công danh mục món ăn');
        this.dialogRef.close(true);
      }, (error) => {
        alert('Thêm mới không thành công danh mục món ăn');
      });
  }

  public getAllArea() {
    this.areaService.getAreas().subscribe((response: any) => {
      if (response) {
        this.areas = response;
        this.selectedArea = this.areas[0].id;
        this.getRestaurantsByArea(this.selectedArea);
      }
    }, (error) => {
      this.areas = [];
      this.selectedArea = null;
    });
  }

  public getRestaurantsByArea(areaId: string) {
    this.restaurantService.getRestaurantByAreaId(areaId).subscribe((response: any) => {
      if (response) {
        this.restaurants = response;
        this.selectedRestaurant = this.restaurants[0].id;
      }
    }, (error) => {
      this.restaurants = [];
    });
  }

  public changeArea(areaId: string) {
    this.getRestaurantsByArea(areaId);
  }
}
