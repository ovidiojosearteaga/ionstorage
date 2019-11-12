import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  value:any;

  constructor(
    private storage: StorageService,
    private toast: ToastController,
  ) {
  }

  setToken() {
    this.storage.set('token', 'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdaadsf')
      .then(() => {
        this.storage.get('token').then(resp => {
          this.value = resp;
          this.toast.create({
            message: "Registro insertado!",
            showCloseButton: true,
          }).then(toast => toast.present());
        });
      });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.setToken();
  }

  delete() {
    this.storage.remove('token');  
    this.value = '';
    this.toast.create({
      message: "Registro eliminado!",
      showCloseButton: true,
    }).then(toast => toast.present());
  }
}
