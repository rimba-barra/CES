Ext.define('Appsmgmt.store.GroupUser', {
    extend: 'Ext.data.Store',
    alias: 'store.GroupUserStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GroupUserStore',
            model: 'Appsmgmt.model.GroupUser',
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
                    read: 'appsmgmt/accessright/groupuserread',
                    create: 'appsmgmt/accessright/groupusercreate',
                    update: 'appsmgmt/accessright/groupuserupdate',
                    destroy: 'appsmgmt/accessright/groupuserdelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_user_id',
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