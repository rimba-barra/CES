Ext.define('Erems.store.Masterfakturpajakcounter', {
    extend: 'Ext.data.Store',
    alias: 'store.masterfakturpajakcounterstore',
    requires: [
        'Erems.model.Masterfakturpajakcounter'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterfakturpajakcounterStore',
                model: 'Erems.model.Masterfakturpajakcounter',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterfakturpajakcounter/read',
                        create: 'erems/masterfakturpajakcounter/create',
                        update: 'erems/masterfakturpajakcounter/update',
                        destroy: 'erems/masterfakturpajakcounter/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'fakturpajak_counter_id',
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