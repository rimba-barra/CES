Ext.define('Erems.model.Pengumpulanberkas', {
        extend: 'Ext.data.Model',
        alias: 'model.pengumpulanberkasmodel',
        idProperty: 'berkas_surat_id',
        fields: [
                { name: 'berkas_id', type: 'int' },
                { name: 'berkas_surat_detail_id', type: 'int' },
                { name: 'purchaseletter_id', type: 'int' },
                { name: 'berkas_spr_id', type: 'int' },
                { name: 'berkas_surat_id', type: 'int' },
                { name: 'berkas_no', type: 'string' },
                { name: 'berkas_date', type: 'date' },
                { name: 'berkas_index', type: 'string' },
                { name: 'berkas_status_all', type: 'string' },
                { name: 'berkas_jatuhtempo_date', type: 'date' },
                { name: 'berkas_group_menu', type: 'string' },

                { name: 'berkas_code', type: 'string' },
                { name: 'berkas_name', type: 'string' },
                { name: 'berkas_description', type: 'string' },
                { name: 'berkas_status', type: 'string' },
                { name: 'tgl_tambah', type: 'date' },
                { name: 'tgl_ubah', type: 'date' },
                { name: 'user_tambah', type: 'string' },
                { name: 'user_ubah', type: 'string' },

                { name: 'code', type: 'string' },
                { name: 'berkas', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'details_data', type: 'array' },
                { name: 'details_spr', type: 'array' },

                { name: 'unit_id', type: 'int' },
                { name: 'unit_number', type: 'string' },
                { name: 'cluster_id', type: 'int' },
                { name: 'block_id', type: 'int' },
                { name: 'customer_name', type: 'string' },
                { name: 'cluster', type: 'string' },
                { name: 'block', type: 'string' },
                { name: 'purchaseletter_no', type: 'string' },
                { name: 'purchase_date', type: 'date' },
                { name: 'lastdate_um', type: 'date' },

                { name: 'spr_no', type: 'string' },
                { name: 'spr_date', type: 'date' },
                { name: 'spr_index', type: 'int' },
                { name: 'spr_next_date', type: 'date' },
                { name: 'notes', type: 'string' },


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