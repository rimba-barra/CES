Ext.define('Cashier.store.VDRequest', {
    extend: 'Ext.data.Store',
    alias: 'store.vdrequeststore',
    requires: [
        'Cashier.model.VDRequest'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDRequestStore',
                model: 'Cashier.model.VDRequest',
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
                        read: 'cashier/vdrequest/read',
                        create: 'cashier/vdrequest/create',
                        update: 'cashier/vdrequest/update',
                        destroy: 'cashier/vdrequest/delete'
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
                        project_id:apps.project,
                      
                    }
                }
            }, cfg)]);
    }
});