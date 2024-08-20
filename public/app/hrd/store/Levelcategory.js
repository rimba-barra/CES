Ext.define('Hrd.store.Levelcategory', {
    extend: 'Ext.data.Store',
    alias: 'store.levelcategorystore',
    requires: [
        'Hrd.model.Levelcategory'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'LevelcategoryStore',
                model: 'Hrd.model.Levelcategory',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/levelcategory/readspecial',
                        // create: 'hrd/levelcategory/create',
                        // update: 'hrd/levelcategory/update',
                        // destroy: 'hrd/levelcategory/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'level_category_id',
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