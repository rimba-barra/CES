Ext.define('Erems.store.Expenserequest', {
    extend: 'Ext.data.Store',
    alias: 'store.expenserequeststore',
    requires: [
        'Erems.model.Expenserequest'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ExpenserequestStore',
                model: 'Erems.model.Expenserequest',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/expenserequest/read',
                        create: 'erems/expenserequest/create',
                        update: 'erems/expenserequest/update',
                        destroy: 'erems/expenserequest/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'expense_id',
                        root: 'data',
                        totalProperty: 'totalRow'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'all',
                        page: 1, 
                        limit: 25
                    }
                }
            }, cfg)]);
    }
});