Ext.define('Masterdata.store.Projectbyuser', {
    extend: 'Ext.data.Store',
    alias: 'store.ProjectbyuserStore',

    requires: [
        'Masterdata.model.Projectbyuser'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Projectbyuserstore',
            model: 'Masterdata.model.Projectbyuser',
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
                    read: 'masterdata/projectbyuser/read',
                    create: 'masterdata/projectbyuser/create',
                    update: 'masterdata/projectbyuser/update',
                    destroy: 'masterdata/projectbyuser/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'project_id',
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