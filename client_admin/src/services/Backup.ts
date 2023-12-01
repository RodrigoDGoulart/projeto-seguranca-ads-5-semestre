import { Backup as BackupType } from "../types/backup";

class Backup {
  async getBackups():Promise<BackupType[]> {
    const retorno = [
      {id: '123', title: 'teste', data: new Date().toISOString()},
      {id: '456', title: 'teste 1', data: new Date().toISOString()},
      {id: '789', title: 'teste 2', data: new Date().toISOString()},
      {id: '111', title: 'teste 3', data: new Date().toISOString()},
    ]
    return retorno;
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