Ext.define('Appsmgmt.store.Action', {
    extend: 'Ext.data.Store',
    alias: 'store.ActionStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ActionStore',
            model: 'Appsmgmt.model.Action',
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
                    read: 'appsmgmt/application/actionread',
                    create: 'appsmgmt/application/actioncreate',
                    update: 'appsmgmt/application/actionupdate',
                    destroy: 'appsmgmt/application/actiondelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'action_id',
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