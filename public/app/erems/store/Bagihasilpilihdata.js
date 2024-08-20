Ext.define('Erems.store.Bagihasilpilihdata', {
    extend: 'Ext.data.Store',
    alias: 'store.bagihasilpilihdatastore',
    requires: [
        'Erems.model.Bagihasilpilihdata'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BagihasilpilihdataStore',
                model: 'Erems.model.Bagihasilpilihdata',
                proxy: {
                    type: 'ajax',
                    timeout: 1800000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/bagihasilpilihdata/read',
                        create: 'erems/bagihasilpilihdata/create',
                        update: 'erems/bagihasilpilihdata/update',
                        destroy: 'erems/bagihasilpilihdata/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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