'use strict';

let mongoose = require('mongoose'),
  Vete = mongoose.model('vete');

exports.list_all_vetes = function (req, res) {
  Vete.find({}, function (err, vete) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(vete);
  });
};

//Crear veterinaria
exports.create_a_vete = function (req, res) {
  let new_vete = new Vete(req.body);
  new_vete.save(function (err, vete) {
    if (err)
      res.status(400).send(err);
    res.status(201).json(vete);
  });
};

//Select
exports.read_a_vete = function (req, res) {
  Vete.findById(req.params.veteId, function (err, vete) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(vete);
  });
};

//Modificación
exports.update_a_vete = function (req, res) {
  Vete.findOneAndUpdate({ _id: req.params.veteId }, req.body, { new: true }, function (err, vete) {
    if (err)
      res.status(400).send(err);
    res.status(201).json(vete);
  });
};

//Eliminación
exports.delete_a_vete = function (req, res) {
  Vete.remove({
    _id: req.params.veteId
  }, function (err, vete) {
    if (err)
      res.status(400).send(err);
    res.status(201).json({ message: 'Juego exitosamente eliminado.' });
  });
}

//Retorna valores
exports.get_vete_count = function (req, res){
  Vete.count({}, function (err, counter) {
    if (err)
      res.status(400).send(err);
    res.status(200).json(counter);
  });
}
