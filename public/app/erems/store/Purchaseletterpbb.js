Ext.define('Erems.store.Purchaseletterpbb', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterpbbstore',
    requires: [
        'Erems.model.Purchaseletterpbb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterpbbStore',
                model: 'Erems.model.Purchaseletterpbb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterpbb/read',
                        create: 'erems/purchaseletterpbb/create',
                        update: 'erems/purchaseletterpbb/update',
                        destroy: 'erems/purchaseletterpbb/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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