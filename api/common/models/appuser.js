module.exports = function(Appuser) {
	Appuser.settings.acls.length = 0;
	Appuser.settings.acls = require('./appuseracl.json'); 
};
