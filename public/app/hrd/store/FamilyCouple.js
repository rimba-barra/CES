Ext.define('Hrd.store.FamilyCouple', {
    extend: 'Ext.data.Store',
    alias: 'store.familycouplepstore',
    requires: [
        'Hrd.model.FamilyCouple'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FamilyCoupleStore',
                model: 'Hrd.model.FamilyCouple',
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
                        idProperty: 'relation_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getdatachield'
                    }
                }
            }, cfg)]);
    }
});