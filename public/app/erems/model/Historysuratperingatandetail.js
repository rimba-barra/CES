Ext.define('Erems.model.Historysuratperingatandetail', {
        extend: 'Ext.data.Model',
        alias: 'model.historysuratperingatandetailmodel',
        idProperty: 'suratperingatan_detail_id',
        fields: [
                { name: 'suratperingatan_id', type: 'int' },
                { name: 'suratperingatan_detail_id', type: 'int' },
                { name: 'purchaseletter_id', type: 'int' },
                { name: 'scheduletype', type: 'string' },
                { name: 'termin', type: 'int' },
                { name: 'duedate', type: 'date' },
                { name: 'remaining_balance', type: 'float' },
                { name: 'remaining_denda', type: 'float' },

                { name: 'addon', type: 'date' },
                { name: 'adduser', type: 'string' },
                { name: 'modion', type: 'date' },
                { name: 'modiuser', type: 'string' },
                { name: 'addby', type: 'int' },
                { name: 'modiby', type: 'int' },
                { name: 'deleted', type: 'boolean' },

                { name: 'mode_create', type: 'string' },
                { name: 'read_type_mode', type: 'string' },


        ]
});