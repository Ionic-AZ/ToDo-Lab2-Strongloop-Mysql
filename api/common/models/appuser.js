module.exports = function (Appuser) {
  console.log('fixing up security');
	Appuser.settings.acls.length = 0;
	Appuser.settings.acls = require('./appuseracl.json'); 
};
