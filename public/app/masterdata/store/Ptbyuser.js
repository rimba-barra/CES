Ext.define('Masterdata.store.Ptbyuser', {
    extend: 'Ext.data.Store',
    alias: 'store.PtbyuserStore',

    requires: [
        'Masterdata.model.Ptbyuser'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Ptbyuserstore',
            model: 'Masterdata.model.Ptbyuser',
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
                    read: 'masterdata/ptbyuser/read'
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