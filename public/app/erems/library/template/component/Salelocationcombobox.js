Ext.define('Erems.library.template.component.Salelocationcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.salelocationcombobox',
    store: 'Masterlokasipenjualan',
    fieldLabel: 'Sales location',
    displayField: 'saleslocation',
    valueField: 'saleslocation_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})