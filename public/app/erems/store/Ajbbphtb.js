Ext.define('Erems.store.Ajbbphtb', {
    extend: 'Ext.data.Store',
    alias: 'store.ajbbphtbstore',
    requires: [
        'Erems.model.Ajbbphtb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AjbbphtbStore',
                model: 'Erems.model.Ajbbphtb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/ajbbphtb/read',
                        create: 'erems/ajbbphtb/create',
                        update: 'erems/ajbbphtb/update',
                        destroy: 'erems/ajbbphtb/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'ajbbphtb_id',
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