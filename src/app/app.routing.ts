import { ModuleWithProviders } from '@angular/core';
import { AboutComponent } from './about/about.component';
import { InputComponent } from './input/input.component';
import { RecordsComponent } from './records/records.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: 'input', component: InputComponent, pathMatch: 'full'},
    {path: 'about', component: AboutComponent, pathMatch: 'full'},
    {path: 'records', component: RecordsComponent, pathMatch: 'full'},
    {path: '', redirectTo: 'input', pathMatch: 'full'}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);