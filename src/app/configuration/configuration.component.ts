import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from 'app/services/configuracion.service';
import { Configuration } from 'app/model/configuracion';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  time = {hour: 13, minute: 30};
  dias = []
  constructor(private configuracionService: ConfigurationService) { 
    for (let i = 1; i < 29; i++) {
      this.dias.push(i);
      
    }
  }

  ngOnInit() {
  }

  saveConfiguracion(dia, hora,forma) {

    var configuration = {} as Configuration;
    configuration.id = 1;
    configuration.dia = dia;
    configuration.hora = hora.hour+':'+hora.minute;
    configuration.calculoGasto = forma;
    this.configuracionService.configuraBoleta(configuration)
    .subscribe(data => {

    });
  }
}
