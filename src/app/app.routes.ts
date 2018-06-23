import { Routes } from '@angular/router';
import { GameComponent } from './modules/game-test/game-test';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'game/test', pathMatch: "full" },
  { path: 'game/test', component: GameComponent }
];