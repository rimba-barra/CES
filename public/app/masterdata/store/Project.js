Ext.define('Masterdata.store.Project', {
    extend: 'Ext.data.Store',
    alias: 'store.ProjectStore',

    requires: [
        'Masterdata.model.Project'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Projectstore',
            model: 'Masterdata.model.Project',
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
                    read: 'masterdata/project/read',
                    create: 'masterdata/project/create',
                    update: 'masterdata/project/update',
                    destroy: 'masterdata/project/delete'
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