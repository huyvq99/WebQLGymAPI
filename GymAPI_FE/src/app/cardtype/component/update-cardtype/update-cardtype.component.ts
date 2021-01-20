import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardtypeService } from 'src/shared/cardtype.service';

@Component({
  selector: 'app-update-cardtype',
  templateUrl: './update-cardtype.component.html',
  styleUrls: ['./update-cardtype.component.scss']
})
export class UpdateCardtypeComponent implements OnInit {

  public cardType = {
    id: '',
    nameType: '',
    description: '',
    dateCreated: new Date(),
    dateModified:new Date()
  }
  constructor(public dialogRef: MatDialogRef<UpdateCardtypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardTypeService: CardtypeService) {
      this.cardType.nameType = this.data.nameType;
      this.cardType.description = this.data.description;
      this.cardType.id = this.data.id;
      this.cardType.dateCreated = this.data.dateCreated;
      this.cardType.dateModified = this.data.dateModified;

  }
  ngOnInit() {
     //console.log(this.data);
  }
  public updateFoodCatalog() {

    this.cardTypeService.putCardType(this.cardType).subscribe((response: any) => {
      alert('Cập nhật thành công danh mục món ăn');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Cập nhật không thành công danh mục món ăn');
    });
  }

}
