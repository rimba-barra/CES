Ext.define('Erems.library.template.component.Bankkprcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.bankkprcombobox',
    store: 'Masterbankkpr',
    fieldLabel: 'Bank',
    displayField: 'bank_name',
    forceSelection : true,
    valueField: 'bank_id',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
})