Ext.define('Erems.model.Biayalegalitas', {
        extend: 'Ext.data.Model',
        alias: 'model.biayalegalitasmodel',
        idProperty: 'biayalegalitas_id',
        fields: [
                { name: 'biayalegalitas_id', type: 'int' },
                { name: 'purchaseletter_id', type: 'int' },
                { name: 'va_no', type: 'string' },
                { name: 'va_no_bca', type: 'string' },
                { name: 'persentase', type: 'int' },
                { name: 'biayalegalitas_total', type: 'float' },
                { name: 'biayalegalitas_time', type: 'int' },
                { name: 'biayalegalitas_value', type: 'float' },
                { name: 'is_cancel', type: 'boolean' },
                { name: 'description', type: 'string' },
                
                { name: 'jenis_biaya_1', type: 'int' },
                { name: 'jenis_biaya_2', type: 'int' },
                { name: 'jenis_biaya_3', type: 'int' },
                { name: 'jenis_biaya_4', type: 'int' },
                { name: 'jenis_biaya_5', type: 'int' },
                { name: 'notes', type: 'string' },

                { name: 'cluster', type: 'string' },
                { name: 'cluster_code', type: 'string' },
                { name: 'unit_number', type: 'string' },
                { name: 'purchaseletter_no', type: 'string' },
                { name: 'customer_name', type: 'string' },
                { name: 'pricetype', type: 'string' },
                { name: 'harga_netto', type: 'float' },
                { name: 'harga_total_jual', type: 'float' },
                { name: 'biaya_legal', type: 'float' },

                { name: 'biayalegalitas_schedule_id', type: 'int' },
                { name: 'due_date', type: 'date' },
                { name: 'scheduletype', type: 'string' },
                { name: 'termin', type: 'int' },
                { name: 'amount', type: 'float' },
                { name: 'remaining_balance', type: 'float' },

                { name: 'details_data', type: 'array' },

                { name: 'addon', type: 'date' },
                { name: 'adduser', type: 'string' },
                { name: 'modion', type: 'date' },
                { name: 'modiuser', type: 'string' },
                { name: 'addby', type: 'int' },
                { name: 'modiby', type: 'int' },
                { name: 'deleted', type: 'boolean' },

                { name: 'mode_create', type: 'string' },
                { name: 'read_type_mode', type: 'string' },

                { name: 'biaya_ajb', type: 'float' },
                { name: 'biaya_bphtb', type: 'float' },
                { name: 'biaya_bbn', type: 'float' },

                { name: 'is_use_biaya_ajb', type: 'int' },
                { name: 'is_use_biaya_bphtb', type: 'int' },
                { name: 'is_use_biaya_bbn', type: 'int' },


        ]
});