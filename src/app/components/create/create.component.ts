import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Invoice } from 'src/app/shared/invoice-model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(  
    private _fb: FormBuilder, 
    private httpService: HttpServiceService, 
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

    selectedInvoice = '';
    serialNr = '';
    date:Date = new Date();



  ngOnInit(): void {
    this.invoiceForm = this._fb.group({
      Rows: this._fb.array([this.initRows()])
    });
    this.httpService.getInovoices().subscribe((res:any) =>{
        this.invoiceCounter = res.length + 1;
    })
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedInvoice = params['id'];
    })
    if(this.selectedInvoice){
    this.httpService.getInvoiceById(this.selectedInvoice).subscribe((res:any) => {      
      for (let i = 0; i < res.products.length; i++) {
        this.formArr.push(this.populateRows(res.products[i]));
      }
      this.place = res.addres;
      this.invoiceType = res.invoiceType;
      this.serialNr = res.serialNr;
      this.date = res.date
    })    
  }
   
    
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
  serialNumber = moment().format("DDMMYYYY");
  todaysDate = moment().format("ll");
  onPrintHide = true;


  invoice: any = {}

 


  onSubmit(form: NgForm){
    this.place = form.value.target;
  }

  typeOfInvoice(val: any){
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
 
  populateRows(data: any) {
    return this._fb.group({
      description: data.description,
      measuringUnit: data.measuringUnit,
      quantity: data.quantity,
      price: data.price,
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

  onPrint(){
    if(this.place == '' && this.invoiceType == '' && this.totalPayment == 0){
      return
    }else{
      this.invoice.counter = this.invoiceCounter;
      this.invoice.addres = this.place;
      this.invoice.serialNr = '#INV-'+this.serialNumber+ this.invoiceCounter;
      this.invoice.date = this.todaysDate;
      this.invoice.invoiceType = this.invoiceType;
      let tempProducts: any[] = [];
      for (let i = 0; i < this.invoiceForm.value.Rows.length; i++) {
        const element = this.invoiceForm.value.Rows[i];
        tempProducts.push(element);
      }
      this.invoice.products = tempProducts;
      this.invoice.total = this.total;
      this.invoice.ddv = this.ddv;
      this.invoice.payment = this.totalPayment;
      if(!this.selectedInvoice){
        this.httpService.postInvoice(this.invoice).subscribe();
        this.router.navigate(['/home'])
      }
    }
    
  }

}
