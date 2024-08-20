Ext.define('Hrd.store.Position', {
    extend: 'Ext.data.Store',
    alias: 'store.positionstore',
    requires: [
        'Hrd.model.Position'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PositionStore',
                model: 'Hrd.model.Position',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/common/read',
                        create: 'hrd/common/create',
                        update: 'hrd/common/update',
                        destroy: 'hrd/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'position_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getposition'
                    }
                }
            }, cfg)]);
    }
});