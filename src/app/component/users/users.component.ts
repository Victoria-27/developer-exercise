import { Component } from '@angular/core';
import supabase from 'src/config/supabaseClient';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router, private userService: UserService) {
    this.userService.searchTerm$.subscribe((searchTerm) => {
      if(searchTerm) {
        this.getSearchTerm(searchTerm)
      }
    })

    this.userService.editRoleTerm$.subscribe((editRoleTerm) => {
      if (editRoleTerm) {
        this.getEditRoleTerm(editRoleTerm)
      }
    })
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.fetchUsers()
  }



    editUser(user: any): void {
      this.router.navigate(['/user-detail', user.id]);
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

    async getSearchTerm(searchTerm: string): Promise<void> {
        this.users = await this.userService.searchUsers(searchTerm)
    }
    async getEditRoleTerm(role: string): Promise<void> {
        this.users = await this.userService.searchUserRoles(role)
    }
}