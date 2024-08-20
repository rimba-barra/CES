Ext.define('Erems.store.Sppjb', {
    extend: 'Ext.data.Store',
    alias: 'store.sppjbstore',
    requires: [
        'Erems.model.Sppjb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SppjbStore',
                model: 'Erems.model.Sppjb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/sppjb/read',
                        create: 'erems/sppjb/create',
                        update: 'erems/sppjb/update',
                        destroy: 'erems/sppjb/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sppjb_id',
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