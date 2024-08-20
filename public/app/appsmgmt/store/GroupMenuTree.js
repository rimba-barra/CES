Ext.define('Appsmgmt.store.GroupMenuTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.GroupMenuTreeStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'GroupMenuTreeStore',
            model: 'Appsmgmt.model.GroupMenu',
            clearOnLoad: false,
            sorters: [{
                property: 'menu_parent',
                direction: 'ASC'
            }, {
                property: 'menu_order',
                direction: 'ASC'
            }, {
                property: 'menu_name',
                direction: 'ASC'
            }],
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
                    read: 'appsmgmt/accessright/groupmenutreeread',
                    create: 'appsmgmt/accessright/groupmenucreate',
                    update: 'appsmgmt/accessright/groupmenuupdate',
                    destroy: 'appsmgmt/accessright/groupmenudelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'group_menu_id',
                    root: ''
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