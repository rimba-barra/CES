Ext.define('Appsmgmt.store.MenuTree', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.MenuTreeStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MenuTreeStore',
            model: 'Appsmgmt.model.Menu',
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
                    read: 'appsmgmt/application/menutreeread',
                    create: 'appsmgmt/application/menucreate',
                    update: 'appsmgmt/application/menuupdate',
                    destroy: 'appsmgmt/application/menudelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'menu_id',
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