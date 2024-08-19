/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProducts1724078646169 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
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
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'quantity',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'quantitySold',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'price',
                        type: 'integer',
                        default: 0,
                    },
                    {
                        name: 'userId',
                        type: 'integer'
                    },
                ],
            }),
        );
        await queryRunner.createForeignKey(
            'products',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',//Nếu một người dùng với id = 1 bị xóa khỏi bảng users, tất cả các sản phẩm liên quan đến userId = 1 trong bảng products cũng sẽ bị xóa.
            }),
        );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('products');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        await queryRunner.dropForeignKey('products', foreignKey);
        await queryRunner.dropTable('products');
    }
}
