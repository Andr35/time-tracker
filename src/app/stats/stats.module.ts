import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatsComponent} from './stats/stats.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    FlexLayoutModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule
  ],
  declarations: [StatsComponent]
})
export class StatsModule {}
