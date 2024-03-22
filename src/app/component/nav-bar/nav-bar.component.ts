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
  editRoleTerm = new FormControl('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onEditRoleInputChange(event: any): void {
    const editRoleTerm = event.target.value;
    this.userService.updateEditRoleTerm(editRoleTerm);
  }

  onSearchInputChange(event: any): void {
    const searchTerm = event.target.value;
    this.userService.updateSearchTerm(searchTerm);
  }

}
