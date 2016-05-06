var InvoiceItemModel = Backbone.Model.extend({
  defaults: {
    quantity: 1,
    description: 'itme',
    price: 21.22
  }
});

var InvoiceItemCollection = Backbone.Collection.extend({
  model: InvoiceItemModel
});

var InvoiceItemView = Backbone.View.extend({

  tagName: 'tr',

  render: function() {
    $(this.el).html(_.map([
      this.model.get('quantity'),
      this.model.get('description'),
      this.model.get('price'), this.calculateAmount()

    ], function(val, key) {
      return '<td>' + val + '</td>'
    }));
    return this;
  },

  calculateAmount: function(){
      return this.model.get('price')*this.model.get('quantity');
      }


});

var InvoiceItemListView = Backbone.View.extend({

  tagName: 'table',

  className: 'invoice-item-view',

  render: function() {

    $(this.el).empty()
    $(this.el).append($('<tr></tr>').html(
      _.map(['Quantity', 'Description', 'Price', 'Total'],
        function(val, key) {
          return '<th>' + val + '</th>'
        })
    ));

    $(this.el).append(
      _.map(this.collection.models, function(model, key) {
        return new InvoiceItemView({
          model: model
        }).render().el;
      })
    );
    return this;
  }
});

var InvoiceItemListPageView = Backbone.View.extend({

  render: function() {
    $(this.el).html(new InvoiceItemListView ({
      collection: this.collection
    }).render().el);
  }
});

var invoiceItemCollection = new InvoiceItemCollection([
  { description: 'Wooden Toy House', price: 22, quantity: 3 },
  { description: 'Farm Animal Set', price: 17, quantity: 1 },
  { description: 'Farmer Figure', price: 8, quantity: 6 },
  { description: 'Toy Tractor', price: 15, quantity: 1 }
]);

new InvoiceItemListPageView({
  collection: invoiceItemCollection,
  el: 'body'
}).render();
