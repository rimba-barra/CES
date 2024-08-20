Ext.define('Cashier.store.Atttype', {
    extend: 'Ext.data.Store',
    alias: 'store.atttypestore',
    requires: [
        'Cashier.model.Atttype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AtttypeStore',
                model: 'Cashier.model.Atttype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterattribute/readatttype'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'atttype_id',
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