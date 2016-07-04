var bookshelf = require('../base');

var Product = bookshelf.Model.extend({
  tableName: 'product',
  product_option: function() {
    return this.hasMany(ProductOption);
  },
  product_attribute: function() {
    return this.hasMany(ProductAttribute);
  },
  categories: function() {
    return this.hasMany(ProductCategory);
  },
  descriptions: function() {
    return this.hasMany(ProductDescription);
  },
  rewards:function(){
    return this.hasMany(ProductReward);
  }
});

var ProductOption = bookshelf.Model.extend({
  tableName: 'product_option',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});
var ProductDescription = bookshelf.Model.extend({
  tableName: 'product_description',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});
var ProductAttribute = bookshelf.Model.extend({
  tableName: 'product_attribute',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});
var ProductReward = bookshelf.Model.extend({
  tableName: 'product_reward',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});
var ProductCategory = bookshelf.Model.extend({
  tableName: 'product_to_category',
  product: function() {
    return this.belongsTo(Product,'product_id');
  }
});

function * getProducts(){
	var result = [];

	yield Product.fetchAll({withRelated: ['product_option.option_id','categories','descriptions','rewards','product_attribute']})
		.then(function (products) {
			 result = products.toJSON();
		}).catch(function(err) {
			console.error(err);
		});

	return result;
}
function * getProduct(product_id){
	var result = [];

	yield Product.where('id', product_id).fetch({withRelated: ['product_option','categories','descriptions','rewards','product_attribute']})
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
