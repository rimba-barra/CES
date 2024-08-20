Ext.define('Erems.store.Biayalegalitas', {
    extend: 'Ext.data.Store',
    alias: 'store.biayalegalitasstore',
    requires: [
        'Erems.model.Biayalegalitas'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BiayalegalitasStore',
                model: 'Erems.model.Biayalegalitas',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/biayalegalitas/read',
                        create: 'erems/biayalegalitas/create',
                        update: 'erems/biayalegalitas/update',
                        destroy: 'erems/biayalegalitas/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'biayalegalitas_id',
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