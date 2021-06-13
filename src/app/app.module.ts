import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablelistComponent } from './tablelist/tablelist.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule} from '@angular/material';





@NgModule({
  declarations: [
    AppComponent,
    TablelistComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
