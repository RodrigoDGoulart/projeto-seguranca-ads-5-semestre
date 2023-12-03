import * as dotenv from 'dotenv';
dotenv.config();

const elephant_base_url = 'https://api.elephantsql.com/api/backup'

class ElephantSqlApi {
  public async getBackups() {
    const res = await fetch(elephant_base_url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(process.env.DB_BACKUP_USERNAME + ':' + process.env.DB_BACKUP_API_KEY)
      }
    });
    const data = await res.json();
    return data;
  }

  public async createBackup() {
    const res = await fetch(elephant_base_url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(process.env.DB_BACKUP_USERNAME + ':' + process.env.DB_BACKUP_API_KEY),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        callback: process.env.BACKUP_CALLBACK_URL
      })
    });
    const code = res.status;
    const data = code === 200 ? {} : await res.json();
    return {data, code};
  }
}

export default new ElephantSqlApi();