Ext.define('Hrd.store.Project2', {
    extend: 'Ext.data.Store',
    alias: 'store.project2store',
    requires: [
        'Hrd.model.Project'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Project2Store',
                model: 'Hrd.model.Project',
                sorters: [
                    {property: 'name', direction: 'ASC'}
                ],
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/personal/read',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'project_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data',
                    },
                    extraParams: {
                        mode_read: 'getproject',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});