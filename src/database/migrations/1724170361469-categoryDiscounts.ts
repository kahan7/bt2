/* eslint-disable prettier/prettier */
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CategoryDiscounts1724170361469 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categoryDiscounts',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'discountId',
                        type: 'integer',
                    },
                    {
                        name: 'categoryId',
                        type: 'integer',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKeys('categoryDiscounts', [
            new TableForeignKey({
                columnNames: ['discountId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'discounts',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['categoryId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('categoryDiscounts');
        const discountForeignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('discountId') !== -1,
        );
        const categoryForeignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('categoryId') !== -1,
        );

        await queryRunner.dropForeignKey('categoryDiscounts', discountForeignKey);
        await queryRunner.dropForeignKey('categoryDiscounts', categoryForeignKey);
        await queryRunner.dropTable('categoryDiscounts');
    }
}
