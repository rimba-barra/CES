Ext.define('Erems.library.template.component.Paymentmethodcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.paymentmethodcombobox',
    store: 'Paymentmethod',
    fieldLabel: 'Payment Method',
    displayField: 'paymentmethod',
    valueField: 'paymentmethod_id',
    
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})