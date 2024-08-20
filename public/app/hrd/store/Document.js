Ext.define('Hrd.store.Document', {
    extend: 'Ext.data.Store',
    alias: 'store.jobhistorystore',
    requires: [
        'Hrd.model.Document'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DocumentStore',
                model: 'Hrd.model.Document',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/personalselfservice/read',
                        create: 'hrd/personalselfservice/create',
                        update: 'hrd/personalselfservice/update',
                        destroy: 'hrd/personalselfservice/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'employee_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getdatadocument'
                    }
                }
            }, cfg)]);
    }
});