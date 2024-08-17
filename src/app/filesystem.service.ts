import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem  } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class FilesystemService {
  protected readonly database = indexedDB;

  constructor() {}

  async addImage(path: string, data: string) {
    const file = await Filesystem.writeFile({
      path: `images/${path}`,
      data: `${data}`,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    return file;
  }

  async getImage(path: string) {
    return await Filesystem.readFile({
      path: `images/${path}`,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  }

  async readDir(path: string) {
    return await Filesystem.readdir({
      path: `${path}`,
      directory: Directory.Documents,
    });
  }

  async deleteFile(path: string) {
    await Filesystem.deleteFile({
      path: `images/${path}`,
      directory: Directory.Documents,
    }).catch(() => {});
  }
}
