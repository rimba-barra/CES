Ext.define('Erems.library.template.component.Bankcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.bankcombobox',
    store: 'Masterdata.store.Bank',
    fieldLabel: 'Bank',
    displayField: 'bank_name',
    forceSelection : true,
    valueField: 'bank_id',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
})