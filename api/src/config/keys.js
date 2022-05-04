const keys = {
  dev: {
    host: "localhost",
    user: "super",
    password: "12345678",
    port: 3306,
    database: "control_egresados",
  },
  production: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

module.exports = keys;
