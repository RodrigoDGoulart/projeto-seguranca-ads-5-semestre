interface Usuario {
    id: number;
    nome: string;
    email: string;
    descricao: string;
};

interface Post {
    texto: string;
    data: Date;
    usuario: Usuario;
};

export type {
    Usuario,
    Post
}