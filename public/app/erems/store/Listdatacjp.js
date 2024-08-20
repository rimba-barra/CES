Ext.define('Erems.store.Listdatacjp', {
    extend: 'Ext.data.Store',
    alias: 'store.listdatacjppstore',
    requires: [
        'Erems.model.Listdatacjp'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ListdatacjpStore',
                model: 'Erems.model.Listdatacjp',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/listdatacjp/read',
                        create: 'erems/listdatacjp/create',
                        update: 'erems/listdatacjp/update',
                        destroy: 'erems/listdatacjp/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'upload_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'default'
                    }
                }
            }, cfg)]);
    }
});