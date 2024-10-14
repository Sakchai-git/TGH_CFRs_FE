import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ConfigComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfigComponent,
      },
    ]),
  ]
})
export class ConfigModule { }
