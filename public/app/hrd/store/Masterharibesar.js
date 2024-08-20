Ext.define('Hrd.store.Masterharibesar', {
    extend: 'Ext.data.Store',
    alias: 'store.masterharibesarstore',
    requires: [
        'Hrd.model.Masterharibesar'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterharibesarStore',
                model: 'Hrd.model.Masterharibesar',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/masterharibesar/read',
                        create: 'hrd/masterharibesar/create',
                        update: 'hrd/masterharibesar/update',
                        destroy: 'hrd/masterharibesar/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'holiday_shift_id',
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                }
            }, cfg)]);
    }
});