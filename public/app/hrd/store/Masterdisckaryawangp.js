Ext.define('Hrd.store.Masterdisckaryawangp', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdisckaryawangp',
    requires: [
        'Hrd.model.Masterdisckaryawangp'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdisckaryawangpStore',
                model: 'Hrd.model.Masterdisckaryawangp',             
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/masterdisckaryawangp/read',
                        create: 'hrd/masterdisckaryawangp/create',
                        update: 'hrd/masterdisckaryawangp/update',
                        destroy: 'hrd/masterdisckaryawangp/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'generalparameter_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'default'
                    }
                }
            }, cfg)]);
    }
});