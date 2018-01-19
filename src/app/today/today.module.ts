import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

import {TodayComponent} from './today/today.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,

    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  declarations: [TodayComponent]
})
export class TodayModule {}
