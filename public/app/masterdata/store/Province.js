Ext.define('Masterdata.store.Province', {
    extend: 'Ext.data.Store',
    alias: 'store.ProvinceStore',

    requires: [
        'Masterdata.model.Province'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ProvinceStore',
            model: 'Masterdata.model.Province',
            proxy: {
                type: 'ajax',
                timeout:45000,
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'masterdata/province/read',
                    create: 'masterdata/province/create',
                    update: 'masterdata/province/update',
                    destroy: 'masterdata/province/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'province_id',
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