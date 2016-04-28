(function(){
	'use strict';

	angular
		.module('shopApp')
		.controller('AdminCtrl',AdminCtrl);

	function AdminCtrl($scope,$state,productSrv, products){
		var adminVm = this;
		adminVm.productSrv = productSrv;

		//Setting Categories on Admin load
		productSrv.setCategories();

		//check if logged in
		if(localStorage.authToken == undefined || localStorage.authToken == null){
			$state.go('auth');
		}
					
		adminVm.products = products;
		console.log(adminVm.products);
		if(productSrv.products.length > 0 ){
			adminVm.is_products = true;
		}

		//watch for updates to products object
		$scope.$watch(function(){
	    	return productSrv.products;
		}, function (newValue) {
			if(productSrv.products.length > 0){
			    adminVm.products = productSrv.products;
			    adminVm.is_products = true;
			}
		});

		//public functions
		adminVm.editProduct = editProduct;
		adminVm.logout = logout;

		function editProduct(product){
			$state.go('admin.edit_product',{productId:product.id});
		}

		function logout(){
			localStorage.removeItem('authToken');
			$state.go('auth');
		}

	}
})();


