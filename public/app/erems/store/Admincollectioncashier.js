Ext.define('Erems.store.Admincollectioncashier', {
    extend: 'Ext.data.Store',
    alias: 'store.admincollectionstore',
    requires: [
        'Erems.model.Admincollectioncashier'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AdmincollectioncashierStore',
                model: 'Erems.model.Admincollectioncashier',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/admincollectioncashier/read',
                        create: 'erems/admincollectioncashier/create',
                        update: 'erems/admincollectioncashier/update',
                        destroy: 'erems/admincollectioncashier/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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