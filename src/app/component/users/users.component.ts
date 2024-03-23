import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from 'src/app/service/user.service';
import { Profile } from 'src/app/interface/profile.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: Profile[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 10;
  searchTerm: FormControl = new FormControl('');
  showEditRoleButton = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.userService.searchTerm$.subscribe((searchTerm) => {
      if (searchTerm) {
        this.searchUsers(searchTerm);
      } else {
        this.fetchUsers();
      }
    });

    this.userService.searchRoleTerm$.subscribe((searchUserRoleTerm) => {
      if (searchUserRoleTerm) {
        this.searchUserRole(searchUserRoleTerm);
      } else {
        this.fetchUsers();
      }
    });

    this.userService.showEditRoleButton.subscribe((showButton) => {
      this.showEditRoleButton = showButton;
    });
  }

  async fetchUsers(): Promise<void> {
    try {
      this.users = await this.userService.fetchUsers();
    } catch (error) {
      this.handleError('Failed to fetch users');
    }
  }

  async searchUsers(searchTerm: string): Promise<void> {
    try {
      this.users = await this.userService.searchUsers(searchTerm);
    } catch (error) {
      this.handleError('Failed to search users');
    }
  }

  async searchUserRole(searchUserRoleTerm: string): Promise<void> {
    try {
      this.users = await this.userService.searchUserRoles(searchUserRoleTerm);
    } catch (error) {
      this.handleError('Failed to search user roles');
    }
  }

  editUser(user: Profile): void {
    this.router.navigate(['/user-detail', user.id]);
  }

  editUserRole(user: Profile): void {
    // Implement editUserRole logic here
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
  }

  getTotalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  getUsersForCurrentPage(): Profile[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  private handleError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
