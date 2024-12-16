import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveToWebStorage(LivenessDetails:{}){
    sessionStorage.clear();
    sessionStorage.setItem("Details", JSON.stringify(LivenessDetails))
  }

  retrieveToWebStorage():{}{
    return JSON.parse(sessionStorage.getItem("Details") || '{}')
  }
}
