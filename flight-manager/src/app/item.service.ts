import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FlightDetail } from './model/FlightDetail';

@Injectable()
export class ItemService {

  dataChange: BehaviorSubject<FlightDetail[]> = new BehaviorSubject<FlightDetail[]>([]);
  dialogData: any;
  constructor(private httpClient: HttpClient) { }

  get data(): FlightDetail[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }


  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
  }

  getAll(): void {
    this.httpClient.get<any>(environment.BASE_URL + '/flights',
      { headers: this.getHeaders() }).subscribe(data => {
        this.dataChange.next(data);
      }, (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        // this.alertService.showDangerAlert('Error', 'Something went wrong while fetching flights.');
      });
  }
}
