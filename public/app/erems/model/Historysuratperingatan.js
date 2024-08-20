Ext.define('Erems.model.Historysuratperingatan', {
        extend: 'Ext.data.Model',
        alias: 'model.historysuratperingatanmodel',
        idProperty: 'suratperingatan_id',
        fields: [
                { name: 'suratperingatan_id', type: 'int' },
                { name: 'purchaseletter_id', type: 'int' },
                { name: 'unit_id', type: 'int' },
                { name: 'unit_number', type: 'string' },
                { name: 'cluster_id', type: 'int' },
                { name: 'block_id', type: 'int' },
                { name: 'customer_name', type: 'string' },
                { name: 'cluster', type: 'string' },
                { name: 'block', type: 'string' },
                { name: 'purchaseletter_no', type: 'string' },
                { name: 'purchase_date', type: 'date' },
                { name: 'suratperingatan_no', type: 'string' },
                { name: 'suratperingatan_index', type: 'int' },
                { name: 'suratperingatan_date', type: 'date' },
                { name: 'suratperingatan_next_date', type: 'date' },
                { name: 'customer_mobilephone', type: 'string' },
                { name: 'customer_homephone', type: 'string' },
                { name: 'customer_officephone', type: 'string' },
                { name: 'customer_address', type: 'string' },
                { name: 'customer_ktp_address', type: 'string' },


                { name: 'addon', type: 'date' },
                { name: 'adduser', type: 'string' },
                { name: 'modion', type: 'date' },
                { name: 'modiuser', type: 'string' },
                { name: 'addby', type: 'int' },
                { name: 'modiby', type: 'int' },
                { name: 'deleted', type: 'boolean' },

                { name: 'mode_create', type: 'string' },
                { name: 'read_type_mode', type: 'string' },

                { name: 'sppjb_no', type: 'string' }, // added by rico 03082023
                { name: 'tandatangan_date', type: 'date' },


        ]
});