var InvoiceItemModel = Backbone.Model.extend({

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
