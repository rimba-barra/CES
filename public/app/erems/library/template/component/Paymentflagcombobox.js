Ext.define('Erems.library.template.component.Paymentflagcombobox', {
    extend        : 'Erems.library.component.Combobox',
    alias         : 'widget.paymentflagcombobox',
    store         : 'Masterpaymentflag',
    fieldLabel    : 'Payment Flag',
    displayField  : 'paymentflag',
    valueField    : 'paymentflag_id',
    initComponent : function() {
        var me = this;

        me.callParent(arguments);
        //this.renderer = function(value, metadata, record, row, col, store) {
         //   return record.get(this.displayField);
        //}
    }
})