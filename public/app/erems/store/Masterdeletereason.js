Ext.define('Erems.store.Masterdeletereason', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdeletereasonstore',
    requires: [
        'Erems.model.Masterdeletereason'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdeletereasonStore',
                model: 'Erems.model.Masterdeletereason',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/marketingstock/read',
                        create: 'erems/masterdeletereasonstore/create',
                        update: 'erems/masterdeletereasonstore/update',
                        destroy: 'erems/masterdeletereasonstore/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'Deletereason_id',
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'deletereason'
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