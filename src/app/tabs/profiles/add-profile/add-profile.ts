import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  IonTitle,
  IonButton,
  IonModal,
  IonButtons,
  IonItem,
  IonInput,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  IonFab,
  IonFabButton,
  IonToast,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { FilesystemService } from 'src/app/filesystem.service';
import { Profile } from 'src/app/interfaces/profile';
import { ProfileService } from '../profile.service';
import { addIcons } from 'ionicons';
import { personAdd } from 'ionicons/icons';

@Component({
  selector: 'app-add-profile',
  standalone: true,
  imports: [
    IonToast,
    IonFabButton,
    IonFab,
    IonIcon,
    IonContent,
    IonToolbar,
    IonHeader,
    IonInput,
    IonItem,
    IonButtons,
    IonModal,
    IonButton,
    IonTitle,
  ],
  templateUrl: './add-profile.html',
  styleUrl: './add-profile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProfileComponent {
  protected readonly fileService = inject(FilesystemService);
  protected readonly profileService = inject(ProfileService);

  protected disable: boolean = true;

  constructor() {
    addIcons({ personAdd });
  }

  modal = viewChild<IonModal>('modal');
  input = viewChild<IonInput>('name');

  filedata = signal<string>('');

  cancel() {
    this.modal()!.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal()!.dismiss(this.filedata(), 'confirm');
  }

  uploadImage(event: any) {
    const file: File = event.target!.files[0];
    if (file) {
      const reader = new FileReader();
      this.disable = false;
      reader.onload = (event: ProgressEvent) => {
        this.filedata.set((event.target as FileReader).result?.toString()!);
      };
      reader.readAsDataURL(file);
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm' && this.filedata() != '') {
      const name: string = this.input()?.value?.toString()! || 'default';
      this.fileService.addImage(name, this.filedata()).then(() => {
        const profile: Profile = {
          name: name,
          avatar: this.filedata(),
        };
        this.profileService.addProfile(profile);
      });
    }
  }
}
