Ext.define('Gl.store.Subaccountcode', {
    extend: 'Ext.data.Store',
    alias: 'store.subaccountcodestore',   
    requires: [
        'Gl.model.Subaccountcode'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubaccountcodeStore',
                model: 'Gl.model.Subaccountcode',
                proxy: {
                    type: 'ajax',                   
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/subaccountcode/read',
                        create: 'gl/subaccountcode/create',
                        update: 'gl/subaccountcode/update',
                        destroy: 'gl/subaccountcode/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'subgl_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraparam :{
                          hideparam :'default'
                    }
                }
            }, cfg)]);
    }
});