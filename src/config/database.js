/**
 * @overview database
 *
 * @description
 * This file contains the database configurations.
 */
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'module01',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
