import { UpdateServiceComponent } from './component/update-service/update-service.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SeviceDbService } from 'src/shared/seviceDb.service';
import { CreateServiceComponent } from './component/create-service/create-service.component';

@Component({
  selector: 'app-servicedb',
  templateUrl: './servicedb.component.html',
  styleUrls: ['./servicedb.component.scss']
})
export class ServicedbComponent implements OnInit {
  public displayedColumns: string[] = ['index', 'serviceName', 'description', 'money','dateCreated','controls'];
  public dataSource;
//'createdId'
  public serviceCatalogs = [];
  public search = '';

  public token;
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };
  constructor(private serviceDbService: SeviceDbService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService) {
      this.getServices();
      this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
     }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "Services.Create")
        this.currentPermission.Create = true;

      if (element == "Services.Update")
        this.currentPermission.Update = true;

      if (element == "Services.Delete")
        this.currentPermission.Delete = true;
    });
  }
  public getServices() {
    this.serviceDbService.getServices().subscribe((response: any) => {
      if (response) {
        this.serviceCatalogs = response;
        this.setServicesSource(this.serviceCatalogs);
      }
    }, (error) => {
      this.serviceCatalogs = [];
      this.setServicesSource(this.serviceCatalogs);

    });
  }
  public setServicesSource(foodCatalogs: any[]) {
    this.dataSource = new MatTableDataSource<any>(foodCatalogs);
  }
  public openCreateServiceDialog(): void {
    const dialogRef = this.dialog.open(CreateServiceComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getServices();
    });
  }
  public openUpdateServiceDialog(foodCatalog: any): void {
    const dialogRef = this.dialog.open(UpdateServiceComponent, {
      width: '50vw',
      data: foodCatalog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getServices();
    });
}
public getServicesByName() {
  this.serviceDbService.getServicesByName(this.search).subscribe((response: Function[]) => {
    if (response) {
      this.serviceCatalogs = response;

      this.setServicesSource(this.serviceCatalogs);
    }
  },
    (error) => { })
}
public deleteServices(id: string) {
  this.serviceDbService.deleteServices(id).subscribe((response: any) => {
    alert("xoa thanh cong!");
    this.getServices();
  }, (error) => {
    alert("xoa that bai!");
  });
}

}
