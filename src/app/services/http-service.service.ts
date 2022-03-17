import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../shared/invoice-model';

@Injectable({
    providedIn: 'root'
})
export class HttpServiceService {

constructor(private http: HttpClient) { }

    URL = 'http://localhost:3000/faktura'

  getInovoices(){
    return this.http.get(this.URL);
  }

  getInvoiceById(_id: any){
    return this.http.get(this.URL + `/${_id}`);
  }
  

  postInvoice(inv: any) {
    return this.http.post(this.URL, inv);
  }


}
