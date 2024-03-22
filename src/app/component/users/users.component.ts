import { Component } from '@angular/core';
import supabase from 'src/config/supabaseClient';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: FormControl = new FormControl('');
  showEditRoleButton = false;

  constructor(private router: Router, public userService: UserService) {
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
    })

    this.userService.showEditRoleButton.subscribe((showButton) => {
      this.showEditRoleButton = showButton;
    });
  }


  async ngOnInit(): Promise<void> {
    this.fetchUsers();
  }


  async fetchUsers(): Promise<void> {
    this.users = await this.userService.fetchUsers();
  }

  async searchUsers(searchTerm: string): Promise<void> {
    this.users = await this.userService.searchUsers(searchTerm);
  }
  async searchUserRole(searchUserRoleTerm: string): Promise<void> {
    this.users = await this.userService.searchUserRoles(searchUserRoleTerm);
  }
  
    editUser(user: any): void {
      this.router.navigate(['/user-detail', user.id]);
    }

    editUserRole(user: any): void {
      // Implement editUserRole logic here
    }
  
    onPageChange(pageNumber: number): void {
      this.currentPage = pageNumber;
    }
  
    getTotalPages(): number {
      return Math.ceil(this.users.length / this.itemsPerPage);
    }

    getUsersForCurrentPage(): any[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.users.slice(startIndex, endIndex);
    }
}