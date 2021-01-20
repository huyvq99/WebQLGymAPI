import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CardsService } from 'src/shared/cards.service';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { UpdateCardComponent } from './components/update-card/update-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public displayedColumns: string[] = ['index', 'code','numOfDay','note','dateCreated','controls'];
  public dataSource;

  public cardCatalogs = [];
  public search = '';
  public token;
  public perssions;

  public currentPermission = {
    Create: true,
    Update: true,
    Delete: true
  };
  constructor(private cardService: CardsService,
    public dialog: MatDialog,
    public jwtHelper: JwtHelperService) { 
      this.getCards();
      this.token = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    }

  ngOnInit() {
    this.perssions = this.token.Permission.substring(1, this.token.Permission.length - 1);
    this.perssions = this.perssions.split(", ");

    this.perssions.forEach(element => {
      if (element == "Cards.Create")
        this.currentPermission.Create = true;

      if (element == "Cards.Update")
        this.currentPermission.Update = true;

      if (element == "Cards.Delete")
        this.currentPermission.Delete = true;
    });
  }

  public getCards() {
    this.cardService.getCards().subscribe((response: any) => {
      if (response) {
        this.cardCatalogs = response;
        this.setCardsSource(this.cardCatalogs);
      }
    }, (error) => {
      this.cardCatalogs = [];
      this.setCardsSource(this.cardCatalogs);

    });
  }
  public setCardsSource(cardCatalogs: any[]) {
    this.dataSource = new MatTableDataSource<any>(cardCatalogs);
  }
  public openCreateCardDialog(): void {
    const dialogRef = this.dialog.open(CreateCardComponent, {
      width: '50vw',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCards();
    });
  }
  public openUpdateCardsDialog(cardCatalogs: any): void {
    const dialogRef = this.dialog.open(UpdateCardComponent, {
      width: '50vw',
      data: cardCatalogs
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCards();
    });
}
public getCardsByName() {
  this.cardService.getCardsByName(this.search).subscribe((response: Function[]) => {
    if (response) {
      this.cardCatalogs = response;

      this.setCardsSource(this.cardCatalogs);
    }
  },
    (error) => { })
}
public deleteCard(id: string) {
  this.cardService.deleteCards(id).subscribe((response: any) => {
    alert("xoa thanh cong!");
    this.getCards();
  }, (error) => {
    alert("xoa that bai!");
  });
}
}
