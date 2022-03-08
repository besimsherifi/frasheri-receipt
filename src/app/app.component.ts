import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.invoiceForm = this._fb.group({
      Rows: this._fb.array([this.initRows()])
    });
  }

  invoiceForm: any;
  place = '';
  quantity: number = 0;
  price: number = 0;
  total: number = 0;
  totalPayment: number = 0;
  ddv: number = 0;
  invoiceType = '';


  onSubmit(form: NgForm){
    this.place = form.value.target;
  }

  selectedInvoice(val: any){
    this.invoiceType = val
  }


  get formArr() {
    return this.invoiceForm.get("Rows") as FormArray;
  }

  initRows() {
    return this._fb.group({
      description: '',
      measuringUnit: '',
      quantity: '',
      price: '',
    });
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }

  deleteRow(index: number){
    this.formArr.removeAt(index);
  }

  getQuantity(event: any){
    this.quantity = event.target.value;
  }
  
  getPrice(event: any){
    this.price = event.target.value
    this.calculateTotal()
    this.totalPaymentc()
    console.log(this.invoiceForm);
    
  }

  calculateTotal(){
    this.total = this.quantity * this.price;
  }


totalPaymentc(){
  const ddv = (((18/ 100) * this.total)).toFixed(2);             // kalkulimi i ddv
  this.ddv = parseFloat(ddv)
  this.totalPayment = this.total + this.ddv
}
  
}
