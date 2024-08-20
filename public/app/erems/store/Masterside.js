Ext.define('Erems.store.Masterside', {
    extend: 'Ext.data.Store',
    alias: 'store.mastersidestore',
    requires: [
        'Erems.model.Masterside'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastersideStore',
                model: 'Erems.model.Masterside',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterside/read',
                        create: 'erems/masterside/create',
                        update: 'erems/masterside/update',
                        destroy: 'erems/masterside/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'side_id',
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