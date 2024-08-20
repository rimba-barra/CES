Ext.define('Erems.library.template.component.Paymenttypeallcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.paymenttypeallcombobox',
    store: 'Paymenttypeall',    
    fieldLabel: 'Payment Type',
    displayField: 'paymenttype',
    valueField: 'paymenttype_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})