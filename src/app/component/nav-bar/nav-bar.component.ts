import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setupSearchTermListener();
    this.setupSearchRoleTermListener();
  }

  private setupSearchTermListener(): void {
    this.searchTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.loadingSearchUsers = true;
        this.searchUsersError = null;
      })
    ).subscribe((searchTerm) => {
      this.userService.updateSearchTerm(searchTerm);
      this.loadingSearchUsers = false;
    });
  }

  private setupSearchRoleTermListener(): void {
    this.searchRoleTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.loadingSearchUserRoles = true;
        this.searchUserRolesError = null;
      })
    ).subscribe((searchRoleTerm) => {
      this.userService.updateSearchRoleTerm(searchRoleTerm);
      this.loadingSearchUserRoles = false;
    });
  }

  onSearchRoleInputChange(event: any): void {
    const searchRoleTerm = event.target.value;
    this.searchRoleTerm.setValue(searchRoleTerm);
  }

  onSearchInputChange(event: any): void {
    const searchTerm = event.target.value;
    this.searchTerm.setValue(searchTerm);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
