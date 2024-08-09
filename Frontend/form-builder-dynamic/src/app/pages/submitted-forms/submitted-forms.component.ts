import { Component, OnInit } from '@angular/core';
import { Submission } from 'src/app/model/Submission';
import { AuthService } from 'src/app/services/auth.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-submitted-forms',
  templateUrl: './submitted-forms.component.html',
  styleUrls: ['./submitted-forms.component.scss'],
})
export class SubmittedFormsComponent  implements OnInit {
  submissions: Submission[] = [];

  constructor(
    private submissionService: SubmissionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadSubmissions();
  }

  loadSubmissions() {
    const currentUser = this.authService.getCurrentUser();
    this.submissionService.getUserSubmissions(currentUser.id).subscribe(
      (submissions: Submission[]) => {
        this.submissions = submissions;
      },
      (error: any) => {
        console.error('Error fetching submissions', error);
      }
    );
  }

  viewSubmission(submissionId: number) {
    // Implement logic to view a specific submission
    // This could open a modal or navigate to a detailed view
    console.log('Viewing submission:', submissionId);
  }
}
