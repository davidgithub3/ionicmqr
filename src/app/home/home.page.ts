import { Component, OnInit, NgZone} from '@angular/core';
import { SongService } from './../shared/song.service';
import {Song} from './../shared/song';
import { ModalController, PopoverController } from '@ionic/angular';
import { AddSongPage } from 'src/app/add-song/add-song.page';
import { EditSongPage } from 'src/app/edit-song/edit-song.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Songs: any = [];

  constructor(
    private songService: SongService,
    private zone: NgZone,
    private router: Router,
    public modalController: ModalController,
    public popoverController: PopoverController
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.songService.getSongList().subscribe((res) => {
      console.log(res);
      this.Songs = res;
    })
  }

  deleteSong(songItem: Song) {
    if (window.confirm('Do you want to delete user?')) {
      this.songService.deleteSong(songItem._id)
        .subscribe(() => {
          this.Songs.forEach((element,index) => {
            if ( element._id === songItem._id) this.Songs.splice(index,1);
            }
          );
          console.log('Song deleted!');
          }
        )
    }
  }

  async addSong() {
    const modal = await this.modalController.create({
      component: AddSongPage,
      componentProps: {
        song_name: '',
        artist: ''
      }
    });
    await modal.present();
    const response = await modal.onDidDismiss();
    const song = response.data as Song;
    if (song) {
      this.songService.addSong(song)
      .subscribe((res) => {
        this.zone.run(() => {
          console.log(res);
          this.Songs.push(res);
         // this.router.navigateByUrl('/');
        })
      });
    }
  }
  async editSong(songItem: Song) {
    const modal = await this.modalController.create({
      component: EditSongPage,
      componentProps: {
        song: songItem
      }
    });
    await modal.present();
    const response = await modal.onDidDismiss();
    const song = response.data as Song;
    console.log('edited song: ' + song);
    if (song) {
      this.songService.updateSong(songItem._id, song)
      .subscribe((res) => {
        this.zone.run(() => {
          console.log(res);
          const index = this.Songs.indexOf(songItem);
          this.Songs[index] = res;
        })
      });
    }
  }
}