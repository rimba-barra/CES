Ext.define('Cashier.library.template.component.Datatypecombobox', {
    extend: 'Cashier.library.component.Combobox',
    alias: 'widget.datatypecombobox',
    store: 'Datatype',
    fieldLabel: 'Data type',
    displayField: 'datatype',
    valueField: 'datatype_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})