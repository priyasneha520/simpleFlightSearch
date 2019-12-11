import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FlightDetail } from './model/FlightDetail';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showError = true;
  showInvalidDateError;
  showInvalidNumberError;
  displayedColumns = ['flightNumber', 'origin', 'departure', 'destination', 'arrival', 'aircraft', 'distance', 'travelTime', 'status'];

  dataSource = new MatTableDataSource();

  filterByFlightNumber = new FormControl('');
  filterByOrigin = new FormControl('');
  filterByDate = new FormControl('');
  filterByDestination = new FormControl('');

  filterValues = {
    flightNumber: '',
    origin: '',
    destination: '',
    date: ''
  };

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
  ) {
    this.dataSource.filterPredicate = this.tableFilter();
  }

  ngOnInit() {
    this.httpClient.get<FlightDetail[]>(environment.BASE_URL + '/flights',
      { headers: this.getHeaders() }).subscribe(data => {
        this.dataSource.data = data;

        this.filterByFlightNumber.valueChanges.subscribe(
          flightNumber => {
            console.log('flightNumber:' + flightNumber);

            if (!this.isNumber(flightNumber)) {
              this.showInvalidNumberError = true;
            } else {
              this.showInvalidNumberError = false;
              this.filterValues.flightNumber = flightNumber;
              this.dataSource.filter = JSON.stringify(this.filterValues);
            }
          }
        );

        this.filterByOrigin.valueChanges.subscribe(
          origin => {
            console.log('origin:' + origin);
            this.filterValues.origin = origin;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        );
        this.filterByDestination.valueChanges.subscribe(
          destination => {
            console.log('destination:' + destination);
            this.filterValues.destination = destination;
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        );

        this.filterByDate.valueChanges.subscribe(
          date => {
            console.log('date:' + date);
            if (!this.isDate(date)) {
              this.showInvalidDateError = true;
            } else {
              this.showInvalidDateError = false;
              this.filterValues.date = date;
              this.dataSource.filter = JSON.stringify(this.filterValues);
            }
          }
        );
      }, (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  tableFilter(): (data: FlightDetail, filter: string) => boolean {
    const filterFunction = function (data, val): boolean {
      const searchTerms = JSON.parse(val);
      if (searchTerms.flightNumber && searchTerms.date) {
        this.showError = false;
        const d1 = new Date(data.departure);
        const d2 = new Date(searchTerms.date);
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        return Number(data.flightNumber) === Number(searchTerms.flightNumber)
          && String(d1) === String(d2);
      } else if (searchTerms.origin && searchTerms.destination && searchTerms.date) {
        this.showError = false;
        const d1 = new Date(data.departure);
        const d2 = new Date(searchTerms.date);
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        return data.origin.toString().toLowerCase().indexOf(searchTerms.origin.toLowerCase()) !== -1
          && data.destination.toLowerCase().indexOf(searchTerms.destination.toLowerCase()) !== -1
          && String(d1) === String(d2);
      } else if (!searchTerms.flightNumber && !searchTerms.origin && !searchTerms.destination && !searchTerms.date) {
        return true;
      } else {
        this.showError = true;
        console.log('Validation message should be visible.');
        return false;
      }
    };
    return filterFunction;
  }
  
  clearSearch(){
    this.filterByDate.setValue('');
    this.filterByDestination.setValue('');
    this.filterByFlightNumber.setValue('');
    this.filterByOrigin.setValue('');
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
  }

  isDate(s) {
    if (isNaN(s) && !isNaN(Date.parse(s))){
      return true;
    } else {
      return false;
    }
  }

  isNumber(s) {
    if (!isNaN(s)){
      return true;
    } else {
      return false;
    }
  }
}
