//////// Add by Erwin.St 14/07/2021 ////////
Ext.define('Erems.library.template.component.Pricelistdetailkoefisiencombobox', {
    extend       : 'Erems.library.component.Combobox',
    alias        : 'widget.pricelistdetailkoefisiencombobox',
    fieldLabel   : '',
    store        : new Ext.data.ArrayStore({}),
    displayField : 'pricelist_name',
    valueField   : 'pricelistdetail_koefisien_id',
    name         : 'pricelistdetail_koefisien_id',
    width        : 200,
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