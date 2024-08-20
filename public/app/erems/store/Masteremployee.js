Ext.define('Erems.store.Masteremployee', {
    extend: 'Ext.data.Store',
    alias: 'store.masteremployeestore',
    requires: [
        'Erems.model.Masteremployee'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasteremployeeStore',
                model: 'Erems.model.Masteremployee',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masteremployee/read',
                        create: 'erems/masteremployee/create',
                        update: 'erems/masteremployee/update',
                        destroy: 'erems/masteremployee/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'employee_id',
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