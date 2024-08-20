Ext.define('Erems.store.Morecustomer', {
    extend: 'Ext.data.Store',
    alias: 'store.morecustomerstore',
    requires: [
        'Erems.model.Morecustomer'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MorecustomerStore',
                model: 'Erems.model.Morecustomer',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletter/read',
                        create: 'erems/purchaseletter/create',
                        update: 'erems/purchaseletter/update',
                        destroy: 'erems/purchaseletter/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_customer_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});