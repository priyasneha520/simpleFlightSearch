import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlightDetail } from '../model/FlightDetail';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  title = 'flight-manager';
  flights;
  tableDataSource = new BehaviorSubject<FlightDetail[]>([]);
  displayedColumns = new BehaviorSubject<string[]>([
    'flightNumber',
    'carrier',
    'origin',
    'departure',
    'destination',
    'arrival',
    'aircraft',
    'distance',
    'travelTime',
    'status'
  ]);

  currentPage = new BehaviorSubject<number>(1);
  pageSize = new BehaviorSubject<number>(10);
  dataOnPage = new BehaviorSubject<FlightDetail[]>([]);
  searchFormControl = new FormControl();
  sortKey = new BehaviorSubject<string>('flightNumber');
  sortDirection = new BehaviorSubject<string>('asc');

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.httpClient.get<FlightDetail>(environment.BASE_URL + '/flights').subscribe(
      data => {
        console.log('data:', data);
        this.flights = new BehaviorSubject<FlightDetail>(data);

        combineLatest(this.tableDataSource, this.currentPage, this.pageSize)
          .subscribe(([allSources, currentPage, pageSize]) => {
            const startingIndex = (currentPage - 1) * pageSize;
            const onPage = allSources.slice(startingIndex, startingIndex + pageSize);
            this.dataOnPage.next(onPage);
          });

        this.flights.pipe(take(1)).subscribe(heroData => {
          this.tableDataSource.next(Object.values(heroData));
        });

        this.setFlightSearch();
      }, error => {
        console.log('Something went wrong.', error);
      }
    );
  }

  adjustSort(key: string) {
    if (this.sortKey.value === key) {
      if (this.sortDirection.value === 'asc') {
        this.sortDirection.next('desc');
      } else {
        this.sortDirection.next('asc');
      }
      return;
    }

    this.sortKey.next(key);
    this.sortDirection.next('asc');
  }

  setFlightSearch() {
    combineLatest(this.flights, this.searchFormControl.valueChanges, this.sortKey, this.sortDirection)
      .subscribe(([changedHeroData, searchTerm, sortKey, sortDirection]) => {
        const heroesArray = Object.values(changedHeroData);
        let filteredFlights: FlightDetail[];

        if (!searchTerm) {
          filteredFlights = heroesArray;
        } else {
          const filteredResults = heroesArray.filter(hero => {
            return Object.values(hero)
              .reduce((prev, curr) => {
                return prev || curr.toString().toLowerCase().includes(searchTerm.toLowerCase());
              }, false);
          });
          filteredFlights = filteredResults;
        }

        const sortedHeroes = filteredFlights.sort((a, b) => {
          if (a[sortKey] > b[sortKey]) {
            return sortDirection === 'asc' ? 1 : -1;
          }

          if (a[sortKey] < b[sortKey]) {
            return sortDirection === 'asc' ? -1 : 1;
          }
          return 0;
        });

        this.tableDataSource.next(sortedHeroes);
      });

    this.searchFormControl.setValue('');
  }
}
