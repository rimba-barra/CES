Ext.define('Cashier.library.template.combobox.Rangebagihasilcombobox', {
    extend       : 'Cashier.library.component.Combobox',
    alias        : 'widget.rangebagihasilcombobox',
    store        : 'Masterrangebagihasil',
    dynamicdata  : 0,
    fieldLabel   : 'Range Bagi Hasil',
    displayField : 'name',
    valueField   : 'rangebagihasil_id',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})