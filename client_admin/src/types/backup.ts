interface Backup {
  backup: {
    id: number;
    backup_date: string;
  }
  usuariosExcluidos: number;
  usuarios_criados: number;
  usuarios_editados: number;
}

export type {
  Backup,
}