Ext.define('Erems.store.Projectfacilitiesimage', {
    extend: 'Ext.data.Store',
    alias: 'store.projectfacilitiesimagestore',
    requires: [
        'Erems.model.Projectfacilitiesimage'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProjectfacilitiesimageStore',
                model: 'Erems.model.Projectfacilitiesimage',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/projectfacilities/readdetail',
                        create: 'erems/projectfacilities/createdetail',
                        update: 'erems/projectfacilities/updatedetail',
                        destroy: 'erems/projectfacilities/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'projectfacilities_images_id',
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