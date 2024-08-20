Ext.define('Appsmgmt.store.GroupObject', {
    extend: 'Ext.data.Store',
    alias: 'store.GroupObjectStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GroupObjectStore',
            model: 'Appsmgmt.model.GroupObject',
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
                    read: 'appsmgmt/accessright/groupobjectread',
                    create: 'appsmgmt/accessright/groupobjectcreate',
                    update: 'appsmgmt/accessright/groupobjectupdate',
                    destroy: 'appsmgmt/accessright/groupobjectdelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_object_id',
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