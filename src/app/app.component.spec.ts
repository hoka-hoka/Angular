import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import AppComponent from './app.component';
import UISelectBooleanButtonModule from './components/ui-select-boolean-button/ui-select-boolean-button.module';
import UIDropDownModule from './components/ui-drop-down/ui-drop-down.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        UISelectBooleanButtonModule,
        UIDropDownModule,
      ],
      providers: [],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
