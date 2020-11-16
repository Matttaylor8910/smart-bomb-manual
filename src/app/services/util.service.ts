import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class UtilService {
  constructor(
      private readonly toastCtrl: ToastController,
  ) {}

  async showToast(message: string, duration: number = 2000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      buttons: [{icon: 'close', role: 'cancel'}],
    });
    toast.present();
  }
}
