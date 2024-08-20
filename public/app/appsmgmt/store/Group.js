Ext.define('Appsmgmt.store.Group', {
    extend: 'Ext.data.Store',
    alias: 'store.GroupStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GroupStore',
            model: 'Appsmgmt.model.Group',
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
                    read: 'appsmgmt/application/groupread',
                    create: 'appsmgmt/application/groupcreate',
                    update: 'appsmgmt/application/groupupdate',
                    destroy: 'appsmgmt/application/groupdelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_id',
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