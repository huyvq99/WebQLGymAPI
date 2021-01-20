import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacilitiesService } from 'src/shared/facilities.service';

@Component({
  selector: 'app-update-facilities',
  templateUrl: './update-facilities.component.html',
  styleUrls: ['./update-facilities.component.scss']
})
export class UpdateFacilitiesComponent implements OnInit {

  public facility = {
    id:'',
    facilityName: '',
    address: '',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  constructor(public dialogRef: MatDialogRef<UpdateFacilitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facilitiesService: FacilitiesService) {
      this.facility.facilityName = this.data.facilityName;
      this.facility.address = this.data.address;
      this.facility.id = this.data.id;
      this.facility.dateCreated = this.data.dateCreated;
      this.facility.dateModified = this.data.dateModified;

  }
  ngOnInit() {
    console.log(this.data);
  }
  public updateFacility() {

    this.facilitiesService.putFacilities(this.facility).subscribe((response: any) => {
      alert('Cập nhật thành công ');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Cập nhật không thành công ');
    });
  }
}
