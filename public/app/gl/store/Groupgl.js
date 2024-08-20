Ext.define('Gl.store.Groupgl', {
    extend: 'Ext.data.Store',
    alias: 'store.groupgldatastore',
    fields: [
        {name: 'group_gl', type: 'string'},
        {name: 'description', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GroupglStore',
                data: [
                    {"group_gl": "01", "description": "Active"},
                    {"group_gl": "02", "description": "Passive"},
                ],
            }, cfg)]);
    }
});