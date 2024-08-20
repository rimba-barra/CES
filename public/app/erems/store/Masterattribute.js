Ext.define('Erems.store.Masterattribute', {
    extend: 'Ext.data.Store',
    alias: 'store.masterattributestore',
    requires: [
        'Erems.model.Masterattribute'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterattributeStore',
                model: 'Erems.model.Masterattribute',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterattribute/read',
                        create: 'erems/masterattribute/create',
                        update: 'erems/masterattribute/update',
                        destroy: 'erems/masterattribute/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'attribute_id',
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