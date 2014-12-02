var House = Backbone.Model.extend({});

var HouseList = Backbone.Collection.extend({
	model: House,
	url: '/api/houses'
});

var HouseView = Backbone.View.extend({
	tagName: 'li',
	render: function(){
		this.$el.html(this.model.get('name'));
		return this;
	}
});

var HouseListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "reset", this.render);
	},
	render: function(){
		this.$el.empty();
		var that = this;
		this.collection.each(function(house){
			var view = new HouseView({model: house});
			that.$el.append(view.render().$el);
		});
		return this;
	}
});


var houses = new HouseList();
var housePainter;

$(function(){
	housePainter = new HouseListView({
		el: $('ul.houses'),
		collection: houses
	});
	houses.fetch({reset: true});
});