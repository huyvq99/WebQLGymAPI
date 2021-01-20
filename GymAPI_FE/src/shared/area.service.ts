import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private httpClient: HttpClient) {
  }

  public getAreas() {
    return this.httpClient.get(
      `${environment.localDomain}/api/Areas`
    );
  }

}
