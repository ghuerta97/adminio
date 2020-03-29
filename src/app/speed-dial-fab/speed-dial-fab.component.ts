import { Component, Input, OnInit } from '@angular/core';
import { speedDialFabAnimations } from './speed-dial-fab.animations';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-speed-dial-fab',
    templateUrl: './speed-dial-fab.component.html',
    styleUrls: ['./speed-dial-fab.component.scss'],
    animations: speedDialFabAnimations
  })
  export class SpeedDialFabComponent implements OnInit {

    @Input() fabButtons: FabButtons[];
    @Input() color: string;
    buttons = [];
    fabTogglerState = 'inactive';
    algo: boolean = false;
    constructor(public dialog: MatDialog) { }

    ngOnInit(){

    }

    showItems() {
      this.fabTogglerState = 'active';
      this.buttons = this.fabButtons;
    }

    hideItems() {
      this.fabTogglerState = 'inactive';
      this.buttons = [];
    }
  onToggleFab() {
      this.buttons.length ? this.hideItems() : this.showItems();
    }

   private actions(value) {
    
      switch(value){
        case 0:
            this.buttons[value].action(this.dialog);
            break;
        case 1:
            this.algo= this.buttons[value].action(this.algo);
            break;
        default:
          this.buttons[value].action();
      }
      this.onToggleFab();
    }
  }

  export interface FabButtons {
    name: string;
    icon: string;
    action: any;
    colorFab ?: string;
  }