Ext.define('Cashier.store.Journaltemplate', {
    extend: 'Ext.data.Store',
    alias: 'store.journaltemplatestore',
    requires: [
        'Cashier.model.Journaltemplate'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'JournaltemplateStore',
                model: 'Cashier.model.Journaltemplate',
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
                        read: 'cashier/journaltemplate/read',
                        create: 'cashier/journaltemplate/create',
                        update: 'cashier/journaltemplate/update',
                        destroy: 'cashier/journaltemplate/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'journaltemplate_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});