Ext.define('Cashier.library.template.combobox.Blockcombobox', {
    extend       : 'Cashier.library.component.Combobox',
    alias        : 'widget.blockcombobox',
    store        : 'Block',
    dynamicdata  : 0,
    fieldLabel   : 'Block',
    displayField : 'block',
    valueField   : 'block_id',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})