Ext.define('Erems.store.Atttype', {
    extend: 'Ext.data.Store',
    alias: 'store.atttypestore',
    requires: [
        'Erems.model.Atttype'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AtttypeStore',
                model: 'Erems.model.Atttype',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterattribute/readatttype'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'atttype_id',
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