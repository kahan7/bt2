/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Orders1724081088754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'orders',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'buyerName',
                        type: 'varchar',
                    },
                    {
                        name: 'buyerPhone',
                        type: 'varchar',
                    },
                    {
                        name: 'buyerEmail',
                        type: 'varchar',
                    },
                    {
                        name: 'buyerAddress',
                        type: 'varchar',
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
                        name: 'status',
                        type: 'enum',
                        enum: ['pending', 'confirm', 'cancel'],
                        default: `'pending'`,
                    },
                    {
                        name: 'userId',
                        type: 'integer',
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('orders');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
        await queryRunner.dropForeignKey('orders', foreignKey);
        await queryRunner.dropTable('orders');
    }
}
