Ext.define('Erems.library.template.component.Customercombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.customercombobox',
    store: 'Mastercustomer',
    fieldLabel: 'Customer Name',
    displayField: 'name',
    valueField: 'customer_id',
    //addBlankValue:true,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})