Ext.define('Erems.store.Writeoffdenda', {
    extend: 'Ext.data.Store',
    alias: 'store.writeoffdendastore',
    requires: [
        'Erems.model.Writeoffdenda'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'WriteoffdendaStore',
                model: 'Erems.model.Writeoffdenda',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/writeoffdenda/read',
                        create: 'erems/writeoffdenda/create',
                        update: 'erems/writeoffdenda/update',
                        destroy: 'erems/writeoffdenda/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'writeoff_id',
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