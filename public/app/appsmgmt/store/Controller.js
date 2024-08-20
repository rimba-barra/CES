Ext.define('Appsmgmt.store.Controller', {
    extend: 'Ext.data.Store',
    alias: 'store.ControllerStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ControllerStore',
            model: 'Appsmgmt.model.Controller',
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
                    read: 'appsmgmt/application/controllerread',
                    create: 'appsmgmt/application/controllercreate',
                    update: 'appsmgmt/application/controllerupdate',
                    destroy: 'appsmgmt/application/controllerdelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'controller_id',
                    root: 'data'
                },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)])
    }
});