Ext.define('Cashier.store.Voucherprefixsetupcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.Voucherprefixsetupcombo',
    requires: [
        'Cashier.model.Voucherprefixsetup'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VoucherprefixsetupcomboStore',
                model: 'Cashier.model.Voucherprefixsetup',
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
                        hideparam: 'getvoucherprefixsetup',
                  
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});