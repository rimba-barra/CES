Ext.define('Cashier.store.Mergesubcoadetail', {
    extend: 'Ext.data.Store',
    alias: 'store.mergesubcoadetailstore',
    requires: [
        'Cashier.model.Mergesubcoadetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MergesubcoadetailStore',
                model: 'Cashier.model.Mergesubcoadetail',
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
                        read: 'cashier/mergesubcoa/detailread',
                        create: 'cashier/mergesubcoa/detailcreate',
                        update: 'cashier/mergesubcoa/detailupdate',
                        destroy: 'cashier/mergesubcoa/detaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'subgl_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                    
                    }
                }
            }, cfg)]);
    }
});