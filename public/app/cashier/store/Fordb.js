Ext.define('Cashier.store.Fordb', {
    extend: 'Ext.data.Store',
    alias: 'store.fordbstore',
    fields: [
        {name: 'for_db_id', type: 'int'},
        {name: 'dbcorecode', type: 'string'},
        {name: 'dbcore', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FordbStore',
                data: [
                    {"for_db_id": 1,"dbcorecode":'sqlsrv', "dbcore": 'SQL SERVER'},
                    {"for_db_id": 2,"dbcorecode":'mysql', "dbcore": 'MYSQL'},
                ],
            }, cfg)]);
    }
});