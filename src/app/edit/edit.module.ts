import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EditComponent} from './edit/edit.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from '../shared/shared.module';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    SharedModule,

    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [EditComponent]
})
export class EditModule {}
