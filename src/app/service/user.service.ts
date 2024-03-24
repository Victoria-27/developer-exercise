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
    console.log(user, "USER")
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

  async toggleUserRole(userId: string): Promise<void> {
    // Fetch user from Supabase backend
    const user = await this.fetchUserById(userId);
    
    // Toggle user role locally
    if (user) {
      user.userrole = user.userrole === 'Admin' ? 'User' : 'Admin';
      
      // Update user role in Supabase backend
      await supabase
        .from('profile')
        .update({ userrole: user.userrole })
        .eq('id', userId);
    }
  }

  async uploadProfilePicture(file: File): Promise<string> {
    console.log(file, 'kkkkkkkk')
    const { data, error } = await supabase.storage
      .from('savedpictures')
      .upload(file.name,file);
  
    if (error) {
      console.log(error)
      throw error;
    }
  console.log(data)
  let url = ''
  if(data) {
    interface Test {
      path: string,
      fullPath: string
    }
    const fullPath = (data as Test).path

    const { data: publicUrl } = supabase
  .storage
  .from('savedpictures')
  .getPublicUrl(fullPath)
  console.log(publicUrl)
  url = publicUrl.publicUrl
  }
  return url
    // return data?.path || ''; // Check the correct property name for the URL or key
  }
  

//   async updateUserProfilePicture(userId: string, imageUrl: string): Promise<void> {
//     try {
//       await supabase.from('profile').update({ profilePicture: imageUrl }).eq('id', userId);
//       console.log('User profile picture updated successfully');
//     } catch (error: any) {
//       console.error('Error updating user profile picture:', error.message);
//       throw error;
//     }
  
// }
}
