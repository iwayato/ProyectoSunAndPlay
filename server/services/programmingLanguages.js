const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// Actualmente la única función que requiere la aplicación
async function getMultiple(parametro, id, global){

  let rows = {};

  if (global === 'true') {
    rows = await db.query(`SELECT * FROM ${parametro}`);
  } else {
    rows = await db.query(`SELECT * FROM ${parametro} WHERE id = ${id}`);
  }

  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

// Las siguientes funciones no estan siendo utilizadas
// Contienen errores con respecto al uso real
async function create(programmingLanguage){

  const result = await db.query(
    `INSERT INTO tacha_00 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    ('${programmingLanguage.name}', ${programmingLanguage.released_year}, ${programmingLanguage.githut_rank}, ${programmingLanguage.pypl_rank}, ${programmingLanguage.tiobe_rank})`
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}

async function update(id, programmingLanguage){
    const result = await db.query(
      `UPDATE tacha_00 
      SET name="${programmingLanguage.name}", released_year=${programmingLanguage.released_year}, githut_rank=${programmingLanguage.githut_rank}, 
      pypl_rank=${programmingLanguage.pypl_rank}, tiobe_rank=${programmingLanguage.tiobe_rank} 
      WHERE id=${id}` 
    );
  
    let message = 'Error in updating programming language';
  
    if (result.affectedRows) {
      message = 'Programming language updated successfully';
    }
  
    return {message};
}

async function remove(id){
    const result = await db.query(
      `DELETE FROM tacha_00 WHERE id=${id}`
    );
  
    let message = 'Error in deleting programming language';
  
    if (result.affectedRows) {
      message = 'Programming language deleted successfully';
    }
  
    return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}