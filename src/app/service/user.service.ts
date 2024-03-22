import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupaService } from './supa.service';
import supabase from 'src/config/supabaseClient';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private searchTerm = new BehaviorSubject<string | null>(null);
  searchTerm$ = this.searchTerm.asObservable();

  private editRoleTermSubject = new BehaviorSubject<string | null>(null);
  editRoleTerm$ = this.editRoleTermSubject.asObservable();

  constructor(private supaService: SupaService) { }

  updateSearchTerm(searchTerm: string | null) {
    this.searchTerm.next(searchTerm)
  }
  updateEditRoleTerm(editRoleTerm: string | null) {
    this.editRoleTermSubject.next(editRoleTerm);
  }

  async fetchUsers() {
    try{
      const { data, error } = await supabase.from('users-catalog').select('*');
      if (error) {
        throw error;
      }
      return data || [];
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
    
  }
  

  async searchUsers(searchTerm: string) {
    try {
      const { data, error } = await supabase
        .from('users-catalog')
        .select('*')
        .ilike('name', `%${searchTerm}%`);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
  }

  async searchUserRoles(role: string) {
    try {
      const { data, error } = await supabase
        .from('users-catalog')
        .select('*')
        .ilike('role', `%${role}%`);

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error: any) {
      console.error('Error searching user roles:', error.message);
      throw error;
    }
  }
}
