Ext.define('Hrd.store.Trainingperiode', {
    extend: 'Ext.data.Store',
    alias: 'store.trainingperiode',
    fields: [
        {name: 'periode', type: 'int'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        var s = 2015;
        var e = new Date().getFullYear();
        e = parseInt(e) + 5;
        
        var data = [];
        while (s <= e) {
            var r = [];
            r.periode = s;
            data.push(r);
            s++;
        }
        me.callParent([Ext.apply({
                storeId: 'TrainingperiodeStore',
                data: data,
            }, cfg)]);
    }
});