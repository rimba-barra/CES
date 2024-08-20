Ext.define('Erems.store.Gantinama', {
    extend: 'Ext.data.Store',
    alias: 'store.gantinamastore',
    requires: [
        'Erems.model.Gantinama'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GantinamaStore',
                model: 'Erems.model.Gantinama',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/gantinama/read',
                        create: 'erems/gantinama/create',
                        update: 'erems/gantinama/update',
                        destroy: 'erems/gantinama/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changename_id',
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