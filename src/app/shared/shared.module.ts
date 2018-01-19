import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PausesBoxComponent} from './pauses-box/pauses-box.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule

  ],
  declarations: [PausesBoxComponent],
  exports: [PausesBoxComponent]
})
export class SharedModule {}
