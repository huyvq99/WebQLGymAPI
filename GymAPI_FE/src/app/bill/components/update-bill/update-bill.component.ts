import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillService } from 'src/shared/bill.service';

@Component({
  selector: 'app-update-bill',
  templateUrl: './update-bill.component.html',
  styleUrls: ['./update-bill.component.scss']
})
export class UpdateBillComponent implements OnInit {

  public bill = {
    id:'',
    name: '',
    cardId: '',
    money:0,
    statusPay:'',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  constructor(public dialogRef: MatDialogRef<UpdateBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billSerive: BillService) {
      this.bill.name = this.data.name;
      this.bill.cardId = this.data.cardId;
      this.bill.money = this.data.money;
      this.bill.statusPay=this.data.statusPay;
      this.bill.id = this.data.id;
      this.bill.dateCreated = this.data.dateCreated;
      this.bill.dateModified = this.data.dateModified;

  }

  ngOnInit() {
  }
  public updateBill() {

    this.billSerive.putBills(this.bill).subscribe((response: any) => {
      alert('Cập nhật thành công');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Cập nhật không thành công ');
    });
  }
}
