import { Component, inject, signal } from '@angular/core';
import {
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonCheckbox,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRefresherContent,
  IonRefresher,
} from '@ionic/angular/standalone';
import { ProfileService } from '../profiles/profile.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Profile } from 'src/app/interfaces/profile';
import { CalculatorService } from 'src/app/calculator.service';
import { addIcons } from 'ionicons';
import { calculator } from 'ionicons/icons';
import { LifeCounterComponent } from 'src/app/life-counter/life-counter.component';

@Component({
  selector: 'app-single-duel',
  templateUrl: 'duel.page.html',
  styleUrls: ['duel.page.scss'],
  standalone: true,
  imports: [
    IonRefresher,
    IonRefresherContent,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonLabel,
    IonCheckbox,
    IonAvatar,
    IonItem,
    IonList,
    IonContent,
    LifeCounterComponent,
  ],
})
export class DuelPage {
  protected readonly profileService = inject(ProfileService);
  protected readonly calc = inject(CalculatorService);
  protected profiles = toSignal(this.profileService.getProfiles());
  selectedProfiles = signal<Profile[]>([]);

  constructor() {
    addIcons({ calculator });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      location.reload();
      event.target.complete();
    }, 1000);
  }

  protected selectProfile(profile: Profile, checkbox: IonCheckbox) {
    const profileExist = this.selectedProfiles().filter(
      (result) => result.name == profile.name
    );
    if (profileExist.length > 0) {
      const newProfiles = this.selectedProfiles().filter(
        (p) => p.name != profile.name
      );
      this.selectedProfiles.set(newProfiles);
      checkbox.checked == false;
    } else {
      profile.life = 8000;
      this.selectedProfiles().push(profile);
      checkbox.checked == true;
    }
  }
}
