import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardsService } from 'src/shared/cards.service';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.scss']
})
export class UpdateCardComponent implements OnInit {

  public card = {
    id:'',
    code: '',
    cardTypeId: '',
    accountId: '',
    facilityId: '',
    serviceId: '',
    facilityName: '',
    price: '',
    numOfDay: '',
    note:'',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  constructor(
    public dialogRef: MatDialogRef<UpdateCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardsService
  ) { 
    this.card.code = this.data.code;
    this.card.cardTypeId = this.data.cardTypeId;
    this.card.id = this.data.id;
    this.card.accountId = this.data.accountId;
    this.card.facilityId = this.data.facilityId;
    this.card.serviceId = this.data.serviceId;
    this.card.facilityName = this.data.facilityName;
    this.card.price = this.data.price;
    this.card.numOfDay = this.data.numOfDay;
    this.card.note = this.data.note;
    this.card.dateCreated = this.data.dateCreated;
    this.card.dateModified = this.data.dateModified;

  }

  ngOnInit() {
  }
  public updateCard() {

    this.cardService.putCards(this.card).subscribe((response: any) => {
      alert('Cập nhật thành công ');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Cập nhật không thành công ');
    });
  }
}
