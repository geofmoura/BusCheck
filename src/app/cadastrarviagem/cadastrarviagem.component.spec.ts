import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router';
import { CadastrarViagemComponent } from './cadastrarviagem.component';
import { Supabase } from '../services/supabase';

describe('CadastrarViagemComponent', () => {
  let component: CadastrarViagemComponent;
  let fixture: ComponentFixture<CadastrarViagemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CadastrarViagemComponent],
      providers: [
        provideRouter([]),
        {
          provide: Supabase,
          useValue: {
            getPassageiroAtual: () => Promise.resolve({ success: false })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarViagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});