Ext.define('Hrd.template.combobox.Fortransactioncombobox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.fortransactioncombobox',
    store: 'Transactionapitype',
    dynamicdata: 0,
    fieldLabel: 'For Transaction',
    displayField: 'description',
    valueField: 'for_transaction',
    typeAhead: true,
    matchFieldWidth: false,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


