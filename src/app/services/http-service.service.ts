import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpServiceService {

constructor(private http: HttpClient) { }

getInovoices(){
    return this.http.get('http://localhost:3000/faktura');
  }


}
