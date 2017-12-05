'use strict';

module.exports = function(app) {
	let veteController = require('../controllers/veteController');

  // task Routes
app.route('/vetes')
  .get(veteController.list_all_vetes)
  .post(veteController.create_a_vete);

app.route('/vetes/:veteId')
		.get(veteController.read_a_vete)
		.put(veteController.update_a_vete)
		.delete(veteController.delete_a_vete);
};
