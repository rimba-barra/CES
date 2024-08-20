Ext.define('Gl.store.Project', {
    extend: 'Ext.data.Store',
    alias: 'store.projectstore',
    requires: [
        'Gl.model.Project'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProjectStore',
                model: 'Gl.model.Project',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/coa/read',
                        // create: 'gl/coa/create',
                        //update: 'gl/coa/update',
                        //destroy: 'gl/coa/delete'
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
                    },
                    extraParams: {
                        hideparam: 'project'
                    }


                }
            }, cfg)]);
    }
});