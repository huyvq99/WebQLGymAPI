import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeviceDbService {

constructor(private httpClient: HttpClient) { }

public getServices() {
  return this.httpClient.get(
    `${environment.localDomain}/api/Services`
  );
}

public postServices(serVice: any) {
  return this.httpClient.post(
    `${environment.localDomain}/api/Services`, serVice
  );
}

public putServices(serVice: any) {
  return this.httpClient.put(
    `${environment.localDomain}/api/Services/${serVice.id}`, serVice
  );
}
public getServicesByName(name:string){
  return this.httpClient.get(
    `${environment.localDomain}/api/Services/FindByName?name=${name}`);
}
public deleteServices(id: string) {
  return this.httpClient.delete(
    `${environment.localDomain}/api/Services/${id}`
  );
}
}
