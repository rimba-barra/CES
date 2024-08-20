Ext.define('Appsmgmt.store.UserActivity', {
    extend: 'Ext.data.Store',
    alias: 'store.UserActivityStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'UserActivityStore',
            model: 'Appsmgmt.model.UserActivity',
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
                    read: 'appsmgmt/user/activityread'
                },
                reader: {
                    type: 'json',
                    idProperty: 'user_activity_id',
                    root: 'data'
                }
            }
        }, cfg)])
    }
});