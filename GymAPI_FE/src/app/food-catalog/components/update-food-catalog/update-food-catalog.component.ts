import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaService } from 'src/shared/area.service';
import { FoodCatalogService } from 'src/shared/food-catalog.service';
import { RestaurantService } from 'src/shared/restaurant.service';

@Component({
  selector: 'app-update-food-catalog',
  templateUrl: './update-food-catalog.component.html',
  styleUrls: ['./update-food-catalog.component.scss']
})
export class UpdateFoodCatalogComponent implements OnInit {

  public foodCatalog = {
    id: '',
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
    public dialogRef: MatDialogRef<UpdateFoodCatalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private foodCatalogService: FoodCatalogService,
    private areaService: AreaService,
    private restaurantService: RestaurantService,
  ) {
    this.getAllArea();
    this.foodCatalog.name = data.foodCatalog.name;
    this.foodCatalog.restaurantId = data.foodCatalog.restaurantId;
    this.selectedRestaurant = this.foodCatalog.restaurantId;
    this.foodCatalog.id = data.foodCatalog.id;
    this.foodCatalog.status = data.foodCatalog.status;
    this.foodCatalog.isDeleted = data.foodCatalog.isDeleted;
  }

  ngOnInit() {
  }

  public updateFoodCatalog() {

    this.foodCatalog.restaurantId = this.selectedRestaurant;
    this.foodCatalogService.putFoodCategory(this.foodCatalog).subscribe((response: any) => {
      alert('Cập nhật thành công danh mục món ăn');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Cập nhật không thành công danh mục món ăn');
    });
  }

  public getAllArea() {
    this.areaService.getAreas().subscribe((response: any) => {
      if (response) {
        this.areas = response;
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
