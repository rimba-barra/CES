Ext.define('Gl.store.Voucherprefixsetupcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.Voucherprefixsetupcombo',
    requires: [
        'Gl.model.Voucherprefixsetup'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VoucherprefixsetupcomboStore',
                model: 'Gl.model.Voucherprefixsetup',
                sorters: [
                    {
                        property: 'coaname',
                        direction: 'ASC'
                    },
                ],
                proxy: {
                    type: 'ajax',
                     timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/common/read',
                        create: 'gl/common/create',
                        update: 'gl/common/update',
                        destroy: 'gl/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'voucherprefix_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getvoucherprefixsetup',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});