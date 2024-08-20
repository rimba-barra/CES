Ext.define('Erems.store.Komisi', {
    extend: 'Ext.data.ArrayStore',
    // extend: 'Ext.data.Store',
    alias: 'store.komisistore',
    fields: [
        // 'Erems.model.Komisi'
        {name:'komisi_pencairan_detail_id',type:'int'},
        {name:'penerima_komisi',type:'string'},
        {name:'employee_name',type:'string'},
        {name:'persentase',type:'string'}
   //      'schedule_id','scheduletype_id','purchaseletter_id',{name:'duedate',type:'date'},'amount','sourcemoney_id','remaining_balance','intersetflag',
		 // 'interset','remaining_interest','recomendationdate','termin','description',
   //               'scheduletype','sourcemoney','queue','new_added'
    ],
    storeId: 'KomisiStore',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KomisiStore',
                // model: 'Erems.model.Komisi',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletter/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'komisi_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});