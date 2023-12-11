import { Backup as BackupType } from "../types/backup";
import api from "./api";

class Backup {
  async getBackups(): Promise<BackupType> {
    const { data } = await api.request.get('/backup');
    return data;
  }

  async createBackup() {
    await api.request.post('/backup/create')
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }

  async loadBackup() {
    await api.request.post('/backup/restore')
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Backup();