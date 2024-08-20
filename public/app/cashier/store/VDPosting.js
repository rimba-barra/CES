Ext.define('Cashier.store.VDPosting', {
    extend: 'Ext.data.Store',
    alias: 'store.vdpostingstore',
    requires: [
        'Cashier.model.VDPosting'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDPostingStore',
                model: 'Cashier.model.VDPosting',
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
                        read: 'cashier/vdposting/read',
                        create: 'cashier/vdposting/create',
                        update: 'cashier/vdposting/update',
                        destroy: 'cashier/vdposting/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'voucher_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        statusrequest: '2',
                        project_id:apps.project,
                       
                       
                    }
                }
            }, cfg)]);
    }
});