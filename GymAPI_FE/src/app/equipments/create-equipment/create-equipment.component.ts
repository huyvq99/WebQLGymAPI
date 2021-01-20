import { AccountService } from './../../../shared/account.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentService } from 'src/shared/equipment.service';

@Component({
  selector: 'app-create-equipment',
  templateUrl: './create-equipment.component.html',
  styleUrls: ['./create-equipment.component.scss']
})
export class CreateEquipmentComponent implements OnInit {

  public Equipments = {
    name: '',
    amount:'',
    description: '',
    accountId:'',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  public Accounts = [];

  public selectedAccount = null;

  constructor(
    public dialogRef: MatDialogRef<CreateEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private equipmentService: EquipmentService,
    private accountService: AccountService,
  ) {
    this.getAllAccounts();
   }

  ngOnInit() {
  }
  public createEquipments() {
    this.Equipments.accountId = this.selectedAccount;
    this.equipmentService.postEquipments(this.Equipments).subscribe((response: any) => {
      alert('Thêm mới thành công ');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Thêm mới không thành');
    });
}
// public getAccountById(AccountId: string) {
//   this.accountService.getAccountById(AccountId).subscribe((response: any) => {
//     if (response) {
//       this.Accounts = response;
//       this.selectedAccount = this.Accounts[0].id;
//     }
//   }, (error) => {
//     this.Accounts = [];
//   });
// }
// public getAccount() {
//   this.accountService.getAccount().subscribe((response: any) => {
//     if (response) {
//       this.Accounts = response;
//       this.selectedAccount = this.Accounts[0].id;
//         this.getAccountById(this.selectedAccount);
//     }
//   }, (error) => {
//     this.Accounts = [];
//     this.selectedAccount = null;
//   });
// }
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


// public changeAccount(AccountId: string) {
//   this.getAccountById(AccountId);
// }
}


