Ext.define('Gl.store.Ptbyuser', {
    extend: 'Ext.data.Store',
    alias: 'store.ptbyuserstore',
    requires: [
        'Gl.model.Projectpt'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtbyuserStore',
                model: 'Gl.model.Projectpt',
                sorters: [{
                    property: 'projectcode',
                    direction: 'ASC'
                }, {
                    property: 'ptcode',
                    direction: 'ASC'
                }],
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
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
                        idProperty: 'pt_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'getptbyuser',
                        project_id: apps.project,
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});