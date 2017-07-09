import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitHomeComponent } from './fruit-home.component';

describe('FruitHomeComponent', () => {
  let component: FruitHomeComponent;
  let fixture: ComponentFixture<FruitHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
