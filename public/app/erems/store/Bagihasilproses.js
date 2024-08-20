Ext.define('Erems.store.Bagihasilproses', {
    extend: 'Ext.data.Store',
    alias: 'store.bagihasilprosesstore',
    requires: [
        'Erems.model.Bagihasilproses'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BagihasilprosesStore',
                model: 'Erems.model.Bagihasilproses',
                proxy: {
                    type: 'ajax',
					timeout: 180000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/bagihasilproses/read',
                        create: 'erems/bagihasilproses/create',
                        update: 'erems/bagihasilproses/update',
                        destroy: 'erems/bagihasilproses/delete'
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