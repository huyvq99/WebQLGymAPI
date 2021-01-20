
import { CreateCardtypeComponent } from './component/create-cardtype/create-cardtype.component';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CardtypeService } from 'src/shared/cardtype.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateCardtypeComponent } from '../cardtype/component/update-cardtype/update-cardtype.component';


@Component({
  selector: 'app-cardtype',
  templateUrl: './cardtype.component.html',
  styleUrls: ['./cardtype.component.scss']
})
export class CardtypeComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'nameType', 'description', 'dateCreated','controls'];
  public dataSource;

  public cardTypeCatalogs = [];
  public search = '';
  public token;
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };
  constructor( private cardTypeService: CardtypeService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService)
     {
      this.getCardTypes();
      this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
     }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "CardTypes.Create")
        this.currentPermission.Create = true;

      if (element == "CardTypes.Update")
        this.currentPermission.Update = true;

      if (element == "CardTypes.Delete")
        this.currentPermission.Delete = true;
    });
  }
  public getCardTypes() {
    this.cardTypeService.getCardType().subscribe((response: any) => {
      if (response) {
        this.cardTypeCatalogs = response;
        this.setCardTypesSource(this.cardTypeCatalogs);
      }
    }, (error) => {
      this.cardTypeCatalogs = [];
      this.setCardTypesSource(this.cardTypeCatalogs);

    });
  }
  public setCardTypesSource(foodCatalogs: any[]) {
    this.dataSource = new MatTableDataSource<any>(foodCatalogs);
  }
  public openCreateCardTypeDialog(): void {
    const dialogRef = this.dialog.open(CreateCardtypeComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCardTypes();
    });
  }
  public openUpdateCardTypeDialog(foodCatalog: any): void {
    const dialogRef = this.dialog.open(UpdateCardtypeComponent, {
      width: '50vw',
      data: foodCatalog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCardTypes();
    });
}
public getCardTypeByName() {
  this.cardTypeService.getCardTypeByName(this.search).subscribe((response: Function[]) => {
    if (response) {
      this.cardTypeCatalogs = response;

      this.setCardTypesSource(this.cardTypeCatalogs);
    }
  },
    (error) => { })
}
public deleteCardType(id: string) {
  this.cardTypeService.deleteCardType(id).subscribe((response: any) => {
    alert("xoa thanh cong!");
    this.getCardTypes();
  }, (error) => {
    alert("xoa that bai!");
  });
}
}
