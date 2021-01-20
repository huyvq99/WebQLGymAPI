import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  constructor(private httpClient: HttpClient) { }

  public getFacilities() {
    return this.httpClient.get(
      `${environment.localDomain}/api/Facilities`
    );
  }
  
  public postFacilities(facilities: any) {
    return this.httpClient.post(
      `${environment.localDomain}/api/Facilities`, facilities
    );
  }
  
  public putFacilities(facilities: any) {
    return this.httpClient.put(
      `${environment.localDomain}/api/Facilities/${facilities.id}`, facilities
    );
  }
  public getFacilitiesByName(name:string){
    return this.httpClient.get(
      `${environment.localDomain}/api/Facilities/FindByName?name=${name}`);
  }
  public deleteFacilities(id: string) {
    return this.httpClient.delete(
      `${environment.localDomain}/api/Facilities/${id}`
    );
  }

}
