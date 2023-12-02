import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1701554370259 implements MigrationInterface {
    name = 'Default1701554370259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "descricao" character varying(500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "descricao"`);
    }

}
