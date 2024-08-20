Ext.define('Erems.store.Masteralasangantinama', {
    extend: 'Ext.data.Store',
    alias: 'store.masteralasangantinamastore',
    requires: [
        'Erems.model.Masteralasangantinama'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasteralasangantinamaStore',
                model: 'Erems.model.Masteralasangantinama',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masteralasangantinama/read',
                        create: 'erems/masteralasangantinama/create',
                        update: 'erems/masteralasangantinama/update',
                        destroy: 'erems/masteralasangantinama/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'reasonchgname_id',
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