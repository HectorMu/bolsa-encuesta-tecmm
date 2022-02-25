const keys = {
  dev: {
    host: "localhost",
    user: "root",
    password: "",
    database: "template",
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
