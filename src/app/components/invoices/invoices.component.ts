import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  constructor(private httpService: HttpServiceService) { }
  data:any
  dataSource: any;
  displayedColumns: string[] = ['position', 'addres', 'weight', 'symbol'];

  ngOnInit(): void {
    this.httpService.getInovoices().subscribe((res) => {
      this.data = res
      console.log(this.data);
    this.dataSource = new MatTableDataSource(this.data)
      
    })
  }

  applyFilter(e:Event){

  }
}
