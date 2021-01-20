import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/shared/account.service';
import { EquipmentService } from 'src/shared/equipment.service';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
  styleUrls: ['./update-equipment.component.scss']
})
export class UpdateEquipmentComponent implements OnInit {

  public Equipments = {
    id:'',
    name: '',
    amount:'',
    description: '',
    accountId:'',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  constructor(public dialogRef: MatDialogRef<UpdateEquipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private equipmentService: EquipmentService,
    private accountService: AccountService,) {
      this.Equipments.name = this.data.nameType;
      this.Equipments.amount = this.data.description;
      this.Equipments.id = this.data.id;
      this.Equipments.dateCreated = this.data.dateCreated;
      this.Equipments.dateModified = this.data.dateModified;
      this.Equipments.description = this.data.description;
      this.Equipments.accountId = this.data.accountId;

     }

  ngOnInit() {
  }

  public updateEquipmentCatalog() {

    this.equipmentService.putEquipments(this.Equipments).subscribe((response: any) => {
      alert('Cập nhật thành công ');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Cập nhật không thành công ');
    });
  }
}
