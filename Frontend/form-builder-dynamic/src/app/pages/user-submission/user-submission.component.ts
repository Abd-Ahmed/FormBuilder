import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'app/services/auth.service';
import { SubmissionService } from 'app/services/submission.service';
import { SubmissionModalComponent } from '../submission-modal/submission-modal.component';
import { Subscription } from 'rxjs';
import { Submission } from 'app/model/Submission';

@Component({
  selector: 'app-user-submission',
  templateUrl: './user-submission.component.html',
  styleUrls: ['./user-submission.component.scss'],
})
export class UserSubmissionComponent implements OnInit, OnDestroy {

  submissions: Submission[] = [];
  loading: boolean = true;
  error: string | null = null;
  private refreshSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private submissionService: SubmissionService,
    private modalController: ModalController
  ) { }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.loadSubmissions();
    this.refreshSubscription = this.submissionService.refreshSubmissions$.subscribe(
      (shouldRefresh) => {
        if (shouldRefresh) {
          this.loadSubmissions();
        }
      }
    );
  }

  loadSubmissions() {
    this.loading = true;
    this.error = null;
    this.authService.getCurrentUser().subscribe(
      (user) => {
        if (user && user.id) {
          this.submissionService.getUserSubmissions(user.id).subscribe(
            (submissions) => {
              this.submissions = submissions;
              this.loading = false;
            },
            (error) => {
              console.error('Error fetching submissions:', error);
              this.error = 'Failed to load submissions. Please try again.';
              this.loading = false;
            }
          );
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

  async viewSubmission(submission: Submission) {
    const modal = await this.modalController.create({
      component: SubmissionModalComponent,
      componentProps: {
        formData: submission.formData,
        formName: submission.formName,
        submittedAt: submission.submittedAt   
        }
    });
    return await modal.present();
  }
}