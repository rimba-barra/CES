Ext.define('Hrd.store.Masterdisckaryawan', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdisckaryawan',
    requires: [
        'Hrd.model.Masterdisckaryawan'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdisckaryawanStore',
                model: 'Hrd.model.Masterdisckaryawan',             
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/masterdisckaryawan/read',
                        create: 'hrd/masterdisckaryawan/create',
                        update: 'hrd/masterdisckaryawan/update',
                        destroy: 'hrd/masterdisckaryawan/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'disckaryawan_id',
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