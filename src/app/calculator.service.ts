import { Injectable } from '@angular/core';
import { Profile } from './interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  sumLife(life: number, profile: Profile) {
    return (profile.life! += life);
  }

  subLife(life: number, profile: Profile) {
    profile.life! -= life;
    if (profile.life! < 0) {
      profile.life! = 0;
    }
  }

  halfLife(profile: Profile) {
    return (profile.life! /= 2);
  }

  doubleLife(profile: Profile) {
    return (profile.life! *= 2);
  }

  kill(profile: Profile) {
    return profile.life! = 0;
  }

  reset(profile: Profile) {
    return profile.life = 8000;
  }

  resetAll(profiles: Profile[]) {
    for (let index = 0; index < profiles.length; index++) {
      const profile = profiles[index];
      profile.life = 8000;
    }
  }
}
