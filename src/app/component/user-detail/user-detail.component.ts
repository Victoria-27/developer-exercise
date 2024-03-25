import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/interface/profile.interface';
import { UserService } from 'src/app/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId: string | undefined;
  selectedFile: File | null = null;
  user!: Profile;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

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

    this.userService
      .updateUser(this.user)
      .then(() => {
        this.openSnackBar('User updated successfully');
      })
      .catch((error) => {
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
      const publicUrl = await this.userService.uploadProfilePicture(file);
      this.user.profile_picture = publicUrl;
      this.openSnackBar('Profile picture uploaded successfully');

      const profilePictureElement = document.getElementById('profile-picture');
      if (profilePictureElement) {
        profilePictureElement.setAttribute('src', imageDataUrl);
      }
    };

    reader.readAsDataURL(file);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
