import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit/edit.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,

    SharedModule,

    FlexLayoutModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [EditComponent]
})
export class EditModule {}
