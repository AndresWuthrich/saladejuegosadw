import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})

export class FichasService {

  constructor(private http: HttpClient) { }

  async todos() {
    return this.http.get(`${environment.baseUrlApi}`).toPromise()
  }

  async conseguirId(id:string){
    return this.http.get(`${environment.baseUrlApi}${id}`).toPromise()
 }
}
