Ext.define('Appsmgmt.store.GroupAction', {
    extend: 'Ext.data.Store',
    alias: 'store.GroupActionStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GroupActionStore',
            model: 'Appsmgmt.model.GroupAction',
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
                    read: 'appsmgmt/accessright/groupactionread',
                    create: 'appsmgmt/accessright/groupactioncreate',
                    update: 'appsmgmt/accessright/groupactionupdate',
                    destroy: 'appsmgmt/accessright/groupactiondelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_action_id',
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