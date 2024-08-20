Ext.define('Erems.model.Klaimkomisinew', {
    extend: 'Ext.data.Model',
    alias: 'model.klaimkomisinewmodel',
    idProperty: 'komisi_permintaan_id',
    fields: [
		{name: 'komisi_permintaan_id', type: 'int'},
                {name: 'purchaseletter_id', type:'int'},
                {name: 'pricetype_id', type:'int'},
                
                {name: 'data_purchaseletter_id', type:'array'},
                {name: 'data_pricetype_id', type:'array'},
                
                {name: 'unit_number', type: 'string'},
                {name: 'cluster_id', type: 'int'},
                {name: 'block_id', type: 'int'},
                {name: 'cluster', type: 'string'},
                {name: 'block', type: 'string'},
                {name: 'purchaseletter_no', type: 'string'},
                {name: 'customer_name', type: 'string'},
                {name: 'pricetype', type: 'string'},
                {name: 'harga_netto', type: 'float'},
                {name: 'harga_netto_komisi', type: 'float'},
                {name: 'harga_total_jual', type: 'float'},
                {name: 'payment', type: 'float'},
                {name: 'persen_bayar', type: 'float'},
                {name: 'komisi_belum_cair', type: 'int'},
                {name: 'komisi_harus_cair', type: 'int'},
                {name: 'komisi_sudah_cair', type: 'int'},
                
                {name: 'addon', type: 'date'},
                {name: 'adduser', type: 'string'},
                {name: 'modion', type: 'date'},
                {name: 'modiuser', type: 'string'},
		{name: 'addby', type: 'int'},
                {name: 'modiby', type: 'int'},
		{name: 'deleted', type: 'boolean'},

                //added by anas 29012021
                {name: 'sppjb_date', type: 'date'},
                {name: 'tandatangan_date', type: 'date'},
                

    ]
});