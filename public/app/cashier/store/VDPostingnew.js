Ext.define('Cashier.store.VDPostingnew', {
    extend: 'Ext.data.Store',
    alias: 'store.vdpostingstorenew',
    requires: [
        'Cashier.model.VDPostingnew'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDPostingStoreNew',
                model: 'Cashier.model.VDPostingnew',
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
                        statusrequest: '3',
                        project_id:apps.project,
                       
                       
                    }
                }
            }, cfg)]);
    }
});