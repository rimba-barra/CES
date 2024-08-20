Ext.define('Erems.store.Clusterfacilities', {
    extend: 'Ext.data.Store',
    alias: 'store.clusterfacilitiesstore',
    requires: [
        'Erems.model.Clusterfacilities'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ClusterfacilitiesStore',
                model: 'Erems.model.Clusterfacilities',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/clusterfacilities/read',
                        create: 'erems/clusterfacilities/create',
                        update: 'erems/clusterfacilities/update',
                        destroy: 'erems/clusterfacilities/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'clusterfacilities_id',
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