import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WiresComponent } from './wires.component';

describe('WiresComponent', () => {
  let component: WiresComponent;
  let fixture: ComponentFixture<WiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WiresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
