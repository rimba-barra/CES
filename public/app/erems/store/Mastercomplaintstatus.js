Ext.define('Erems.store.Mastercomplaintstatus', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercomplaintstatusstore',
    requires: [
        'Erems.model.Mastercomplaintstatus'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastercomplaintstatusStore',
                model: 'Erems.model.Mastercomplaintstatus',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastercomplaintstatus/read',
                        create: 'erems/mastercomplaintstatus/create',
                        update: 'erems/mastercomplaintstatus/update',
                        destroy: 'erems/mastercomplaintstatus/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'complaintstatus_id',
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