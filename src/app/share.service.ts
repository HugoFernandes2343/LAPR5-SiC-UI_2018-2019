import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  
  private storageName: string = "Data";
  constructor() { }

  setData(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }

  checkData(): any {
    if(localStorage.getItem(this.storageName)===null){
      return false;
    }
    return true;
  }

  getData() {
    let data = localStorage.getItem(this.storageName);
    return JSON.parse(data);
  }

  clearData() {
    localStorage.removeItem(this.storageName);
  }

  cleanAll() {
    localStorage.clear()
  }

}