Ext.define('Erems.store.Mastercitraclub', {
    extend: 'Ext.data.Store',
    alias: 'store.mastercitraclubstore',
    requires: [
        'Erems.model.Mastercitraclub'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastercitraclubStore',
                model: 'Erems.model.Mastercitraclub',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastercitraclub/read',
                        create: 'erems/mastercitraclub/create',
                        update: 'erems/mastercitraclub/update',
                        destroy: 'erems/mastercitraclub/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'citraclub_id',
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