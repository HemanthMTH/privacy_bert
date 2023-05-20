import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersComponent } from './components/members/members.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { MatrixComponent } from './components/matrix/matrix.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PopularComponent } from './components/popular/popular.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { NgSelectModule } from '@ng-select/ng-select';

PlotlyModule.plotlyjs = PlotlyJS;
@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    HomeComponent,
    MatrixComponent,
    PopularComponent,
    ToggleComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    AgGridModule,
    PlotlyModule,
    PdfViewerModule,
    NgSelectModule,
    AppRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
