import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private httpClient: HttpClient) { }

  public getEquipments() {
    return this.httpClient.get(
      `${environment.localDomain}/api/Equipments`
    );
  }
  
  public postEquipments(equitpment: any) {
    return this.httpClient.post(
      `${environment.localDomain}/api/Equipments`, equitpment
    );
  }
  
  public putEquipments(equitpment: any) {
    return this.httpClient.put(
      `${environment.localDomain}/api/Equipments/${equitpment.id}`, equitpment
    );
  }
  public getEquipmentsByName(name:string){
    return this.httpClient.get(
      `${environment.localDomain}/api/Equipments/FindByName?name=${name}`);
  }
  public deleteEquipments(id: string) {
    return this.httpClient.delete(
      `${environment.localDomain}/api/Equipments/${id}`
    );
  }
}
