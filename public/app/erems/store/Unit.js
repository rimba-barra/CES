Ext.define('Erems.store.Unit', {
    extend: 'Ext.data.Store',
    alias: 'store.unitstore',
    requires: [
        'Erems.model.Unit'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'UnitStore',
                model: 'Erems.model.Unit',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/townplanning/read',
                        create: 'erems/townplanning/create',
                        update: 'erems/townplanning/update',
                        destroy: 'erems/townplanning/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'unit_id',
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