import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeviceDbService } from 'src/shared/seviceDb.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.scss']
})
export class UpdateServiceComponent implements OnInit {

  public serViceDb = {
    id:'',
    serviceName: '',
    description: '',
    money:'',
    createdId:'',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  constructor(public dialogRef: MatDialogRef<UpdateServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceDbService: SeviceDbService) { 
      this.serViceDb.serviceName = this.data.serviceName;
      this.serViceDb.description = this.data.description;
      this.serViceDb.id = this.data.id;
      this.serViceDb.dateCreated = this.data.dateCreated;
      this.serViceDb.dateModified = this.data.dateModified;
      this.serViceDb.createdId = this.data.createdId;
      this.serViceDb.money = this.data.money;
    }

  ngOnInit() {
  }
  public updateServiceDb() {

    this.serviceDbService.putServices(this.serViceDb).subscribe((response: any) => {
      alert('Cập nhật thành công ');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Cập nhật không thành công ');
    });
  }
}
