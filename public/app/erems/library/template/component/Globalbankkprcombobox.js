Ext.define('Erems.library.template.component.Globalbankkprcombobox', {
    extend: 'Erems.library.component.Combobox',
    alias: 'widget.globalbankkprcombobox',
    store: 'Masterdata.store.Masterglobalbankkpr',
    fieldLabel: 'Bank',
    displayField: 'name',
    valueField: 'bankkpr_id',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
})