Ext.define('Erems.store.Masterclusterimage', {
    extend: 'Ext.data.Store',
    alias: 'store.masterclusterimagestore',
    requires: [
        'Erems.model.Masterclusterimage'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterclusterimageStore',
                model: 'Erems.model.Masterclusterimage',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastercluster/readdetail',
                        create: 'erems/mastercluster/createdetail',
                        update: 'erems/mastercluster/updatedetail',
                        destroy: 'erems/mastercluster/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'clusterimages_id',
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