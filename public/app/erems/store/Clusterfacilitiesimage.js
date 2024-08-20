Ext.define('Erems.store.Clusterfacilitiesimage', {
    extend: 'Ext.data.Store',
    alias: 'store.clusterfacilitiesimagestore',
    requires: [
        'Erems.model.Clusterfacilitiesimage'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ClusterfacilitiesimageStore',
                model: 'Erems.model.Clusterfacilitiesimage',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/clusterfacilities/readdetail',
                        create: 'erems/clusterfacilities/createdetail',
                        update: 'erems/clusterfacilities/updatedetail',
                        destroy: 'erems/clusterfacilities/deletedetail'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'clusterfacilities_images_id',
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