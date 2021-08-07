const Promise = require('bluebird');

module.exports = (db) => {
  if (!db.queryAsync) {
    db = Promise.promisifyAll(db);
  }

  // Create a table

  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS mytable  (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      Name VARCHAR(255),
      urlImage VARCHAR (255)
    );`)
    .error(err => {
      console.log(err);
    });
};