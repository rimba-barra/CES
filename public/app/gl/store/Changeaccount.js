Ext.define('Gl.store.Changeaccount', {
    extend: 'Ext.data.Store',
    alias: 'store.changeaccountstore',
    requires: [
        'Gl.model.Changeaccount'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ChangeaccountStore',
                model: 'Gl.model.Changeaccount',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/changeaccount/read',
                        create: 'gl/changeaccount/create',
                        update: 'gl/changeaccount/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'coa_old_id',
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