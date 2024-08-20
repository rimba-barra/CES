Ext.define('Erems.store.MasterpricelistType', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpricelistTypestore',
    requires: [
        'Erems.model.MasterpricelistType'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpricelistTypeStore',
                model: 'Erems.model.MasterpricelistType',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/masterpricelist/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'type_id',
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