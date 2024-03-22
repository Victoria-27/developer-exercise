import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isDropdownOpen = false;
  searchTerm = new FormControl('');
  searchRoleTerm = new FormControl('');
  loadingSearchUsers = false;
  loadingSearchUserRoles = false;
  searchUsersError: string | null = null;
  searchUserRolesError: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.loadingSearchUsers = true;
          this.searchUsersError = null;
        })
      )
      .subscribe((searchTerm) => {
        this.userService.updateSearchTerm(searchTerm);
        this.loadingSearchUsers = false;
      });
// searchUserRoles
    this.searchRoleTerm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.loadingSearchUserRoles = true;
          this.searchUserRolesError = null;
        })
      )
      .subscribe((searchRoleTerm) => {
        this.userService.updateSearchRoleTerm(searchRoleTerm);
        this.loadingSearchUserRoles = false;
      });
  }

  onSearchRoleInputChange(event: any): void {
    const searchRoleTerm = event.target.value;
    this.searchRoleTerm.setValue(searchRoleTerm);
    // this.userService.updateSearchRoleTerm(searchRoleTerm);
  }

  onSearchInputChange(event: any): void {
    const searchTerm = event.target.value;
    this.searchTerm.setValue(searchTerm);
    // this.userService.updateSearchTerm(searchTerm)
  }
}
