Ext.define('Hrd.store.Shifttype', {
    extend: 'Ext.data.Store',
    alias: 'store.shifttypestore',
    requires: [
        'Hrd.model.Shifttype'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ShifttypeStore',
                model: 'Hrd.model.Shifttype',
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
                        idProperty: 'shifttype_id',
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