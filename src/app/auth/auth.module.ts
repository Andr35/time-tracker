import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AuthComponent} from './auth/auth.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,

    FlexLayoutModule,
    MatButtonModule,
    MatIconModule

  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule {}
