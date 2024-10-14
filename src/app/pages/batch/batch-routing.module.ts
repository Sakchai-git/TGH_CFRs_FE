import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunBatchManualComponent } from './run-batch-manual/run-batch-manual.component';
import { GlComponent } from './gl/gl.component';
import { PermissionGuard } from '@shared/guards/permission.guard';

const routes: Routes = [
  {
    path: 'run-batch-manual',
    component: RunBatchManualComponent,
    data: {
      menuCode: 'RUN-BATCH-MANUAL',
    },
    canActivate: [PermissionGuard],
  },
  {
    path: 'gl',
    component: GlComponent,
    data: {
      menuCode: 'GL',
    },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchRoutingModule {}
