Ext.define('Appsmgmt.store.GroupMenu', {
    extend: 'Ext.data.Store',
    alias: 'store.GroupMenuStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GroupMenuStore',
            model: 'Appsmgmt.model.GroupMenu',
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
                    read: 'appsmgmt/accessright/groupmenuread',
                    create: 'appsmgmt/accessright/groupmenucreate',
                    update: 'appsmgmt/accessright/groupmenuupdate',
                    destroy: 'appsmgmt/accessright/groupmenudelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_menu_id',
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