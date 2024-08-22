import { Routes } from '@angular/router';
import { EmpresasComponent } from './empresas/empresas.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { TareasComponent } from './tareas/tareas.component';

export const Configuracion: Routes = [
  {
    path: '',
    children: [
      {
        path: 'empresas',
        component: EmpresasComponent,
        data: {
          title: 'Config. Empresas',
          breadcrumb: 'empresas'
        }
      },
      {
        path: 'proyectos',
        component: ProyectosComponent,
        data: {
          title: 'Config. Proyectos',
          breadcrumb: 'proyectos'
        }
      },
      {
        path: 'tareas',
        component: TareasComponent,
        data: {
          title: 'Lista de Tareas',
          breadcrumb: 'tareas'
        }
      }
    ]
  }
]
