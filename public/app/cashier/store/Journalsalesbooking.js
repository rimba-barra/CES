Ext.define('Cashier.store.Journalsalesbooking', {
    extend: 'Ext.data.Store',
    alias: 'store.journalsalesbookingstore',
    requires: [
        'Cashier.model.Journalsalesbooking'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'JournalsalesbookingStore',
                model: 'Cashier.model.Journalsalesbooking',
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
                        read: 'cashier/journalsalesbooking/read',
                        create: 'cashier/journalsalesbooking/create',
                        update: 'cashier/journalsalesbooking/update',
                        destroy: 'cashier/journalsalesbooking/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbondept_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        statusrequest: 'unbooked_only'
//                        project_id: apps.project,

                    }
                }
            }, cfg)]);
    }
});