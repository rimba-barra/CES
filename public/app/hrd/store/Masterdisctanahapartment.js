Ext.define('Hrd.store.Masterdisctanahapartment', {
    extend: 'Ext.data.Store',
    alias: 'store.masterdisctanahapartment',
    requires: [
        'Hrd.model.Masterdisctanahapartment'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterdisctanahapartmentStore',
                model: 'Hrd.model.Masterdisctanahapartment',             
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/masterdisctanahapartment/read',
                        create: 'hrd/masterdisctanahapartment/create',
                        update: 'hrd/masterdisctanahapartment/update',
                        destroy: 'hrd/masterdisctanahapartment/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'disctanah_apartment_id',
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