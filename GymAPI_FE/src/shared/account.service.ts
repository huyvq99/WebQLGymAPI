import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

constructor(private httpClient:HttpClient) { }
public getAccountById(id: string) {
  return this.httpClient.get(
    `${environment.localDomain}/api/Accounts/${id}`
  );
}
public getAccount() {
  return this.httpClient.get(
    `${environment.localDomain}/api/Accounts`
  );
}
}
