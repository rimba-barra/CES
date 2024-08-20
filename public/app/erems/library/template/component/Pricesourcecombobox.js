//////// Add by Erwin.St 14/07/2021 ////////
Ext.define('Erems.library.template.component.Pricesourcecombobox', {
    extend     : 'Erems.library.component.Combobox',
    alias      : 'widget.pricesourcecombobox',
    fieldLabel : 'Price Source',
    store      : new Ext.data.ArrayStore({
        fields : ['price_source', 'price_source_name'],
        data   : [[1, 'Marketing Stock'], [2, 'Pricelist']]
    }),
    displayField  : 'price_source_name',
    valueField    : 'price_source',
    name          : 'price_source',
    width         : 230,
    initComponent : function() {
        var me = this;
        me.callParent(arguments);
    }
})