/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class OrderItems1724081306367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Đảm bảo bảng discounts đã tồn tại trước khi chạy migration này

        // Tạo bảng order_items
        await queryRunner.createTable(
            new Table({
                name: 'order_items',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'orderId',
                        type: 'integer',
                    },
                    {
                        name: 'productId',
                        type: 'integer',
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                    },
                    {
                        name: 'price',
                        type: 'integer',
                    },
                    {
                        name: 'discountId',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'discountType',
                        type: 'enum',
                        enum: ['percentage', 'fixed'],
                        default: `'percentage'`,
                        isNullable: true,
                    },
                    {
                        name: 'discountAmount',
                        type: 'integer',
                        isNullable: true,
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

        // Tạo khóa ngoại liên kết đến bảng orders
        await queryRunner.createForeignKey(
            'order_items',
            new TableForeignKey({
                columnNames: ['orderId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'orders',
                onDelete: 'CASCADE',
            })
        );

        // Tạo khóa ngoại liên kết đến bảng products
        await queryRunner.createForeignKey(
            'order_items',
            new TableForeignKey({
                columnNames: ['productId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'CASCADE',
            })
        );

        // Tạo khóa ngoại liên kết đến bảng discounts (nếu bảng discounts đã tồn tại)
        await queryRunner.createForeignKey(
            'order_items',
            new TableForeignKey({
                columnNames: ['discountId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'discounts',
                onDelete: 'SET NULL',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('order_items');

        // Xóa các khóa ngoại trước khi xóa bảng
        const foreignKeyOrder = table.foreignKeys.find(fk => fk.columnNames.indexOf('orderId') !== -1);
        await queryRunner.dropForeignKey('order_items', foreignKeyOrder);

        const foreignKeyProduct = table.foreignKeys.find(fk => fk.columnNames.indexOf('productId') !== -1);
        await queryRunner.dropForeignKey('order_items', foreignKeyProduct);

        const foreignKeyDiscount = table.foreignKeys.find(fk => fk.columnNames.indexOf('discountId') !== -1);
        await queryRunner.dropForeignKey('order_items', foreignKeyDiscount);

        // Xóa bảng order_items
        await queryRunner.dropTable('order_items');
    }
}
