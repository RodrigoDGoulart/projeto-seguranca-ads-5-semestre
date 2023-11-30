class Admin {
  async auth(auth: {user: string, senha: string}) {
    const token = '3213iuy123iuy'
    sessionStorage.setItem('token', token);
    return {token}
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Admin();