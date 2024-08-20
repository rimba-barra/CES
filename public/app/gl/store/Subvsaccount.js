Ext.define('Gl.store.Subvsaccount', {
    extend: 'Ext.data.Store',
    alias: 'store.subvsaccountstore',
    requires: [
        'Gl.model.Subvsaccount'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubvsaccountStore',
                model: 'Gl.model.Subvsaccount',               
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/subvsaccount/read',
                        create: 'gl/subvsaccount/create',
                        update: 'gl/subvsaccount/update',
                        destroy: 'gl/subvsaccount/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'journalsubdetail_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'search'
                    }
                }
            }, cfg)]);
    }
});