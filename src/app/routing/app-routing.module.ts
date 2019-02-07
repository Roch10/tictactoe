import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent, GamePageComponent } from "../components/index";

const routes: Routes = [
  { path: '', redirectTo:'startpage', pathMatch:'full'},
  {path: 'startpage', component: StartPageComponent},
  {path: 'gamepage/:player', component: GamePageComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
