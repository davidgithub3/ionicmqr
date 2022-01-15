import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { AddSongPage } from '../add-song/add-song.page';
import { EditSongPage } from '../edit-song/edit-song.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  entryComponents: [
    AddSongPage,
    EditSongPage
  ],
  declarations: [HomePage, AddSongPage, EditSongPage]
})

export class HomePageModule { }
