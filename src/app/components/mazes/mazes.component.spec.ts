import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MazesComponent } from './mazes.component';

describe('MazesComponent', () => {
  let component: MazesComponent;
  let fixture: ComponentFixture<MazesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MazesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
