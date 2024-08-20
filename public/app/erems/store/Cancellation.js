Ext.define('Erems.store.Cancellation', {
    extend: 'Ext.data.Store',
    alias: 'store.cancellationstore',
    requires: [
        'Erems.model.Cancellation'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CancellationStore',
                model: 'Erems.model.Cancellation',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/cancellation/read',
                        create: 'erems/cancellation/create',
                        update: 'erems/cancellation/update',
                        destroy: 'erems/cancellation/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'cancellation_id',
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