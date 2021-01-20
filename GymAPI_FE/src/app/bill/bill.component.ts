import { BillService } from './../../shared/bill.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CreateBillComponent } from './components/create-bill/create-bill.component';
import { UpdateBillComponent } from './components/update-bill/update-bill.component';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  
  public displayedColumns: string[] = ['index', 'name', 'money','statusPay', 'dateModified','controls'];
  public dataSource;

  public billCatalogs = [];
  public search = '';
  public token;
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };
  constructor(
    private billService: BillService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService
  ) { 
    this.getBills();
      this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
  }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "Bills.Create")
        this.currentPermission.Create = true;

      if (element == "Bills.Update")
        this.currentPermission.Update = true;

      if (element == "Bills.Delete")
        this.currentPermission.Delete = true;
    });
  }
  public getBills() {
    this.billService.getBills().subscribe((response: any) => {
      if (response) {
        this.billCatalogs = response;
        this.setBillsSource(this.billCatalogs);
      }
    }, (error) => {
      this.billCatalogs = [];
      this.setBillsSource(this.billCatalogs);

    });
  }
  public setBillsSource(foodCatalogs: any[]) {
    this.dataSource = new MatTableDataSource<any>(foodCatalogs);
  }
  public openCreateBillsDialog(): void {
    const dialogRef = this.dialog.open(CreateBillComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBills();
    });
  }
  public openUpdateBillsDialog(foodCatalog: any): void {
    const dialogRef = this.dialog.open(UpdateBillComponent, {
      width: '50vw',
      data: foodCatalog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBills();
    });
}
public getBillsByName() {
  this.billService.getBillsByName(this.search).subscribe((response: Function[]) => {
    if (response) {
      this.billCatalogs = response;

      this.setBillsSource(this.billCatalogs);
    }
  },
    (error) => { })
}
public deleteBill(id: string) {
  this.billService.deleteBills(id).subscribe((response: any) => {
    alert("xóa thanh cong!");
    this.getBills();
  }, (error) => {
    alert("xoa that bai!");
  });
}

}
