import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, NgForm } from '@angular/forms';
import { HttpServiceService } from 'src/app/services/http-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private _fb: FormBuilder, private httpService: HttpServiceService) {}

  ngOnInit(): void {
    this.invoiceForm = this._fb.group({
      Rows: this._fb.array([this.initRows()])
    });
    this.httpService.getInovoices().subscribe((res:any) =>{
      console.log(res.length, "lengthi");
        this.invoiceCounter = res.length + 1;
    console.log(this.invoiceCounter);

    })
    
  }

  invoiceForm: any;
  place: string = '';
  quantity: number = 0;
  price: number = 0;
  total: number = 0;
  totalPayment: number = 0;
  ddv: number = 0;
  invoiceType :string = '';
  invoiceCounter = 1;
  serialNumber = new Date();
  onPrintHide = true


 


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
      ddv:'',
    });
  }

  addNewRow() {
    this.formArr.push(this.initRows());
  }


  getQuantity(event: any){
    this.quantity = event.target.value;  
  }
  
  getPrice(event: any,i:any){
    this.price = event.target.value
    this.total = this.invoiceForm.value.Rows[i].price * this.invoiceForm.value.Rows[i].quantity;
  }


  payment(){
    this.invoiceForm.value.Rows.forEach((row:any) => {
      let sum = (row.price * row.quantity).toFixed(2)
      this.total += parseFloat(sum)
    });
    this.calculateTotal();
  }

  calculateTotal(){
    const ddv = (((18/ 100) * this.total)).toFixed(2);             // kalkulimi i ddv
    this.ddv = parseFloat(ddv)
    this.totalPayment = this.total + this.ddv
    if(this.totalPayment){
      this.onPrintHide = false;
    }
  }
 

}
