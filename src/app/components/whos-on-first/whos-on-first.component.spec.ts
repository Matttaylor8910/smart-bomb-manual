import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WhosOnFirstComponent } from './whos-on-first.component';

describe('WhosOnFirstComponent', () => {
  let component: WhosOnFirstComponent;
  let fixture: ComponentFixture<WhosOnFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhosOnFirstComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WhosOnFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
