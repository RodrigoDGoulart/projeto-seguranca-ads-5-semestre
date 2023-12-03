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
}

export default new ElephantSqlApi();