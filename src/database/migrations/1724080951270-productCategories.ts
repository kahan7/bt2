/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProductCategories1724080951270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'product_categories',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'productId',
                        type: 'integer',
                    },
                    {
                        name: 'categoryId',
                        type: 'integer',
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
                ],
            })
        );

        await queryRunner.createForeignKey(
            'product_categories',
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'CASCADE',
            })
        );

        await queryRunner.createForeignKey(
            'product_categories',
            new TableForeignKey({
                columnNames: ['categoryId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('product_categories');

        const foreignKeyProduct = table.foreignKeys.find(fk => fk.columnNames.indexOf('productId') !== -1);
        await queryRunner.dropForeignKey('product_categories', foreignKeyProduct);

        const foreignKeyCategory = table.foreignKeys.find(fk => fk.columnNames.indexOf('categoryId') !== -1);
        await queryRunner.dropForeignKey('product_categories', foreignKeyCategory);

        await queryRunner.dropTable('product_categories');
    }
}
