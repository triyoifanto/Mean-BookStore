'use strict';

//Controll service used for managing  controlls rendering
angular.module('users').factory('Controlls', [ 
	function () { 
		return { 
			isRenderCtrl: function (user) { 
				for (var userRoleIndex in user.roles) { 
					if ('user' === user.roles[userRoleIndex]) { 
						return true; 
					} 
				} 
				return false; 
			} 
		}; 
	}
]);