import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/shared/account.service';
import { CardsService } from 'src/shared/cards.service';
import { CardtypeService } from 'src/shared/cardtype.service';
import { FacilitiesService } from 'src/shared/facilities.service';
import { SeviceDbService } from 'src/shared/seviceDb.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {

  public card = {
    code: '',
    cardTypeId: '',
    accountId: '',
    facilityId: '',
    serviceId: '',
    facilityName: '',
    price: 0,
    numOfDay: 0,
    note:'',
    dateCreated: new Date(),
    dateModified: new Date(),
  }
  public Cardtypes = [];
  public selectedCardtypes = null;

  public Accounts = [];
  public selectedAccount = null;

  public Facilities = [];
  public selectedFacility = null;

  public Services = [];
  public selectedService = null;


  constructor(public dialogRef: MatDialogRef<CreateCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cardService: CardsService,
    private accountService: AccountService,
    private cardTypeService: CardtypeService,
    private facilityService: FacilitiesService,
    private serviceDbService: SeviceDbService,

    ) { 
      this.getAllAccounts();
      this.getAllServices();
      this.getAllCardTypes();
      this. getAllFacilities();

    }

  ngOnInit() {
  }
  public createCard() {
    this.card.cardTypeId = this.selectedCardtypes;
    this.card.accountId = this.selectedAccount;
    this.card.facilityId = this.selectedFacility;
    this.card.serviceId = this.selectedService;
    this.card.facilityName=this.selectedFacility.facilityName;
    this.cardService.postCards(this.card).subscribe((response: any) => {
      alert('Thêm mới thành công');
      this.dialogRef.close(true);
    }, (error) => {
      alert('Thêm mới không thành công ');
    });
}
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
public getAllCardTypes() {
  this.cardTypeService.getCardType().subscribe((response: any) => {
    if (response) {
      this.Cardtypes = response;
      this.selectedCardtypes = this.Cardtypes[0].id;
    }
  }, (error) => {
    this.Cardtypes = [];
    this.selectedCardtypes = null;
  });
}
public getAllFacilities() {
  this.facilityService.getFacilities().subscribe((response: any) => {
    if (response) {
      this.Facilities = response;
      this.selectedFacility = this.Facilities[0].id;
      this.selectedFacility = this.Facilities[0].facilityName;
    }
  }, (error) => {
    this.Facilities = [];
    this.selectedFacility = null;
  });
}
public getAllServices() {
  this.serviceDbService.getServices().subscribe((response: any) => {
    if (response) {
      this.Services = response;
      this.selectedService = this.Services[0].id;
    }
  }, (error) => {
    this.Services = [];
    this.selectedService = null;
  });
}

}
