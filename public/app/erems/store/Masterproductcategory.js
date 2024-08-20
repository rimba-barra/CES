Ext.define('Erems.store.Masterproductcategory', {
    extend: 'Ext.data.Store',
    alias: 'store.masterproductcategorystore',
    requires: [
        'Erems.model.Masterproductcategory'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterproductcategoryStore',
                model: 'Erems.model.Masterproductcategory',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterproductcategory/read',
                        create: 'erems/masterproductcategory/create',
                        update: 'erems/masterproductcategory/update',
                        destroy: 'erems/masterproductcategory/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'productcategory_id',
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