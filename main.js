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
      this.model.get('price'),
      this.modle.calculateAmount(),
    ], function(val, key) {
      return '<td>' + val + '</td>'
    }));
    return this;
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
})
