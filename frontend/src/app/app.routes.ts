import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'watches', loadComponent: () => import('./features/watches/watch-list/watch-list.component').then(m => m.WatchListComponent) },
  { path: 'watches/:id', loadComponent: () => import('./features/watches/watch-detail/watch-detail.component').then(m => m.WatchDetailComponent) },
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent), canActivate: [authGuard] },
  { path: 'checkout', loadComponent: () => import('./features/orders/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [authGuard] },
  { path: 'orders', loadComponent: () => import('./features/orders/order-list/order-list.component').then(m => m.OrderListComponent), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./features/auth/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
  { path: 'admin', loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [adminGuard] },
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: '**', redirectTo: '' }
];


