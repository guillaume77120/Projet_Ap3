let connection = require("../config/db");

class Login {
  constructor(row) {
    this.row = row;
  }

  get id() {
    return this.row.id;
  }

  get content() {
    return this.row.content;
  }

  get create_at() {
    return moment(this.row.create_at);
  }

  static connexion(content, cb) {
    connection.query(
      "SELECT * FROM inscription WHERE Email = ? AND Password = ?",
      [content.Email, content.Password],
      (err, rows) => {
        if (err) throw err;
        cb(rows[0]); //commentaire
      }
    );
  }

  static search(content, cb) {
    connection.query(
      "SELECT * FROM inscription WHERE id = ?",
      [content],
      (err, rows) => {
        if (err) throw err;
        cb(rows[0]); //commentaire
      }
    );
  }

  static modifyUser(id, content, cb) {
    connection.query(
      "UPDATE inscription SET Nom = ?, Prenom = ?,Age = ?, Email = ?, adresse = ?, Date = ? WHERE id = ?",
      [
        content.Nom,
        content.Prenom,
        content.Age,
        content.Email,
        content.adresse,
        new Date(),
        id,
      ],
      (err, result2) => {
        console.log(result2);
        if (err) throw err;
        cb(result2);
      }
    );
  }

  static create(content, cb) {
    console.log(content);
    connection.query(
      "INSERT INTO inscription SET Nom = ?, Prenom = ?, Age = ?, Password = ?,Email = ?,adresse = ?,Date = ?",
      [
        content.Nom,
        content.Prenom,
        content.Age,
        content.Password,
        content.Email,
        content.adresse,
        new Date(),
      ],
      (err, result) => {
        if (err) throw err;
        cb(result);
      }
    );
  }

  static all(cb) {
    connection.query("SELECT * FROM messages", (err, rows) => {
      if (err) throw err;

      cb(rows.map((row) => new Login(row)));
    });
  }
}

module.exports = Login;
