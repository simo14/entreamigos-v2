angular.module("webapp").service("popup", popup);
popup.$inject = [ "ngDialog" ];

function popup (ngDialog) {
	var vm = this;
	
	vm.abrir = function (mensaje) {
			ngDialog.open({
				template: mensaje,
				className: 'ngdialog-theme-default',
			});
		}
}