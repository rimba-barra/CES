Ext.define('Masterdata.store.City', {
    extend: 'Ext.data.Store',
    alias: 'store.CityStore',

    requires: [
        'Masterdata.model.City'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CityStore',
            model: 'Masterdata.model.City',
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
                    read: 'masterdata/city/read',
                    create: 'masterdata/city/create',
                    update: 'masterdata/city/update',
                    destroy: 'masterdata/city/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'city_id',
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