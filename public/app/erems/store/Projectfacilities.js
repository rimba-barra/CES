Ext.define('Erems.store.Projectfacilities', {
    extend: 'Ext.data.Store',
    alias: 'store.projectfacilitiesstore',
    requires: [
        'Erems.model.Projectfacilities'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProjectfacilitiesStore',
                model: 'Erems.model.Projectfacilities',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/projectfacilities/read',
                        create: 'erems/projectfacilities/create',
                        update: 'erems/projectfacilities/update',
                        destroy: 'erems/projectfacilities/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'projectfacilities_id',
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