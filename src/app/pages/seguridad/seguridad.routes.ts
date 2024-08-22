import {  Routes } from "@angular/router";
import { PermisosComponent } from "./permisos/permisos.component";
import { RolesComponent } from "./roles/roles.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";


export const Seguridad: Routes = [
  {
    path: '',
    children: [
      {
        path: 'permisos',
        component: PermisosComponent,
        data: {
          title: 'Config. Permisos',
          breadcrumb: 'permisos'
        }
      },
      {
        path: 'roles',
        component: RolesComponent,
        data: {
          title: 'Config. Roles',
          breadcrumb: 'roles'
        }
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {
          title: 'Config. Usuarios',
          breadcrumb: 'usuarios'
        }
      }
    ]
  }
]
