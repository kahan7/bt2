/* eslint-disable prettier/prettier */
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class Comments1724170962828 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'comments',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'content',
                        type: 'text',
                    },
                    {
                        name: 'vote',
                        type: 'integer',
                    },
                    {
                        name: 'userId',
                        type: 'integer',
                    },
                    {
                        name: 'productId',
                        type: 'integer',
                    },
                    {
                        name: 'parentId',
                        type: 'integer',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKeys('comments', [
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['parentId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'comments',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('comments');
        const userForeignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('userId') !== -1,
        );
        const productForeignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('productId') !== -1,
        );
        const parentForeignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('parentId') !== -1,
        );

        await queryRunner.dropForeignKey('comments', userForeignKey);
        await queryRunner.dropForeignKey('comments', productForeignKey);
        await queryRunner.dropForeignKey('comments', parentForeignKey);
        await queryRunner.dropTable('comments');
    }
}
