import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private nativeStorage: NativeStorage,
    private storage: Storage,
    private platform: Platform
  ) { 
  }

  private isCordova() {
    if (this.platform.is("cordova")) {
      return true;
    
    } else {
      return false;
    }
  }

  async set(key:string, value:any) {
    if (this.isCordova()) {
      this.setNativeStorage(key,value);

    } else {
      this.setStorage(key,JSON.stringify(value));
    }
  }

  private async setNativeStorage(item:string, values:any) {
    this.nativeStorage.setItem(item, values);
  }

  private async setStorage(key:string, value:string) {
    this.storage.set(key, value);
  }

  async get(key:string) {
    if (this.isCordova()) {
      return this.getNativeStorage(key)
              .then(resp => {
                return resp;
              });

    } else {
      return this.getStorage(key)
              .then(resp => {
                return resp;
              });
    }
  }

  private async getNativeStorage(item:string) {
    return this.nativeStorage.getItem(item)
            .then(data => {
              return data
            });
  }

  private async getStorage(key:string) {
    return this.storage.get(key)
            .then(data => {
              return data
            });
  }

  async remove(key:string) {
    if (this.isCordova()) {
      return this.removeNativeStorage(key)
              .then(resp => {
                return resp;
              });

    } else {
      return this.removeStorage(key)
              .then(resp => {
                return resp;
              });
    }
  }

  private async removeNativeStorage(item:string) {
    return this.nativeStorage.remove(item)
            .then(data => {
              return data
            });
  }

  private async removeStorage(key:string) {
    return this.storage.remove(key)
            .then(data => {
              return data
            });
  }
}
