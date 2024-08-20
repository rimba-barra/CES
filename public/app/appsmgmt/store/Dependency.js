Ext.define('Appsmgmt.store.Dependency', {
    extend: 'Ext.data.Store',
    alias: 'store.DependencyStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'DependencyStore',
            model: 'Appsmgmt.model.Dependency',
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
                    read: 'appsmgmt/application/dependencyread',
                    create: 'appsmgmt/application/dependencycreate',
                    update: 'appsmgmt/application/dependencyupdate',
                    destroy: 'appsmgmt/application/dependencydelete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'apps_depend_id',
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