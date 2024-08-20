Ext.define('Hrd.store.Masterdisctanahrumah', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdisctanahrumah',
    requires: [
        'Hrd.model.Masterdisctanahrumah'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdisctanahrumahStore',
                model: 'Hrd.model.Masterdisctanahrumah',             
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/masterdisctanahrumah/read',
                        create: 'hrd/masterdisctanahrumah/create',
                        update: 'hrd/masterdisctanahrumah/update',
                        destroy: 'hrd/masterdisctanahrumah/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'disctanah_rumah_id',
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