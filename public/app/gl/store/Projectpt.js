Ext.define('Gl.store.Projectpt', {
    extend: 'Ext.data.Store',
    alias: 'store.projectptstore',
    requires: [
        'Gl.model.Projectpt'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProjectptStore',
                model: 'Gl.model.Projectpt',
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
                        create: 'gl/coa/create',
                        update: 'gl/coa/update',
                        destroy: 'gl/coa/delete'
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
                    },
                    extraParams:{
                        hideparam :'dependcombobox',
                        project_id: 0,
                    }
                }
            }, cfg)]);
    }
});