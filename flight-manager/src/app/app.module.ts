import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatSortModule,
  MatButtonModule,
  MatSelectModule,
  MatCardModule,
  MatPaginatorModule,
  MatInputModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatStepperModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { ItemService } from './item.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    MatCardModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
