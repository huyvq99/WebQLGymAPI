import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { CardtypeService } from 'src/shared/cardtype.service';

@Component({
  selector: 'app-create-cardtype',
  templateUrl: './create-cardtype.component.html',
  styleUrls: ['./create-cardtype.component.scss']
})
export class CreateCardtypeComponent implements OnInit {
  public cardType = {
    nameType: '',
    description: '',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  constructor(public dialogRef: MatDialogRef<CreateCardtypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardTypeService: CardtypeService) { 
      
    }

  ngOnInit() {
  }
  public createCardType() {
      this.cardTypeService.postCardType(this.cardType).subscribe((response: any) => {
        alert('Thêm mới thành công ');
        this.dialogRef.close(true);
      }, (error) => {
        alert('Thêm mới không thành công ');
      });
  }

}
