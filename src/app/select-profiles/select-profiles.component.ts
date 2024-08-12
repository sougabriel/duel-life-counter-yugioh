import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild, viewChildren } from '@angular/core';
import {
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonAvatar,
  IonCheckbox,
  IonLabel,
  IonHeader,
  IonInput,
  IonModal,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProfileService } from '../tabs/profiles/profile.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-select-profiles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonTitle,
    IonButton,
    IonButtons,
    IonToolbar,
    IonModal,
    IonInput,
    IonHeader,
    IonLabel,
    IonCheckbox,
    IonAvatar,
    IonIcon,
    IonItem,
    IonList,
    IonContent,
  ],
  templateUrl: './select-profiles.component.html',
  styleUrls: ['./select-profiles.component.scss'],
  standalone: true,
})
export class SelectProfilesComponent {
  protected readonly profileService = inject(ProfileService);
  protected profiles = toSignal(this.profileService.getProfiles());

  selectedProfiles = signal<Profile[]>([]);

  modal = viewChild<IonModal>('modalSelect');
  check = viewChild<IonCheckbox>('check');

  protected selectProfile(profile: Profile) {
    const profileExist = this.selectedProfiles().filter(
      (result) => result.name == profile.name
    );
    if (profileExist.length > 0) {
      const newProfiles = this.selectedProfiles().filter(
        (p) => p.name != profile.name
      );
      this.selectedProfiles.set(newProfiles);
    } else {
      this.selectedProfiles().push(profile);
    }
  }

  protected cancel() {
    this.modal()!.dismiss(null, 'cancel');
  }

  protected confirm() {
    this.modal()!.dismiss(this.selectedProfiles, 'confirm');
  }

  protected onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(this.selectedProfiles())
    }
  }

  constructor() {}
}
