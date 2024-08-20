Ext.define('Cashier.store.VoucherprefixsetupcomboV2', {
    extend: 'Ext.data.Store',
    alias: 'store.VoucherprefixsetupcomboV2',
    requires: [
        'Cashier.model.VoucherprefixsetupV2'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Voucherprefixsetupcombov2Store',
                model: 'Cashier.model.VoucherprefixsetupV2',
                remoteFilter: true,
                sorters: [
                    {
                        property: 'coaname',
                        direction: 'ASC'
                    },
                ],
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'voucherprefix_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getvoucherprefixsetupV3',
                  
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});