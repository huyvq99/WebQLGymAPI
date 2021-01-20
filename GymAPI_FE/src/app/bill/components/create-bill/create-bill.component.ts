import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillService } from 'src/shared/bill.service';
import { CardsService } from 'src/shared/cards.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss']
})
export class CreateBillComponent implements OnInit {

  public bills = {
    name: '',
    cardId: '',
    money:0,
    statusPay:0,
    dateCreated: new Date(),
    dateModified: new Date()
  }
  public Cards = [];

  public selectedCard = null;

  constructor(public dialogRef: MatDialogRef<CreateBillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billSerive: BillService,
    private cardService: CardsService ) { 
      this.getAllCards();
    }

  ngOnInit() {
  }
  public createBill() {
    this.bills.cardId = this.selectedCard;
    this.billSerive.postBills(this.bills).subscribe((response: any) => {
      alert('Thêm mới thành công');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Thêm mới không thành công ');
    });
}
public getAllCards() {
  this.cardService.getCards().subscribe((response: any) => {
    if (response) {
      this.Cards = response;
      this.selectedCard = this.Cards[0].id;
    }
  }, (error) => {
    this.Cards = [];
    this.selectedCard = null;
  });
}
}
