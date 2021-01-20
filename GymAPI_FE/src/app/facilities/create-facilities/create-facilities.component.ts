import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacilitiesService } from 'src/shared/facilities.service';

@Component({
  selector: 'app-create-facilities',
  templateUrl: './create-facilities.component.html',
  styleUrls: ['./create-facilities.component.scss']
})
export class CreateFacilitiesComponent implements OnInit {

  public facility = {
    facilityName: '',
    address: '',
    dateCreated: new Date(),
    dateModified: new Date()
  }
  constructor(
    public dialogRef: MatDialogRef<CreateFacilitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facilityService: FacilitiesService
  ) { }

  ngOnInit() {
  }
  public createFacility() {
    this.facilityService.postFacilities(this.facility).subscribe((response: any) => {
      alert('Thêm mới thành công');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Thêm mới không thành công ');
    });
}
}
