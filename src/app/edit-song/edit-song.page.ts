import { Component, OnInit } from '@angular/core';
// import { SongService } from './../shared/song.service';
import { Song } from './../shared/song';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.page.html',
  styleUrls: ['./edit-song.page.scss'],
})
export class EditSongPage implements OnInit {

  updateSongForm: FormGroup;
  id: any;
  song: Song;

  constructor(
    public modalController: ModalController,
   // private songAPI: SongService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    // <!-- this.id = this.actRoute.snapshot.paramMap.get('id'); -->
   // this.id = this.song ? this.song._id : this.actRoute.snapshot.paramMap.get('id');
     this.updateSongForm = this.fb.group({
      song_name: this.song ? this.song.song_name : '',
      artist: this.song ? this.song.artist : ''
   })
  }

  ngOnInit() {
    // this.getSongData(this.id);
    this.updateSongForm = this.fb.group({
     song_name: [''],
     artist: ['']
   })

    this.updateSongForm.get('song_name').setValue(this.song.song_name);
    this.updateSongForm.get('artist').setValue(this.song.artist);
    console.log(this.song);
  }

/*   getSongData(id) {
    this.songAPI.getSong(id).subscribe(res => {
      this.updateSongForm.setValue({
        song_name: res['song_name'],
        artist: res['artist']
      });
    });
  } */

  updateForm() {
    let params;
    if (!this.updateSongForm.valid) {
      return false;
    } else {
      params = {
        ...this.updateSongForm.value
      };
      this.modalController.dismiss(params);
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
