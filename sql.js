import Expo, { SQLite } from "expo";

const db = SQLite.openDatabase("items11.db");

export function createTable() {
  db.transaction(tx => {
    tx.executeSql(
      "create table if not exists items (id integer primary key AUTOINCREMENT, name text, price float,quantity int, isBought integer);"
    );
  });
}

export function addItme(item) {
  db.transaction(tx => {
    tx.executeSql(
      "insert into items (name, price, quantity, isBought) values (?,?,?,?)",
      [item.name, item.price, item.quantity, item.isBought]
    );
  });
}

export function update(id, isBought) {
  db.transaction(tx => {
    tx.executeSql(`update items set isBought = ? where id = ?;`, [
      isBought,
      id
    ]);
  });
}

export function updateItem(id, name, price, quantity) {
  db.transaction(tx => {
    tx.executeSql(
      `update items set name = ?, price=?, quantity=? where id = ?;`,
      [name, price, quantity, id]
    );
  });
}

export function remove(id) {
  db.transaction(tx => {
    tx.executeSql(`delete from items where id = ?;`, [id]);
  });
}

