Ext.define('Appsmgmt.store.Object', {
    extend: 'Ext.data.Store',
    alias: 'store.ObjectStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ObjectStore',
            model: 'Appsmgmt.model.Object',
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
                    read: 'appsmgmt/application/objectread',
                    create: 'appsmgmt/application/objectread',
                    update: 'appsmgmt/application/objectread',
                    destroy: 'appsmgmt/application/objectread'
                },
                reader: {
                    type: 'json',
                    idProperty: 'object_id',
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