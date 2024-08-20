Ext.define('Cashier.library.template.component.Plafoncombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.plafoncombobox',
    store: 'Masterplafon',
    fieldLabel: 'Plafon',
    displayField: 'plafon',
    valueField: 'plafon_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})