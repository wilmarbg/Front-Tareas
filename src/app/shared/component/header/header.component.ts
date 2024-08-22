import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { NavmenuService, Menu } from '../../services/navmenu.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeComponent } from './theme/theme.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ThemeComponent,
    SearchComponent,
    ProfileComponent,
    SvgIconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public menuItems: Menu[] = [];
  public item: Menu[] = [];
  public open = false;
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string = '';
  public show = false;

  constructor(public layout: LayoutService, public navmenu: NavmenuService) {
    this.navmenu.item.subscribe((menuItems: Menu[]) => (this.item = menuItems));
  }

  openMenu() {
    this.navmenu.closeSidebar = !this.navmenu.closeSidebar;
  }
  openSearch() {
    this.show = !this.show;
    this.searchResult = false;
  }

  languageToggle() {
    this.navmenu.language = !this.navmenu.language;
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return (this.menuItems = []);
    let items: Menu[] = [];
    term = term.toLowerCase();
    this.item.forEach((data) => {
      if (data.title?.toLowerCase().includes(term) && data.type === 'link') {
        items.push(data);
      }
      data.children?.filter((subItems) => {
        if (
          subItems.title?.toLowerCase().includes(term) &&
          subItems.type === 'link'
        ) {
          subItems.icon = data.icon;
          items.push(subItems);
        }
        subItems.children?.filter((suSubItems) => {
          if (suSubItems.title?.toLowerCase().includes(term)) {
            suSubItems.icon = data.icon;
            items.push(suSubItems);
          }
        });
        return;
      });
      this.checkSearchResultEmpty(items);
      this.menuItems = items;
    });
    return;
  }

  checkSearchResultEmpty(items: Menu[]) {
    if (!items.length) this.searchResultEmpty = true;
    else this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    document.body.classList.add('offcanvas');
  }

  removeFix() {
    this.searchResult = false;
    this.text = '';
    document.body.classList.remove('offcanvas');
  }

  clickOutside(): void {
    this.show = false;
    this.open = false;
    this.searchResult = false;
    this.searchResultEmpty = false;
    this.navmenu.language = false;
  }
}
