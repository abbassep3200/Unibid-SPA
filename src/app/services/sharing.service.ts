import { Injectable } from '@angular/core';
import { ToggleMenu } from 'src/app/models/toggleMenu.model'

@Injectable({ providedIn: 'root' })
export class SharingService {
  toggleMenu = new ToggleMenu();
  constructor() {}
}
