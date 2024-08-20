Ext.define('Masterdata.store.Masterglobalbankkpr', {
    extend: 'Ext.data.Store',
    alias: 'store.MasterglobalbankkprStore',
    requires: [
        'Masterdata.model.Masterglobalbankkpr'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterglobalbankkprStore',
                model: 'Masterdata.model.Masterglobalbankkpr',
                proxy: {
                    type: 'ajax',
                    timeout:45000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'masterdata/masterbankkpr/read',
                        create: 'masterdata/masterbankkpr/create',
                        update: 'masterdata/masterbankkpr/update',
                        destroy: 'masterdata/masterbankkpr/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'bankkpr_id',
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