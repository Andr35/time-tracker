import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {SettingsComponent} from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,

    FlexLayoutModule,
    MatListModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {}
