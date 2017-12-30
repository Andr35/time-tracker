import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

import {OverviewComponent} from './overview/overview.component';
import {DayDetailsComponent} from './day-details/day-details.component';
import {MonthGroupPipe} from './month-group.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,

    FlexLayoutModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule

  ],
  declarations: [
    OverviewComponent,
    DayDetailsComponent,
    MonthGroupPipe
  ]
})
export class OverviewModule {}
