import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interface/profile.interface';
import { UserService } from 'src/app/service/user.service';
import supabase from 'src/config/supabaseClient';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId: string | undefined;
  // selectedFile: File | null = null;
  user: any;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.fetchUser();
  }

  async fetchUser() {
    this.isLoading = true;
    this.user = await this.userService.fetchUserById(this.userId);
    this.isLoading = false;
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

   async updateUser() {
    this.isLoading = true;
    if (!this.user) return;

    this.userService.updateUser(this.user)
      .then(() => {
        console.log('User updated successfully');
        // Redirect or perform any additional actions after update
      })
      .catch(error => {
        console.error('Error updating user:', error.message);
      });
      this.isLoading = false;
  }
   

  // uploadProfilePicture() {
  //   if (!this.user) return; // Check if user is defined
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile as Blob);
  //   formData.append('id', this.userId || ''); // Handle undefined userId
  //   supabase.storage
  //     .from('profile-pictures')
  //     .upload(`user-${this.userId}`, formData)
  //     .then(({ data, error }) => {
  //       if (error) {
  //         console.error('Error uploading profile picture:', error.message);
  //         return;
  //       }
  //       console.log('Profile picture uploaded successfully');
  //     });
  // }
}
