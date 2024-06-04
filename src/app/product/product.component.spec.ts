import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ProductService } from '../service/product/product.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Product } from 'src/Models/Product.model';
import { ProductType } from 'src/Models/ProductType.enum';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['createProduct', 'updateProduct', 'getProducts', 'setId']);

    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        FormsModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mode to create', () => {
    component.toggleToCreate();
    expect(component.mode).toBe('create');
  });

  it('should toggle mode to update', () => {
    component.toggleToUpdate();
    expect(component.mode).toBe('update');
  });

  it('should show error message if price is less than 0', () => {
    spyOn(component, 'showErrorMessage');
    component.product = { id: 1, title: 'Test Product', productType: ProductType.DEFAULT, price: -1 };
    component.onSubmit();
    expect(component.showErrorMessage).toHaveBeenCalledWith('Price must be greater than 0');
  });

  it('should show error message if title is empty', () => {
    spyOn(component, 'showErrorMessage');
    component.product = { id: 1, title: '', productType: ProductType.DEFAULT, price: 10 };
    component.onSubmit();
    expect(component.showErrorMessage).toHaveBeenCalledWith('Title must be non Empty');
  });
});
