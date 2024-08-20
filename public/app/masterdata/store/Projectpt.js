Ext.define('Masterdata.store.Projectpt', {
    extend: 'Ext.data.Store',
    alias: 'store.ProjectptStore',

    requires: [
        'Masterdata.model.Projectpt'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ProjectptStore',
            model: 'Masterdata.model.Projectpt',
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
                    read: 'masterdata/projectpt/read',
                    create: 'masterdata/projectpt/create',
                    update: 'masterdata/projectpt/update',
                    destroy: 'masterdata/projectpt/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'projectpt_id',
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