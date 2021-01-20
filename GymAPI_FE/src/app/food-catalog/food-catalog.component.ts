import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FoodCatalogService } from 'src/shared/food-catalog.service';
import { CreateFoodCatalogComponent } from './components/create-food-catalog/create-food-catalog.component';
import { UpdateFoodCatalogComponent } from './components/update-food-catalog/update-food-catalog.component';

@Component({
  selector: 'app-food-catalog',
  templateUrl: './food-catalog.component.html',
  styleUrls: ['./food-catalog.component.scss']
})
export class FoodCatalogComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'name', 'dateCreated', 'status', 'controls'];
  public dataSource;

  public foodCatalogs = [];

  public token;
  public perssions;

  public currentPermission = {
    Create: false,
    Update: false,
    Delete: false
  };
  constructor(
    private foodCatalogService: FoodCatalogService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService
  ) {
    this.getFoodCatalogs();
    this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "FoodCatalog.Create")
        this.currentPermission.Create = true;

      if (element == "FoodCatalog.Update")
        this.currentPermission.Update = true;

      if (element == "FoodCatalog.Delete")
        this.currentPermission.Delete = true;
    });
  }

  public getFoodCatalogs() {
    this.foodCatalogService.getFoodCatalogs().subscribe((response: any) => {
      if (response) {
        this.foodCatalogs = response;
        this.setFoodCatalogSource(this.foodCatalogs);
      }
    }, (error) => {
      this.foodCatalogs = [];
      this.setFoodCatalogSource(this.foodCatalogs);

    });
  }

  public setFoodCatalogSource(foodCatalogs: any[]) {
    this.dataSource = new MatTableDataSource<any>(foodCatalogs);
  }

  public openFoodCatalogDialog(): void {
    const dialogRef = this.dialog.open(CreateFoodCatalogComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFoodCatalogs();
    });
  }

  public openUpdateFoodCatalogDialog(foodCatalog: any): void {
    const dialogRef = this.dialog.open(UpdateFoodCatalogComponent, {
      width: '50vw',
      data: {
        foodCatalog: foodCatalog
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFoodCatalogs();
    });
  }
}
