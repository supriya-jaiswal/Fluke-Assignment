import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Organization } from "./organization";
import { Project } from "./project";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PageEvent } from "@angular/material/paginator";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public organizationArray : Organization[]=[];
  public projectArray : Project[]=[];
  public selectedOrganization:any;
  public pageSlice ;
  dataSource = new MatTableDataSource(this.projectArray );

  constructor(private http: HttpClient){




  }
  ngOnInit(){
// Gets organizations.csv data and stores into organizationArray

this.http.get('assets/organizations.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");

            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.organizationArray.push( new Organization(JSON.parse(row[0]), row[1].trim()));



            }
        },
        error => {
            console.log(error);
        }
    );

   // Gets projects.csv data and stores into pageSlice

    this.http.get('assets/projects.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n")
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.projectArray.push( new Project(row[0], row[1], row[2],row[3], row[4].trim()));
              this.pageSlice = this.projectArray.slice(0,5);

            }
        },
        error => {
            console.log(error);
        }
    );




     this.selectedOrganization = "025efb1b-ab9d-4551-b56c-1732bb4daadc";


  }

//On selecting the organization from dropdown, onChange method gets called and results into filtered data.

  onChange(selectedOrganization:string){


      this.projectArray = this.projectArray.filter(x=>x.organization_id==this.selectedOrganization)

      this.pageSlice = this.projectArray.slice(0,5);




  }


  //For pagination

  OnPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.projectArray.length){
      endIndex = this.projectArray.length;

    }
    this.pageSlice = this.projectArray.slice(startIndex, endIndex)
  }





}
