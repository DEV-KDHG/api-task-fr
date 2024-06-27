import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { CategoryComponent } from './category/category.component';
import { NewWorkComponent } from './new-work/new-work.component';
import { TaskListComponent } from './task-list/task-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{path: 'status', component: StatusComponent },
{path: 'category', component: CategoryComponent },
{path: 'new-work', component: NewWorkComponent },
{path: 'task-list', component: TaskListComponent },
{ path: 'home', component: HomeComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
