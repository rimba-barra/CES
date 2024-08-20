//////// Add by Erwin.St 14/07/2021 ////////
Ext.define('Erems.library.template.component.Pricelistcombobox', {
    extend       : 'Erems.library.component.Combobox',
    alias        : 'widget.pricelistcombobox',
    fieldLabel   : 'Pricelist',
    store        : new Ext.data.ArrayStore({}),
    displayField : 'keterangan',
    valueField   : 'pricelist_id',
    name         : 'pricelist_id',
    width        : 300,
    listeners    : {
        beforequery : function (record) {
            record.query = new RegExp(record.query, 'i');
            record.forceAll = true;
        }
    },
    initComponent : function() {
        var me = this;
        me.callParent(arguments);
    }
})