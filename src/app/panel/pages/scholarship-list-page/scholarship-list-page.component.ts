import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';

import { OptionsMenuComponent } from '../../components/options-menu/options-menu.component';
import { ScholarshipCardComponent } from '../../components/scholarship-card/scholarship-card.component';
import { ScholarshipsService } from '../../services/scholarships.service';
import { Scholarship } from '../../interfaces';

@Component({
  imports: [
    RouterModule,
    RouterOutlet,
    OptionsMenuComponent,
    ScholarshipCardComponent,
    MatButtonModule
  ],
  templateUrl: './scholarship-list-page.component.html',
  styleUrl: './scholarship-list-page.component.css',
})
export default class ScholarshipListPageComponent implements OnInit {
  private router = inject(Router);
  private scholarshipsService = inject(ScholarshipsService);

  private _currentRoute = signal('');
  private _categories = signal<string[]>(['TODAS']);
  private _scholarships: Scholarship[] = [];
  private _displayedScholarships = signal<Scholarship[]>([]);
  private _showButton = signal(true);
  private _isShowingAll = signal(false);
  private readonly _size = 9;

  public data = signal([
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

  public currentRoute = computed(() => this._currentRoute());
  public categories = computed(() => this._categories());
  public displayedScholarships = computed(() => this._displayedScholarships());
  public showButton = computed(() => this._showButton());
  public btnText = computed(() => this._isShowingAll() ? 'Ver menos -' : 'Ver más +');

  constructor() {
    // Escuchar los cambios de navegación
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const route = event.urlAfterRedirects.split('/').slice(-1)[0];
        this._currentRoute.set(route);
      });
  }

  ngOnInit(): void {
    this.loadScholarships();
    this.updateCategories();
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
    if (filter === 'Año') {
      this.currentYear.set(value);
    }
    //* Se puede manejar el resto de filtros si se requiere
  }

  private loadScholarships(): void {
    this.scholarshipsService.getScholarships()
      .subscribe((scholarships) => {
        this._scholarships = scholarships;
        this._displayedScholarships.set(scholarships.slice(0, this._size));
      });

    this._showButton.set(this._scholarships.length > this._size);
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
