import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'app/services/auth.service';
import { SubmissionService } from 'app/services/submission.service';
import { SubmissionModalComponent } from '../submission-modal/submission-modal.component';

@Component({
  selector: 'app-user-submission',
  templateUrl: './user-submission.component.html',
  styleUrls: ['./user-submission.component.scss'],
})
export class UserSubmissionComponent implements OnInit {

  submissions: any[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private authService: AuthService, private submissionService: SubmissionService,     private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    this.loading = true;
    this.error = null;
    this.authService.getCurrentUser().subscribe(
      (user) => {
        if (user && user.submissions) {
          const submissionPromises = user.submissions.map(submission => {
            if (typeof submission === 'object') {
              return Promise.resolve(submission);
            } else {
              return this.submissionService.getSubmission(submission).toPromise();
            }
          });

          Promise.all(submissionPromises)
            .then(resolvedSubmissions => {
              this.submissions = resolvedSubmissions;
              this.loading = false;
            })
            .catch(error => {
              console.error('Error fetching submissions:', error);
              this.error = 'Failed to load submissions. Please try again.';
              this.loading = false;
            });
        } else {
          this.submissions = [];
          this.loading = false;
          if (!user) {
            this.error = 'User not logged in. Please log in to view submissions.';
          }
        }
      },
      (error) => {
        console.error('Error getting current user:', error);
        this.error = 'Failed to load user data. Please try again.';
        this.loading = false;
      }
    );
  }

  async viewSubmission(submission: any) {
    const modal = await this.modalController.create({
      component: SubmissionModalComponent,
      componentProps: {
        submission: submission
      }
    });
    return await modal.present();
  }
}
