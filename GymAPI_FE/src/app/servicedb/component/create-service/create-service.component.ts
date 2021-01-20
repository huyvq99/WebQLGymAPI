import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/shared/account.service';
import { SeviceDbService } from 'src/shared/seviceDb.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {

  public serViceDb = {
    serviceName: '',
    description: '',
    money:'',
    createdId:'',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  public Accounts = [];

  public selectedAccount = null;
  constructor(public dialogRef: MatDialogRef<CreateServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceDbService: SeviceDbService,private accountService: AccountService
    ) { 
      this. getAllAccounts();
    }

  ngOnInit() {
  }
  public createSerViceDb() {
    this.serViceDb.createdId = this.selectedAccount;
    this.serviceDbService.postServices(this.serViceDb).subscribe((response: any) => {
      alert('Thêm mới thành công ');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Thêm mới không thành công' );
    });
}
public getAllAccounts() {
  this.accountService.getAccount().subscribe((response: any) => {
    if (response) {
      this.Accounts = response;
      this.selectedAccount = this.Accounts[0].id;
    }
  }, (error) => {
    this.Accounts = [];
    this.selectedAccount = null;
  });
}
}
