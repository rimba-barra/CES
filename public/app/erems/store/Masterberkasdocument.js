Ext.define('Erems.store.Masterberkasdocument', {
    extend: 'Ext.data.Store',
    alias: 'store.masterberkasdocumentstore',
    requires: [
        'Erems.model.Masterberkasdocument'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterberkasdocumentStore',
                model: 'Erems.model.Masterberkasdocument',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterberkas/read',
                        create: 'erems/masterberkas/create',
                        update: 'erems/masterberkas/update',
                        destroy: 'erems/masterberkas/delete'
                    },
                    extraParams: {
                        mode_read: 'documents'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'berkasdocument_id',
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