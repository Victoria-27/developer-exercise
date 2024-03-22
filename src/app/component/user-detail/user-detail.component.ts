import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interface/profile.interface';
import supabase from 'src/config/supabaseClient';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userId: string | undefined;
  selectedFile: File | null = null;
  user: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.fetchUser();
  }

  fetchUser() {
    supabase
      .from('users-catalog')
      .select('*')
      .eq('id', this.userId)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching user:', error.message);
          return;
        }
        if (data && data.length > 0) {
          this.user = data[0];
        }
      });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  updateUser() {
    if (!this.user) return; // Check if user is defined
    const { name, language, bio, version } = this.user;
    supabase
      .from('users-catalog')
      .update({ name, language, bio, version })
      .eq('id', this.userId)
      .then(({ error }) => {
        if (error) {
          console.error('Error updating user:', error.message);
          return;
        }
        console.log('User updated successfully');
        // Upload profile picture if selected
        if (this.selectedFile) {
          this.uploadProfilePicture();
        }
      });
  }

  uploadProfilePicture() {
    if (!this.user) return; // Check if user is defined
    const formData = new FormData();
    formData.append('file', this.selectedFile as Blob);
    formData.append('id', this.userId || ''); // Handle undefined userId
    supabase.storage
      .from('profile-pictures')
      .upload(`user-${this.userId}`, formData)
      .then(({ data, error }) => {
        if (error) {
          console.error('Error uploading profile picture:', error.message);
          return;
        }
        console.log('Profile picture uploaded successfully');
      });
  }
}
