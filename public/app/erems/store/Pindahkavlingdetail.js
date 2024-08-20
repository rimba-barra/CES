Ext.define('Erems.store.Pindahkavlingdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.pindahkavlingdetailstore',
    requires: [
        'Erems.model.Pindahkavlingdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PindahkavlingdetailStore',
                model: 'Erems.model.Pindahkavlingdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pindahkavling/read',
                        create: 'erems/pindahkavling/create',
                        update: 'erems/pindahkavling/update',
                        destroy: 'erems/pindahkavling/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changekavling_id',
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