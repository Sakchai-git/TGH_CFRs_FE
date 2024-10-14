import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'import-statement',
    loadChildren: () =>
      import('./import-statement/import-statement.module').then(
        (m) => m.ImportStatementModule
      ),
  },
  {
    path: 'batch',
    loadChildren: () =>
      import('./batch/batch.module').then((m) => m.BatchModule),
  },
  {
    path: 'auto-reconcile',
    loadChildren: () =>
      import('./auto-reconcile/auto-reconcile.module').then(
        (m) => m.AutoReconcileModule
      ),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'batch',
    loadChildren: () =>
      import('./batch/batch.module').then((m) => m.BatchModule),
  },
  {
    path: 'config',
    loadChildren: () =>
      import('./config/config.module').then((m) => m.ConfigModule),
  },
  {
    path: 'master-data',
    loadChildren: () =>
      import('./master-data/master-data.module').then(
        (m) => m.MasterDataModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'audit-log',
    loadChildren: () =>
      import('./audit-log/audit-log.module').then((m) => m.AuditLogModule),
  },
  {
    path: 'cheque-status',
    loadChildren: () =>
      import('./cheque-status/cheque-status.module').then(
        (m) => m.ChequeStatusModule
      ),
  },
  // {
  //   path: 'crafted/account',
  //   loadChildren: () =>
  //     import('../modules/account/account.module').then((m) => m.AccountModule),
  //   data: { layout: 'dark-header' },
  // },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
