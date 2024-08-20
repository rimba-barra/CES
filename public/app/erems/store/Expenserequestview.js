Ext.define('Erems.store.Expenserequestview', {
    extend: 'Ext.data.Store',
    alias: 'store.expenserequestviewstore',
    requires: [
        'Erems.model.Expenserequestview'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ExpenserequestviewStore',
                model: 'Erems.model.Expenserequestview',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                       // create: 'POST',
                       // update: 'POST',
                      //  destroy: 'POST'
                    },
                    api: {
                        read: 'erems/expenserequest/read'
                       // create: 'erems/expenserequestview/create',
                        //update: 'erems/expenserequestview/update',
                       // destroy: 'erems/expenserequestview/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'expense_id',
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