Ext.define('Erems.store.Tablestock', {
    extend: 'Ext.data.Store',
    alias: 'store.tablestockstore',
    requires: [
        'Erems.model.Tablestock'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TablestockStore',
                model: 'Erems.model.Tablestock',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/tablestock/read',
                        create: 'erems/tablestock/create',
                        update: 'erems/tablestock/update',
                        destroy: 'erems/tablestock/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'hgbajb_id',
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