Ext.define('Gl.store.Projectptv2', {
    extend: 'Ext.data.Store',
    alias: 'store.projectptstorev2',
    requires: [
        'Gl.model.Projectpt'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProjectptStorev2',
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
                         read: 'gl/common/read',
                        create: 'gl/common/create',
                        update: 'gl/common/update',
                        destroy: 'gl/common/delete'
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
                        hideparam :'projectpt',
                        project_id: 0,
                        limit: 10000
                    }
                }
            }, cfg)]);
    }
});