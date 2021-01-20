import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EquipmentService } from 'src/shared/equipment.service';
import { CreateEquipmentComponent } from './create-equipment/create-equipment.component';
import { UpdateEquipmentComponent } from './update-equipment/update-equipment.component';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'name', 'amount','description', 'dateModified','controls'];
  public dataSource;

  public equipmentCatalogs = [];
  public search = '';
  public token;
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };
  constructor(private equipmentService: EquipmentService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService) { 
      this.getEquipments();
      this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    }

  ngOnInit(
    
  ) {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "Equipments.Create")
        this.currentPermission.Create = true;

      if (element == "Equipments.Update")
        this.currentPermission.Update = true;

      if (element == "Equipments.Delete")
        this.currentPermission.Delete = true;
    });
  }
  public getEquipments() {
    this.equipmentService.getEquipments().subscribe((response: any) => {
      if (response) {
        this.equipmentCatalogs = response;
        this.setEquipmentsSource(this.equipmentCatalogs);
      }
    }, (error) => {
      this.equipmentCatalogs = [];
      this.setEquipmentsSource(this.equipmentCatalogs);

    });
  }
  public getEquipmentsByName() {
    this.equipmentService.getEquipmentsByName(this.search).subscribe((response: Function[]) => {
      if (response) {
        this.equipmentCatalogs = response;
  
        this.setEquipmentsSource(this.equipmentCatalogs);
      }
    },
      (error) => { })
  }
  public setEquipmentsSource(equipmentCatalogs: any[]) {
    this.dataSource = new MatTableDataSource<any>(equipmentCatalogs);
  }
  public openCreateEquitmentDialog(): void {
    const dialogRef = this.dialog.open(CreateEquipmentComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEquipments();
    });
  }
  public openUpdateEquitmentDialog(equipmentCatalogs: any): void {
    const dialogRef = this.dialog.open(UpdateEquipmentComponent, {
      width: '50vw',
      data: equipmentCatalogs
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEquipments();
    });
}
public deleteEquipment(id: string) {
  this.equipmentService.deleteEquipments(id).subscribe((response: any) => {
    alert("xoa thanh cong!");
    this.getEquipments();
  }, (error) => {
    alert("xoa that bai!");
  });
}
}
