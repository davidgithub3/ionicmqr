import { Component, OnInit} from '@angular/core';
// import { SongService } from './../shared/song.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.page.html',
  styleUrls: ['./add-song.page.scss'],
})

export class AddSongPage implements OnInit {

  songForm: FormGroup;
  constructor(
    public modalController: ModalController,
   // private songAPI: SongService,
    private router: Router,
    public fb: FormBuilder,
  ) {
    this.songForm = this.fb.group({
      song_name: [''],
      artist: ['']
    })
  }

  ngOnInit() { }

  onFormSubmit() {
    let params;
    if (!this.songForm.valid) {
      return false;
    } else {
      params = {
        ...this.songForm.value
      };

      this.modalController.dismiss(params);
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }

}
