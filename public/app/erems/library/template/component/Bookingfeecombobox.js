Ext.define('Erems.library.template.component.Bookingfeecombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.bookingfeecombobox',
    store: 'Bookingfeeamount',
    fieldLabel: 'Amount',
    displayField: 'amount',
    valueField: 'amount',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})