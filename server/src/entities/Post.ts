import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";

@Entity({ name: "posts" })
export class Post {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'usuario',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_usuario_id'
    })
    usuario: Usuario;

    @Column({ nullable: false, length: 500 })
    texto: string;

    @Column({ type: 'date' })
    date: Date;
}
