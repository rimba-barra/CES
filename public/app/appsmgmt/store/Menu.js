Ext.define('Appsmgmt.store.Menu', {
    extend: 'Ext.data.Store',
    alias: 'store.MenuStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MenuStore',
            model: 'Appsmgmt.model.Menu',
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
                    read: 'appsmgmt/application/menuread',
                    create: 'appsmgmt/application/menucreate',
                    update: 'appsmgmt/application/menuupdate',
                    destroy: 'appsmgmt/application/menudelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'menu_id',
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