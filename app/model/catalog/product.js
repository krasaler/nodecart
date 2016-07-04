var bookshelf = require('../base');

var Product = bookshelf.Model.extend({
  tableName: 'product',
  product_option: function() {
    return this.hasMany(ProductOption);
  },
  categories: function() {
    return this.hasMany(Categories);
  },
  descriptions: function() {
    return this.hasMany(ProductDescriptions);
  },
  rewards:function(){
    return this.hasMany(ProductRewards);
  }
});
var ProductOption = bookshelf.Model.extend({
  tableName: 'product_option',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});
var ProductDescriptions = bookshelf.Model.extend({
  tableName: 'product_description',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});
var ProductRewards = bookshelf.Model.extend({
  tableName: 'product_reward',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});
var Categories = bookshelf.Model.extend({
  tableName: 'product_to_category',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});

function * getProducts(){
	var result = [];

	yield Product.fetchAll({withRelated: ['product_option','categories','descriptions','rewards']})
		.then(function (products) {
			 result = products.toJSON();
		}).catch(function(err) {
			console.error(err);
		});

	return result;
}
function * getProduct(product_id){
	var result = [];

	yield Product.where('id', product_id).fetch({withRelated: ['product_option','categories','descriptions','rewards']})
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
