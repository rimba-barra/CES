Ext.define('Erems.model.Klaimkomisinewdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.klaimkomisinewdetailmodel',
    idProperty: 'komisi_klaim_id',
    fields: [
		{name: 'komisi_klaim_id', type: 'int'},
                {name: 'purchaseletter_id', type:'int'},
                {name: 'pricetype_id', type:'int'},
                
                {name: 'data_purchaseletter_id', type:'array'},
                {name: 'data_pricetype_id', type:'array'},
                
                {name: 'penerima_komisi', type: 'string'},
                {name: 'nama_karyawan', type: 'string'},
                {name: 'persentase_komisi', type: 'float'},
                {name: 'nilai_komisi', type: 'float'},
                {name: 'nilai_ppn', type: 'float'},
                {name: 'nilai_pph_pt', type: 'float'},
                {name: 'nilai_pph_perorangan', type: 'float'},
                {name: 'total_komisi', type: 'float'},
                {name: 'persen_uangmasuk_coll', type: 'float'},
                {name: 'persen_pencairan_komisi', type: 'float'},
                {name: 'komisi_sudah_cair', type: 'float'},
                {name: 'komisi_belum_cair', type: 'float'},
                {name: 'komisi_harus_cair', type: 'float'},
                
                
                {name: 'addon', type: 'date'},
                {name: 'adduser', type: 'string'},
                {name: 'modion', type: 'date'},
                {name: 'modiuser', type: 'string'},
		{name: 'addby', type: 'int'},
                {name: 'modiby', type: 'int'},
		{name: 'deleted', type: 'boolean'},
                

    ]
});