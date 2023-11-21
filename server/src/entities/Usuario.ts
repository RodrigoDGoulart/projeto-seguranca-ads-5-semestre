import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name:"usuarios"})
export class Usuario {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 100})
    nome: string;

    @Column({nullable: false, length: 200, unique: true})
    email: string;

    @Column({nullable: false, length: 200})
    senha: string;
}
