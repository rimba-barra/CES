Ext.define('Erems.store.Masteralasanbatal', {
    extend: 'Ext.data.Store',
    alias: 'store.masteralasanbatalstore',
    requires: [
        'Erems.model.Masteralasanbatal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasteralasanbatalStore',
                model: 'Erems.model.Masteralasanbatal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masteralasanbatal/read',
                        create: 'erems/masteralasanbatal/create',
                        update: 'erems/masteralasanbatal/update',
                        destroy: 'erems/masteralasanbatal/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'cancelreason_id',
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