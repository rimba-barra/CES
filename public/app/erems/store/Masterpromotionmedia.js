Ext.define('Erems.store.Masterpromotionmedia', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpromotionmediastore',
    requires: [
        'Erems.model.Masterpromotionmedia'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpromotionmediaStore',
                model: 'Erems.model.Masterpromotionmedia',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterpromotionmedia/read',
                        create: 'erems/masterpromotionmedia/create',
                        update: 'erems/masterpromotionmedia/update',
                        destroy: 'erems/masterpromotionmedia/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'mediapromotion_id',
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