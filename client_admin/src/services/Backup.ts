import { Backup as BackupType } from "../types/backup";
import api from "./api";

class Backup {
  async getBackups():Promise<BackupType> {
    const { data } = await api.request.get('/backup');
    return data;
  }

  async createBackup(title: string) {
    console.log(title);
  }

  async loadBackup() {
    console.log('load backup');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Backup();