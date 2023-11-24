import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700791692684 implements MigrationInterface {
    name = 'Default1700791692684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "dataCriacao" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "dataCriacao"`);
    }

}
