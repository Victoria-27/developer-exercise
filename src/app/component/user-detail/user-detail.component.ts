import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interface/profile.interface';
import { UserService } from 'src/app/service/user.service';
import supabase from 'src/config/supabaseClient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId: string | undefined;
  selectedFile: File | null = null;
  user: any;
  isLoading: boolean = false;
  // profilePicture!: string;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, private snackBar: MatSnackBar) {}

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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

   async updateUser() {
    this.isLoading = true;
    if (!this.user) return;

    this.userService.updateUser(this.user)
      .then(() => {
        console.log('User updated successfully');
        this.openSnackBar('User updated successfully');
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      })
      .catch(error => {
        console.error('Error updating user:', error.message);
        this.openSnackBar('Error updating user');
      });
      this.isLoading = false;
  }
   

  async uploadProfilePicture(event: any): Promise<void> {
    if (!this.user) return;
  
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = async (e: any) => {
      const imageDataUrl: string = e.target.result;
  console.log(imageDataUrl)
  
      // this.user.profilePicture = imageDataUrl;
      // this.user['profile-pic-id'] = imageDataUrl;
    const publicUrl = await this.userService.
    uploadProfilePicture(file);
      console.log(publicUrl, 'public url')
      this.user.profile_picture = publicUrl
      // Display success message
      this.openSnackBar('Profile picture uploaded successfully');
      
      const profilePictureElement = document.getElementById('profile-picture');
      if (profilePictureElement) {
        profilePictureElement.setAttribute('src', imageDataUrl);
        // this.profilePicture = imageDataUrl
      }
    };
  
    reader.readAsDataURL(file);
  }
  
  
editProfile(): void {
  // Implement edit profile logic here
}

openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
  });
}
}