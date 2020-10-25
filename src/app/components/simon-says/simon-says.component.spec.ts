import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimonSaysComponent } from './simon-says.component';

describe('SimonSaysComponent', () => {
  let component: SimonSaysComponent;
  let fixture: ComponentFixture<SimonSaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimonSaysComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimonSaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
