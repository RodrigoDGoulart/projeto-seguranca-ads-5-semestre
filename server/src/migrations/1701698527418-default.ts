import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701698527418 implements MigrationInterface {
    name = 'Default1701698527418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "senha" character varying(200) NOT NULL, "descricao" character varying(500), "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "id_politica_privacidade" character varying NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
