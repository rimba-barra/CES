Ext.define('Masterdata.store.Pt', {
    extend: 'Ext.data.Store',
    alias: 'store.PtStore',

    requires: [
        'Masterdata.model.Pt'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Ptstore',
            model: 'Masterdata.model.Pt',
            proxy: {
                type: 'ajax',
                timeout:4500000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'masterdata/pt/read',
                    create: 'masterdata/pt/create',
                    update: 'masterdata/pt/update',
                    destroy: 'masterdata/pt/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'pt_id',
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