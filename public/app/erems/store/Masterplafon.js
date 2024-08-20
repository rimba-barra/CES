Ext.define('Erems.store.Masterplafon', {
    extend: 'Ext.data.Store',
    alias: 'store.masterplafonstore',
    requires: [
        'Erems.model.Masterplafon'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterplafonStore',
                model: 'Erems.model.Masterplafon',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterplafon/read',
                        create: 'erems/masterplafon/create',
                        update: 'erems/masterplafon/update',
                        destroy: 'erems/masterplafon/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'plafon_id',
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