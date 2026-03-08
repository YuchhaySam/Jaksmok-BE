import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeTable1772951968163 implements MigrationInterface {
  name = "InitializeTable1772951968163";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_entity\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_9b998bada7cff93fcb953b0c37\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`book_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`realYears\` varchar(255) NOT NULL, \`year\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`pages\` int NOT NULL, \`wikipediaLink\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`book_entity\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_9b998bada7cff93fcb953b0c37\` ON \`user_entity\``,
    );
    await queryRunner.query(`DROP TABLE \`user_entity\``);
  }
}
