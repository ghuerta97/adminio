import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { OptionsInput } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss']
})
export class CalendarEventsComponent implements OnInit {

  options: OptionsInput;

  constructor() { }

  ngOnInit() {
    this.options = {
      editable: true,
      header: {
        left: 'title',
        center: 'dayGridMonth,timeGridWeek,listWeek',
        right: 'prev,next,today'
      },
      buttonIcons: {
        prev: 'fa-chevron-left',
        next: 'fa-chevron-right'
      },
      plugins: [dayGridPlugin, interactionPlugin, bootstrapPlugin, timeGridPlugin, listPlugin],
      themeSystem: 'bootstrap',
      defaultView: 'dayGridMonth',
      events: 'https://fullcalendar.io/demo-events.json'
    };
  }

  eventClick(model) {
    console.log('eventClick')
    console.log(model);
  }

}
