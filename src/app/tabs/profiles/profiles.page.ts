import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/angular/standalone';
import { ProfileService } from './profile.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddProfileComponent } from './add-profile/add-profile';
import { addIcons } from 'ionicons';
import { personRemove } from 'ionicons/icons';
import { Profile } from 'src/app/interfaces/profile';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    IonLabel,
    IonAvatar,
    IonItem,
    IonList,
    AddProfileComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilesPage {
  protected readonly profileService = inject(ProfileService);
  protected profiles = toSignal(this.profileService.getProfiles());

  constructor() {
    addIcons({ personRemove });
  }

  removeProfile(profile: Profile) {
    this.profileService.removeProfile(profile);
  }
}
