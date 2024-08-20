Ext.define('Erems.store.Masterpromotionmediakategori', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpromotionmediakategoristore',
    requires: [
        'Erems.model.Masterpromotionmediakategori'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpromotionmediakategoriStore',
                model: 'Erems.model.Masterpromotionmediakategori',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterpromotionmediakategori/read',
                        create: 'erems/masterpromotionmediakategori/create',
                        update: 'erems/masterpromotionmediakategori/update',
                        destroy: 'erems/masterpromotionmediakategori/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'mediapromotion_kategori_id',
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