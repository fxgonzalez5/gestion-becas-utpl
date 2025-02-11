import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { OptionsMenuComponent } from '../../components/options-menu/options-menu.component';
import { ScholarshipCardComponent } from '../../components/scholarship-card/scholarship-card.component';
import { AuthService } from '../../../../auth/services/auth.service';
import { ScholarshipsService } from '../../services/scholarships.service';
import { Scholarship } from '../../interfaces';

@Component({
  imports: [
    MatButtonModule,
    OptionsMenuComponent,
    ScholarshipCardComponent,
  ],
  templateUrl: './scholarship-list-page.component.html',
  styleUrl: './scholarship-list-page.component.css',
})
export default class ScholarshipListPageComponent implements OnInit {
  private userId = inject(AuthService).currentUser()!.id;
  private scholarshipsService = inject(ScholarshipsService);

  private _categories = signal<string[]>(['TODAS']);
  private _scholarships: Scholarship[] = [];
  private _recommendedScholarships = signal<Scholarship[]>([]);
  private _displayedScholarships = signal<Scholarship[]>([]);
  private _size = 9;
  private _showButton = signal(true);
  private _isShowingAll = signal(false);

  private data = signal([
    {
      year: 2024,
      academicPeriod: ['ABRIL-AGOSTO', 'OCTUBRE-FEBRERO'],
      modality: ['PRESENCIAL', 'DISTANCIA'],
    },
    {
      year: 2025,
      academicPeriod: [],
      modality: [],
    },
  ]).asReadonly();

  public filters = signal<string[]>(['Año', 'Período', 'Modalidad']).asReadonly();
  public currentYear = signal<string>(this.data()[0].year.toString());
  public currentPeriod = signal<string>(this.data()[0].academicPeriod[0]);
  public currentModality = signal<string>(this.data()[0].modality[0]);
  public currentCategory = signal<string>('TODAS');

  public categories = computed(() => this._categories());
  public recommendedScholarships = computed(() => this._recommendedScholarships());
  public displayedScholarships = computed(() => this._displayedScholarships());
  public showButton = computed(() => this._showButton());
  public btnText = computed(() => this._isShowingAll() ? 'Ver menos -' : 'Ver más +');

  ngOnInit(): void {
    this.checkUserApplication();
    this.loadScholarships();
  }

  getOptions(filter: string): string[] {
    const options = this.data().find((item) => item.year.toString() === this.currentYear());

    if (!options) return [];

    switch (filter) {
      case 'Período':
        return options.academicPeriod;
      case 'Modalidad':
        return options.modality;
      default:
        return this.data().map((item) => item.year.toString());
    }
  }

  onFilterChange(value: string, filter: string): void {
    switch (filter) {
      case 'Año':
        this.currentYear.set(value);
        this.checkUserApplication();
        this.loadScholarships();
      break;
      case 'Período':
        this.currentPeriod.set(value);
        this.checkUserApplication();
        this.loadScholarships();
        break;
      case 'Modalidad':
        this.currentModality.set(value);
        this.checkUserApplication();
        this.loadScholarships();
        break;
      case 'Categoría':
        this.currentCategory.set(value);
        this.updateDisplayedScholarships();
        break;
    }

  }

  private checkUserApplication(): void {
    this.scholarshipsService.hasUserApplied(this.userId, Number(this.currentYear()), this.currentPeriod(), this.currentModality()).subscribe();
  }

  private loadScholarships(): void {
    this.scholarshipsService.getScholarships()
      .subscribe((scholarships) => {
        if (this.currentYear() === this.data()[0].year.toString() && this.currentPeriod() === this.data()[0].academicPeriod[1] && this.currentModality() === this.data()[0].modality[0]) {
          const nonRecommendedScholarships = this.loadRecommendedScholarships(scholarships);
          this._scholarships = nonRecommendedScholarships;
          this._size = 4;
        } else {
          this._recommendedScholarships.set([]);
          this._scholarships = scholarships;
          this._size = 9;
        }
        this._displayedScholarships.set(this._scholarships.slice(0, this._size));
        this._showButton.set(this._scholarships.length > this._size);
        this.updateCategories();
      });
  }

  private loadRecommendedScholarships(scholarships: Scholarship[]): Scholarship[] {
    // Obtener IDs recomendados
    const recommendedIds = this.scholarshipsService.recommendedScholarships();

    // Separar becas
    const recommended: Scholarship[] = [];
    const nonRecommended: Scholarship[] = [];

    scholarships.forEach(scholarship => {
      recommendedIds.includes(scholarship.id) ? recommended.push(scholarship) : nonRecommended.push(scholarship);
    });

    this._recommendedScholarships.set(recommended);
    return nonRecommended;
  }


  private updateDisplayedScholarships(): void {
    if (this.currentCategory() !== 'TODAS') {
      const filteredScholarships = this._scholarships.filter(
        (scholarship) => scholarship.category.toLowerCase() === this.currentCategory().toLowerCase()
      );
      this._displayedScholarships.set(filteredScholarships);
      return;
    }

    this._displayedScholarships.set(this._scholarships);
    this._isShowingAll.set(true);
    this._showButton.set(false);
  }

  private updateCategories(): void {
    const uniqueCategories = new Set(this._scholarships.map((scholarship) => scholarship.category));
    this._categories.update((categories) => [...categories, ...uniqueCategories]);
  }

  onLoadMore(): void {
    if (this._isShowingAll()) {
      // Ver menos
      this._displayedScholarships.set(this._scholarships.slice(0, this._size));
      this._isShowingAll.set(false);
      this._showButton.set(true);
    } else {
      // Ver más
      this._displayedScholarships.set(this._scholarships);
      this._isShowingAll.set(true);
      this._showButton.set(false);
    }
  }
}
