import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

constructor(private httpClient: HttpClient) { }
public getCards() {
  return this.httpClient.get(
    `${environment.localDomain}/api/Cards`
  );
}

public postCards(card: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/Cards`, card
  );
}

public putCards(card: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/Cards/${card.id}`, card
  );
}
public getCardsByName(code:string){
  return this.httpClient.get(
    `${environment.localDomain}/api/Cards/FindByName?Code=${code}`);
}
public deleteCards(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/Cards/${id}`
  );
}
}
