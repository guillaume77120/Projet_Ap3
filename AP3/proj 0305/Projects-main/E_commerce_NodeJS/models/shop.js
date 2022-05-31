let connection = require("../config/db");

class Shop {
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
//recupere un
  static list1Produit(idProd,cb) {
    connection.query(
      "SELECT * FROM `produits` LEFT JOIN photosproduits ON produits.id_photo = photosproduits.id WHERE idProd = ?",
      [idProd],
      (err, rows) => {
        if (err) throw err;
        cb(rows); //commentaire
      }
    );
  }
//afficher tout les produits
  static listProduits(cb) {
    connection.query(
      "SELECT * FROM `produits` LEFT JOIN photosproduits ON produits.id_photo = photosproduits.id LEFT JOIN fonds_photos ON photosproduits.id_FondImg = fonds_photos.id",
      (err, rows) => {
        if (err) throw err;
        cb(rows); //commentaire
      }
    );
  }

  static listFonds(cb) {
    connection.query("SELECT * FROM `fonds_photos` ", (err, rows) => {
      if (err) throw err;
      cb(rows); //commentaire
    });
  }

  static recupPhoto(content, cb) {
    connection.query(
      "SELECT * FROM photosproduits WHERE id = ?",
      [content],
      (err, rows) => {
        if (err) throw err;
        cb(rows); //commentaire
      }
    );
  }

  static getLastId(cb) {
    connection.query(
      "SELECT MAX(id) AS max_id FROM photosproduits",
      (err, result) => {
        if (err) throw err;
        {
          cb(result);
        }
      }
    );
  }

  static getLastIdFond(cb) {
    connection.query(
      "SELECT MAX(id) AS max_id FROM fonds_photos",
      (err, result) => {
        if (err) throw err;
        {
          cb(result);
        }
      }
    );
  }

  static createFond(content, imgName, cb) {
    console.log("nom de fond:" + content.libelFond);

    connection.query(
      "INSERT INTO fonds_photos SET libel = ?, photo = ?",
      [content.libelFond, imgName],
      (err, result) => {
        if (err) throw err;
        {
          cb(result);
        }
      }
    );
  }

  static deleteAll(table, cb) {
    const fs = require("fs");
    const path = require("path");
    var chemin = "img/" + table;
    const directory = chemin;

    connection.query("TRUNCATE " + table, (err, result) => {
      if (err) throw err;
      {
        console.log(table + " : table truncate");

        fs.readdir(directory, (err, files) => {
          if (err) throw err;

          for (const file of files) {
            fs.unlink(path.join(directory, file), (errDelete) => {
              console.error("erreur delete :" + errDelete);
              if (err) throw err;
            });
          }
        });
      }
    });
  }

  static createProduit(content, imgName, cb) {
    console.log("nom de limg:" + imgName);
    var idPhoto = imgName.substring(
      imgName.indexOf("-") + 1,
      imgName.indexOf(".")
    );

    connection.query(
      "INSERT INTO produits SET libelle = ?, description = ?, id_sous_categ = 1, prix = ?,id_photo = ?,Date = ?",
      [content.libel, content.descProd, content.prix, idPhoto, new Date()],
      (err, result) => {
        if (err) throw err;
        {
          connection.query(
            "INSERT INTO photosproduits SET LienPhoto1 = ?, id_FondImg = ?",
            [imgName, content.fonds],
            (err, result) => {
              if (err) throw err;
              {
                cb(result);
              }
            }
          );
        }
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

module.exports = Shop;
