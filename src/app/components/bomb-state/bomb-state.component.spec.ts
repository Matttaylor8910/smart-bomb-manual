import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BombStateComponent } from './bomb-state.component';

describe('BombStateComponent', () => {
  let component: BombStateComponent;
  let fixture: ComponentFixture<BombStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BombStateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BombStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
