module.exports = {
  HOST: "localhost",
  USER: "elhura",
  PASSWORD: "elhura",
  DB: "elhura_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};