const db = require("../config/mysql.js").knex,
dayjs = require("dayjs");
class Common {
  insertFields(user=false) {
    return {
      created_by:user?user.id:0,
      created_at:db.fn.now(),
      updated_by:user?user.id:0,
      updated_at:db.fn.now(),
    };
  }
  updateFields(user=false) {
    return {
      created_at:undefined,
      updated_by:user?user.id:0,
      updated_at:db.fn.now(),
    };
  }
  errorsObjectToText(errors){
    let error = '';
    for (const key in errors) {
        error += `(${key} - ${errors[key]}) `;
    }
    return error;
  }
  commonFields() {
    return {
      created_by: 0,
      created_date: new Date(),
      updated_by: 0,
      updated_date: new Date(),
    };
  }
  async extractExistingColumns(table, data, setTblPrefix=false) {
    let columns = await db(table).columnInfo();
    const tableColumns = Object.keys(columns);
    let updatedObj = {};
    Object.keys(data).map(singleRow => {
      if (tableColumns.includes(singleRow) && data[singleRow]!='')
      updatedObj[(setTblPrefix?setTblPrefix+'.':'')+singleRow] = data[singleRow];
    // }
    })
    return updatedObj;
  }
  removeEmptyValuesInObj(inputObject){
    const outputObject = {};
    // Iterate over the keys of the input object
    for (const key in inputObject) {
        // Check if the key exists and its value is not empty
        if (inputObject.hasOwnProperty(key) && inputObject[key] !== "") {
            // Add the key and its value to the output object
            outputObject[key] = inputObject[key];
        }
    }
    return outputObject;
  }
  capitalizeName(name) {
    return name.replace(/\b(\w)/g, function(match) {
        return match.toUpperCase();
    });
  }
}
module.exports = new Common();