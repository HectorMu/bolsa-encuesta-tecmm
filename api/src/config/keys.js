const keys = {
  dev: {
    host: "localhost",
    user: "root",
    password: "",
    port: "'/var/run/mysqld/mysqld.sock'",
    database: "control_egresados",
  },
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

module.exports = keys;
