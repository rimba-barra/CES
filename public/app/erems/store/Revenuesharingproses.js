Ext.define('Erems.store.Revenuesharingproses', {
    extend: 'Ext.data.Store',
    alias: 'store.revenuesharingprosesstore',
    requires: [
        'Erems.model.Revenuesharingproses'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RevenuesharingprosesStore',
                model: 'Erems.model.Revenuesharingproses',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/revenuesharingproses/read',
                        create: 'erems/revenuesharingproses/create',
                        update: 'erems/revenuesharingproses/update',
                        destroy: 'erems/revenuesharingproses/delete'
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