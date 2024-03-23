import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupaService } from './supa.service';
import supabase from 'src/config/supabaseClient';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private searchTerm = new BehaviorSubject<string | null>(null);
  searchTerm$ = this.searchTerm.asObservable();

  private searchRoleTermSubject = new BehaviorSubject<string | null>(null);
  searchRoleTerm$ = this.searchRoleTermSubject.asObservable();

  showEditRoleButton = new BehaviorSubject<boolean>(false);

  constructor(private supaService: SupaService) {}

  updateSearchTerm(searchTerm: string | null) {
    this.searchTerm.next(searchTerm);
  }
  updateSearchRoleTerm(searchRoleTerm: string | null) {
    this.searchRoleTermSubject.next(searchRoleTerm);
    this.showEditRoleButton.next(!!searchRoleTerm);
  }

  async fetchUsers() {
    try {
      const { data, error } = await supabase.from('profile').select('*');
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
        .from('profile')
        .select('*')
        .ilike('name', `%${searchTerm}%`);

      if (error) {
        throw error;
      }
      console.log('Data received from searchUserRoles API:', data);
      return data || [];
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
  }

  async searchUserRoles(userrole: string) {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .ilike('userrole', `%${userrole}%`);

      if (error) {
        throw error;
      }
      console.log('Data received from searchUserRoles API:', data);
      return data || [];
    } catch (error: any) {
      console.error('Error searching user roles:', error.message);
      throw error;
    }
  }

  // Fetch user by ID
  async fetchUserById(userId: string | undefined): Promise<any> {
    if (!userId) return null;
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', userId);
    if (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }
    return data && data.length > 0 ? data[0] : null;
  }

  // Update user data
  async updateUser(user: any): Promise<void> {
    if (!user || !user.id) return;
    const { error } = await supabase
      .from('profile')
      .update(user)
      .eq('id', user.id);
    if (error) {
      console.error('Error updating user:', error.message);
    } else {
      console.log('User updated successfully');
    }
  }
}
