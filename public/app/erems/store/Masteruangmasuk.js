Ext.define('Erems.store.Masteruangmasuk', {
    extend: 'Ext.data.Store',
    alias: 'store.masteruangmasukstore',
    requires: [
        'Erems.model.Masteruangmasuk'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasteruangmasukStore',
                model: 'Erems.model.Masteruangmasuk',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masteruangmasuk/read',
                        create: 'erems/masteruangmasuk/create',
                        update: 'erems/masteruangmasuk/update',
                        destroy: 'erems/masteruangmasuk/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'cashsources_id',
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