Ext.define('Erems.store.Changeprice', {
    extend: 'Ext.data.Store',
    alias: 'store.changepricestore',
    requires: [
        'Erems.model.Changeprice'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ChangepriceStore',
                model: 'Erems.model.Changeprice',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/changeprice/read',
                        create: 'erems/changeprice/create',
                        update: 'erems/changeprice/update',
                        destroy: 'erems/changeprice/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changeprice_id',
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