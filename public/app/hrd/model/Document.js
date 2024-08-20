Ext.define('Hrd.model.Document', {
    extend: 'Ext.data.Model',
    alias: 'model.jobhistorymodel',
    idProperty: 'employee_id',
    fields: [
        {name: 'employee_id', type: 'int'},
        {name: 'dokumen_kk', type: 'string'},
        {name: 'dokumen_npwp', type: 'string'},
        {name: 'dokumen_ktp', type: 'string'},
        {name: 'dokumen_jamsostek', type: 'string'},
        {name: 'dokumen_bpjs_pp', type: 'string'},
        {name: 'dokumen_bpjs_k', type: 'string'},
        {name: 'dokumen_bpjs_kk', type: 'string'},
        {name: 'dokumen_ijazah', type: 'string'},
        {name: 'dokumen_manulife_p', type: 'string'},
        {name: 'dokumen_rekening', type: 'string'},
        {name: 'dokumen_asuransi', type: 'string'},
        //added by michael 09/08/2021
        {name: 'dokumen_vaksin1', type: 'string'},
        {name: 'dokumen_vaksin2', type: 'string'},
        //end added by michael 09/08/2021
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'no_kk', type: 'string'},
        {name: 'no_npwp', type: 'string'},
        {name: 'no_ktp', type: 'string'},
        {name: 'no_jamsostek', type: 'string'},
        {name: 'no_bpjs_pp', type: 'string'},
        {name: 'no_bpjs_k', type: 'string'},
        {name: 'no_bpjs_kk', type: 'string'},
        {name: 'no_ijazah', type: 'string'},
        {name: 'no_manulife_p', type: 'string'},
        //{name: 'no_rekening', type: 'string'},
        {name: 'no_asuransi', type: 'string'},
        //added by michael 09/08/2021
        {name: 'no_vaksin1', type: 'string'},
        {name: 'no_vaksin2', type: 'string'},
        //end added by michael 09/08/2021
        {name: 'nama_rekening', type: 'string'},
        {name: 'bank_rekening', type: 'string'},
        {name: 'nomor_rekening', type: 'string'},
        {name: 'mode_read', type: 'string'},

        //added by anas 10022022        
        {name: 'dokumen_vaksin3', type: 'string'},
        {name: 'no_vaksin3', type: 'string'},

        {name: 'dokumen_pas_foto', type: 'string'},
        {name: 'no_pas_foto', type: 'string'},
        {name: 'dokumen_stnk', type: 'string'},
        {name: 'no_stnk', type: 'string'},
    ]
});