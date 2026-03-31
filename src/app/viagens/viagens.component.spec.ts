import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ViagensComponent } from './viagens.component';

describe('ViagensComponent', () => {
  let component: ViagensComponent;
  let fixture: ComponentFixture<ViagensComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ViagensComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});