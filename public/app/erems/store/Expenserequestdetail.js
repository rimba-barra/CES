Ext.define('Erems.store.Expenserequestdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.expenserequestdetailstore',
    requires: [
        'Erems.model.Expenserequestdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ExpenserequestdetailStore',
                model: 'Erems.model.Expenserequestdetail',
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
                        idProperty: 'expensedetail_id',
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
