import { FacilitiesService } from './../../shared/facilities.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateFacilitiesComponent } from './create-facilities/create-facilities.component';
import { UpdateFacilitiesComponent } from './update-facilities/update-facilities.component';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'facilityName', 'address', 'dateCreated','controls'];
  public dataSource;

  public facilityCatalogs = [];
  public search = '';
  public token;
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };
  constructor(
    private facilityService: FacilitiesService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService
  ) { 
    this.getFacilities();
    this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "Facilities.Create")
        this.currentPermission.Create = true;

      if (element == "Facilities.Update")
        this.currentPermission.Update = true;

      if (element == "Facilities.Delete")
        this.currentPermission.Delete = true;
    });
  }
  public getFacilities() {
    this.facilityService.getFacilities().subscribe((response: any) => {
      if (response) {
        this.facilityCatalogs = response;
        this.setFacilitiesSource(this.facilityCatalogs);
      }
    }, (error) => {
      this.facilityCatalogs = [];
      this.setFacilitiesSource(this.facilityCatalogs);

    });
  }
  public setFacilitiesSource(facilityCatalogs: any[]) {
    this.dataSource = new MatTableDataSource<any>(facilityCatalogs);
  }
  public openCreateFacilitiesDialog(): void {
    const dialogRef = this.dialog.open(CreateFacilitiesComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFacilities();
    });
  }
  public openUpdateFacilitiesDialog(facilityCatalog: any): void {
    const dialogRef = this.dialog.open(UpdateFacilitiesComponent, {
      data: facilityCatalog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getFacilities();
    });
}
public getFacilitiesByName() {
  this.facilityService.getFacilitiesByName(this.search).subscribe((response: Function[]) => {
    if (response) {
      this.facilityCatalogs = response;

      this.setFacilitiesSource(this.facilityCatalogs);
    }
  },
    (error) => { })
}
public deleteFacilities(id: string) {
  this.facilityService.deleteFacilities(id).subscribe((response: any) => {
    alert("xoa thanh cong!");
    this.getFacilities();
  }, (error) => {
    alert("xoa that bai!");
  });
}

}
