Ext.define('Erems.model.Suratperingatandetail', {
        extend: 'Ext.data.Model',
        alias: 'model.suratperingatandetailmodel',
        idProperty: 'schedule_id',
        fields: [
                { name: 'schedule_id', type: 'int' },
                { name: 'purchaseletter_id', type: 'int' },

                { name: 'scheduletype', type: 'string' },
                { name: 'scheduletype_id', type: 'int' },
                { name: 'termin', type: 'int' },
                { name: 'duedate', type: 'date' },
                { name: 'amount', type: 'float' },
                { name: 'remaining_balance', type: 'float' },
                { name: 'denda2', type: 'float' },
                { name: 'rest_denda', type: 'float' },

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