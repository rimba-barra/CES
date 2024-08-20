Ext.define('Erems.store.Admincollection', {
    extend: 'Ext.data.Store',
    alias: 'store.admincollectionstore',
    requires: [
        'Erems.model.Admincollection'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AdmincollectionStore',
                model: 'Erems.model.Admincollection',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/admincollection/read',
                        create: 'erems/admincollection/create',
                        update: 'erems/admincollection/update',
                        destroy: 'erems/admincollection/delete'
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