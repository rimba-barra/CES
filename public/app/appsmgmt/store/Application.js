Ext.define('Appsmgmt.store.Application', {
    extend: 'Ext.data.Store',
    alias: 'store.AppsStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'ApplicationStore',
            model: 'Appsmgmt.model.Application',
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
                    read: 'appsmgmt/application/appsread',
                    create: 'appsmgmt/application/appscreate',
                    update: 'appsmgmt/application/appsupdate',
                    destroy: 'appsmgmt/application/appsdelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'apps_id',
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