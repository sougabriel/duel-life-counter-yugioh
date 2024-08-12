import { Component, inject, input, viewChild } from '@angular/core';
import { Profile } from '../interfaces/profile';
import {
  IonButton,
  IonIcon,
  IonContent,
  IonButtons,
  IonTitle,
  IonToolbar,
  IonModal,
  IonHeader,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { addIcons } from 'ionicons';
import { add, calculator, remove, skull, speedometer } from 'ionicons/icons';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-life-counter',
  templateUrl: './life-counter.component.html',
  styleUrls: ['./life-counter.component.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonFabButton,
    IonFab,
    IonHeader,
    IonModal,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonIcon,
    IonButton,
  ],
})
export class LifeCounterComponent {
  protected readonly calc = inject(CalculatorService);

  modal = viewChild<IonModal>('modal');
  profile = input.required<Profile>();

  close() {
    this.modal()!.dismiss(this.profile, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

  constructor() {
    addIcons({ add, remove, skull, speedometer, calculator });
  }
}
