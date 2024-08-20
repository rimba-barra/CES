Ext.define('Erems.store.', {
    extend: 'Ext.data.Store',
    alias: 'store.store',
    requires: [
        'Erems.model.'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Store',
                model: 'Erems.model.',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems//read',
                        create: 'erems//create',
                        update: 'erems//update',
                        destroy: 'erems//delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: '',
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