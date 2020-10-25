import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComplicatedWiresComponent } from './complicated-wires.component';

describe('ComplicatedWiresComponent', () => {
  let component: ComplicatedWiresComponent;
  let fixture: ComponentFixture<ComplicatedWiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplicatedWiresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplicatedWiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
