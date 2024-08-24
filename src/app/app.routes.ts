import { Routes } from '@angular/router';
import { ContentComponent } from './shared/component/layout/content/content.component';
import { dashData } from './shared/routes/routes';
import { FullComponent } from './shared/component/layout/full/full.component';
import { fullRoutes } from './shared/routes/full-routes';
import { LoginComponent } from './auth/login/login.component';
import { AdminGuard } from './shared/guard/admin.guard';

export const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: ContentComponent,
        children: dashData,
        canActivate: [AdminGuard],
    },
    {
        path: '',
        component: FullComponent,
        children: fullRoutes,
    },
];

// export const routeConfig = {
//     routes: routes,
//     useHash: true
// };
