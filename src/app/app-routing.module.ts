import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { CamundaDialogueModelComponent } from './camunda-dialogue-model/camunda-dialogue-model.component';
import { ProcessDiagramComponent } from './process-diagram/process-diagram.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'camundaDialogueModeule',component:CamundaDialogueModelComponent},
  { path: 'processDiagramDialogue',component:ProcessDiagramComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
