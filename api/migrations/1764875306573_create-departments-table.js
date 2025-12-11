// migrations/1764875306573_create-departments-table.js
exports.up = (pgm) => {
  pgm.createTable('departments', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    organization_id: {
      type: 'uuid',
      notNull: true,
      references: 'organizations(id)',
      onDelete: 'CASCADE',
    },
    parent_id: {
      type: 'uuid',
      references: 'departments(id)',
      onDelete: 'CASCADE',
    },
    name: { type: 'varchar(255)', notNull: true },
    comment: { type: 'text' },
    created_at: {
      type: 'timestamp',
      default: pgm.func('NOW()'),
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('NOW()'),
    },
    deleted_at: {
      type: 'timestamp',
      default: null,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('departments');
};