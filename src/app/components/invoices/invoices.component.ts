import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(private httpService: HttpServiceService, private router: Router) { }
  data:any
  dataSource: any;
  displayedColumns: string[] = ['position', 'addres', 'date', 'serial', 'payment', 'print'];
  @ViewChild('filter', { static: false }) filter: any;


  ngOnInit(): void {
    this.httpService.getInovoices().subscribe((res) => {
      this.data = res
      console.log(this.data);
    this.dataSource = new MatTableDataSource(this.data)
    })
  }


  printInvoice(id: string){
    this.router.navigate(['/create', id]) 
  }
}
