import { AppComponent } from './app-shell/app.component';
import { AboutComponent } from './about/about.component';
import { RecordsComponent } from './records/records.component';
import { InputComponent } from './input/input.component';
import { ManagerComponent } from './manager/manager.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Routes = [
    {path: 'input', component: InputComponent},
    {path: 'about', component: AboutComponent},
    {path: 'records', component: RecordsComponent},
    {path: 'manager', component: ManagerComponent},
    {path: '', redirectTo: 'input', pathMatch: 'full'}
]

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);