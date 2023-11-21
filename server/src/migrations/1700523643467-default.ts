import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700523643467 implements MigrationInterface {
    name = 'Default1700523643467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "email" character varying(200) NOT NULL, "senha" character varying(200) NOT NULL, CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "texto" character varying(500) NOT NULL, "date" date NOT NULL, "usuario" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "fk_usuario_id" FOREIGN KEY ("usuario") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "fk_usuario_id"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
