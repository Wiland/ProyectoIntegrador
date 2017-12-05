const veteSchema = require("../models/vetes"),
      db = require("./connection");

module.exports = {
    veteModel: db.model('vetes', veteSchema)
};
