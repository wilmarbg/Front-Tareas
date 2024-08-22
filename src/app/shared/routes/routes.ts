import { Routes } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';

export const dashData: Routes = [
  {
    path: 'home',
    data: {
      title: 'Principal',
      breadcrumb: 'home',
    },
    component: HomeComponent,
  },
  {
    path: 'configuracion',
    data: {
      breadcrumb: 'Configuración',
    },
    loadChildren: () =>
      import('../../pages/configuracion/configuracion.routes').then((r) => r.Configuracion),
  },
  {
    path: 'seguridad',
    data: {
      breadcrumb: 'Configuración',
    },
    loadChildren: () =>
      import('../../pages/seguridad/seguridad.routes').then((r) => r.Seguridad),
  }
];
