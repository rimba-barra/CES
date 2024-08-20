Ext.define('Masterdata.store.Citytype', {
    extend: 'Ext.data.Store',
    alias: 'store.CitytypeStore',

    requires: [
        'Masterdata.model.Citytype'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'CitytypeStore',
            model: 'Masterdata.model.Citytype',
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
                    read: 'masterdata/citytype/read',
                    create: 'masterdata/citytype/create',
                    update: 'masterdata/citytype/update',
                    destroy: 'masterdata/citytype/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'city_type_id',
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