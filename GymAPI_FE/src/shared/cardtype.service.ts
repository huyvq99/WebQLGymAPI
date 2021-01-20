import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardtypeService {

constructor(private httpClient: HttpClient) { }

public getCardType() {
  return this.httpClient.get(
    `${environment.localDomain}/api/CardTypes`
  );
}

public postCardType(cardType: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/CardTypes`, cardType
  );
}

public putCardType(cardType: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/CardTypes/${cardType.id}`, cardType
  );
}
public getCardTypeByName(name:string){
  return this.httpClient.get(
    `${environment.localDomain}/api/CardTypes/FindByName?name=${name}`);
}
public deleteCardType(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/CardTypes/${id}`
  );
}
}
