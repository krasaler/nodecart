var bookshelf = require('../base');

var Product = bookshelf.Model.extend({
  tableName: 'product',
  product_option: function() {
    return this.hasMany(ProductOption);
  }
});
var ProductOption = bookshelf.Model.extend({
  tableName: 'product_option',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});

function * getProducts(){
	var result = [];

	yield Product.fetchAll({withRelated: ['product_option']})
		.then(function (products) {
			 result = products.toJSON();
		}).catch(function(err) {
			console.error(err);
		});

	return result;
}
function * getProduct(product_id){
	var result = [];

	yield Product.where('product_id', product_id).fetch()
		.then(function (product) {
			 result = product.toJSON();
		}).catch(function(err) {
			console.error(err);
		});

	return result;
}

module.exports = {
	getProducts: getProducts,
	getProduct: getProduct

}
