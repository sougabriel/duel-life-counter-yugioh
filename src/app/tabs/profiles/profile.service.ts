import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilesystemService } from 'src/app/filesystem.service';
import { Profile } from 'src/app/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  protected readonly http = inject(HttpClient);
  protected readonly filesystem = inject(FilesystemService);
  protected readonly apiUrl: string = 'api/profiles.json';

  protected profiles$ = new BehaviorSubject<Profile[]>([]);

  constructor() {
    this.filesystem
      .readDir('/images')
      .then((files) => {
        if (files.files.length > 0) {
          for (let index = 0; index < files.files.length; index++) {
            const file = files.files[index];
            const name = file.name;
            this.filesystem.getImage(file.name).then((result) => {
              const profile: Profile = {
                name: name,
                avatar: result.data as string,
                life: 8000,
              };
              this.addProfile(profile);
            });
          }
        } else {
          this._getProfiles().subscribe((profiles) => {
            for (let index: number = 0; index < profiles.length; index++) {
              const profile = profiles[index];
              profile.life = 8000;
            }
            this.profiles$.next(profiles);
          });
        }

      });
  }

  getProfiles(): Observable<Profile[]> {
    return this.profiles$.asObservable();
  }

  protected _getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }

  addProfile(profile: Profile) {
    const lastProfile = this.profiles$.value;
    profile.life = 8000;
    this.profiles$.next([...lastProfile, profile]);
  }

  removeProfile(profile: Profile) {
    const newProfiles = this.profiles$.value.filter(
      (p) => p.name != profile.name
    );
    this.filesystem.deleteFile(profile.name);
    this.profiles$.next(newProfiles);
  }
}
