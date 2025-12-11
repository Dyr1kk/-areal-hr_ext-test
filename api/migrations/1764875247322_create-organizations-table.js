exports.up = (pgm) => {
  pgm.createTable('organizations', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
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
  pgm.dropTable('organizations');
};