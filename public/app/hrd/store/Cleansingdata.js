Ext.define('Hrd.store.Cleansingdata', {
    extend: 'Ext.data.Store',
    alias: 'store.cleansingdatastore',
    requires: [
        'Hrd.model.Cleansingdata'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CleansingdataStore',
                model: 'Hrd.model.Cleansingdata',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/cleansingdata/read',
                        create: 'hrd/cleansingdata/create',
                        update: 'hrd/cleansingdata/update',
                        destroy: 'hrd/cleansingdata/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'cleansingdata_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'default'
                    }
                }
            }, cfg)]);
    }
});