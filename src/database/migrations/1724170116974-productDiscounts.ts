/* eslint-disable prettier/prettier */
import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class ProductDiscounts1724170116974 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'productDiscounts',
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
                        name: 'productId',
                        type: 'integer',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKeys('productDiscounts', [
            new TableForeignKey({
                columnNames: ['discountId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'discounts',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('productDiscounts');
        const discountForeignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('discountId') !== -1,
        );
        const productForeignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('productId') !== -1,
        );

        await queryRunner.dropForeignKey('productDiscounts', discountForeignKey);
        await queryRunner.dropForeignKey('productDiscounts', productForeignKey);
        await queryRunner.dropTable('productDiscounts');
    }
}
