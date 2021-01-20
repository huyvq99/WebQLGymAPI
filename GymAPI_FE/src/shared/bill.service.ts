import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillService {


constructor(private httpClient: HttpClient) { }
public getBills() {
  return this.httpClient.get(
    `${environment.localDomain}/api/Bills`
  );
}


public postBills(bill: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/Bills`, bill
  );
}

public putBills(bill: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/Bills/${bill.id}`, bill
  );
}
public getBillsByName(name:string){
  return this.httpClient.get(
    `${environment.localDomain}/api/Bills/FindByName?Name=${name}`);
}
public deleteBills(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/Bills/${id}`
  );
}
}
