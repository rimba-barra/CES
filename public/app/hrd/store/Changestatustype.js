Ext.define('Hrd.store.Changestatustype', {
    extend: 'Ext.data.Store',
    alias: 'store.changestatustype',
    fields: [
        {name: 'changetype_id', type: 'int'},
        {name: 'name', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        
        /*
        var s = 2015;
        var e = new Date().getFullYear();
        e = parseInt(e) + 5;
        
        var data = [];
        while (s <= e) {
            var r = [];
            r.changetype_id = s;
            r.name = s;
            data.push(r);
            s++;
        }
        */
        
        var data = [
            {"changetype_id": 1, "name": 'PROMOSI'},
            {"changetype_id": 2, "name": 'ROTASI'},
            {"changetype_id": 3, "name": 'MUTASI'},
            {"changetype_id": 4, "name": 'DEMOSI'},
        ];
        
        me.callParent([
            Ext.apply({
                storeId: 'ChangestatustypeStore',
                data: data,
            }, cfg)]);

    }
});