Ext.define('Hrd.store.Groupemployee', {
    extend: 'Ext.data.Store',
    alias: 'store.groupemployeestore',
    requires: [
        'Hrd.model.Groupemployee'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GroupemployeeStore',
                model: 'Hrd.model.Groupemployee',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/groupemployee/read',
                        create: 'hrd/groupemployee/create',
                        update: 'hrd/groupemployee/update',
                        destroy: 'hrd/groupemployee/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'groupemployee_id',
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