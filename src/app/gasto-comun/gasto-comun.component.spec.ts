import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoComunComponent } from './gasto-comun.component';

describe('GastoComunComponent', () => {
  let component: GastoComunComponent;
  let fixture: ComponentFixture<GastoComunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoComunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastoComunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
