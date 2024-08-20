Ext.define('Hrd.store.Changestatusdocument', {
    extend: 'Ext.data.Store',
    alias: 'store.changestatusdocumentstore',
    requires: [
        'Hrd.model.Changestatusdocument'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ChangestatusdocumentStore',
                model: 'Hrd.model.Changestatusdocument',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/mutation/read',
                        create: 'hrd/mutation/create',
                        update: 'hrd/mutation/update',
                        destroy: 'hrd/mutation/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'changstatusdocument_id',
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