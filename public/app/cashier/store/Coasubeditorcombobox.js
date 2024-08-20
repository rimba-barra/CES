Ext.define('Cashier.store.Coasubeditorcombobox', {
    extend: 'Ext.data.Store',
    alias: 'store.coasubeditorcombobox',
    requires: [
        'Cashier.model.Coasubeditorcombobox'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CoasubeditorcomboboxStore',
            model: 'Cashier.model.Coasubeditorcombobox',
            proxy: {
                type: 'ajax',
                timeout:45000000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'cashier/common/read'
                },
                reader: {
                    type: 'json',
                    idProperty: 'coa_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                },
                extraParams:{
                    hideparam :'coasubeditorcombobox',
                    start :0,
                    limit :1000,
                }
            }
        }, cfg)]);
    }
});