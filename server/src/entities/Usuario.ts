import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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

    @Column({nullable: true, length: 500})
    descricao: string;

    @CreateDateColumn()
    dataCriacao: Date;

    @Column({nullable: false})
    id_politica_privacidade: string;

    @Column({nullable:true})
    politicas_opcionais_aceitas: string;
}
