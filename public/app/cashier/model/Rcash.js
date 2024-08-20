Ext.define('Cashier.model.Rcash', {
    extend: 'Ext.data.Model',
    alias: 'model.rcashmodel',
    idProperty: 'kasbank_id',
    fields: [
        {name: 'kasbank_id', type: 'int'},
        {name: 'projectpt_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'projectcode', type: 'string'},
        {name: 'projectname', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_id_revision', type: 'int'},
        {name: 'is_fixed', type: 'bit'},
        {name: 'fixed_coa_id', type: 'int'},
        {name: 'fixed_coa', type: 'string'},
        {name: 'fixed_account_desc', type: 'string'},
        {name: 'ptcode', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'ptname_revision', type: 'string'},
        {name: 'department_id', type: 'int'},
        {name: 'department', type: 'string'},
        {name: 'transno', type: 'int'},
        {name: 'voucherprefix_id', type: 'int'},
        {name: 'prefix_id', type: 'int'},
        {name: 'prefix', type: 'string'},
        {name: 'coa_id', type: 'int'},
        {name: 'coa', type: 'string'},
        {name: 'coaname', type: 'string'},
        {name: 'journal_id', type: 'int'},
        {name: 'journal_voucher_no', type: 'string'},
        {name: 'voucher_no', type: 'string'},
        {name: 'trxno', type: 'string'},      
        {name: 'yearmonth_trx', type: 'string'},      
        {name: 'flag', type: 'string'},      
        {name: 'voucher_no_revision', type: 'string'},
        {name: 'revision_note', type: 'string'},
        {name: 'voucher_no_tmp', type: 'string'},
        {name: 'grouptrans_id', type: 'int'},
        {name: 'cashbon_project_id', type: 'int'},
        {name: 'made_by', type: 'string'},
        {name: 'cashbon_create_by', type: 'string'},
        {name: 'chequegiro_reject_by', type: 'int'},
        {name: 'kasbon_paid', type: 'bit'},
        {name: 'cashbon_paid', type: 'string'},
        {name: 'is_posting', type: 'bit'},        
        {name: 'is_posting_gl', type: 'bit'},
        {name: 'is_kasbon', type: 'bit'},
        {name: 'is_rejected', type: 'bit'},
        {name: 'is_giro', type: 'bit'},
        {name: 'chequegiro_accured', type: 'bit'},
        {name: 'tmp_prefix', type: 'bit'},
        {name: 'chequegiro_no', type: 'string'},
        {name: 'dataflow', type: 'string'},
        {name: 'dataflow_revision', type: 'string'},
        {name: 'kasbank', type: 'string'},
        {name: 'chequegiro_status', type: 'string'},
        {name: 'payment', type: 'string'},
        {name: 'posting_date', type: 'date'},
        {name: 'kasbank_date', type: 'date'},
        {name: 'kasbank_date_revision', type: 'date'},
        {name: 'cashbon_date', type: 'date'},
        {name: 'chequegiro_date', type: 'date'},
        {name: 'accept_date', type: 'date'},
        {name: 'journal_voucher_date', type: 'date'},
        {name: 'chequegiro_payment_date', type: 'date'},
        {name: 'chequegiro_receive_date', type: 'date'},
        {name: 'chequegiro_reject_date', type: 'date'},
        {name: 'chequegiro_release_date', type: 'date'},
        {name: 'amount', type: 'number'},
        {name: 'amountgiro', type: 'number'},
        {name: 'balance', type: 'number'},
        {name: 'description', type: 'string'},
        {name: 'descgiro', type: 'string'},
        {name: 'form_kr_nama', type: 'string'},
        {name: 'form_kr_alamat', type: 'string'},
        {name: 'form_kr_rek_no', type: 'string'},
        {name: 'form_kr_nama_bank', type: 'string'},
        {name: 'form_kr_telp', type: 'string'},
        {name: 'form_kr_kota', type: 'string'},
        {name: 'form_kr_negara', type: 'string'},
        {name: 'form_tr_nama', type: 'string'},
        {name: 'form_tr_alamat', type: 'string'},
        {name: 'form_tr_rek_no', type: 'string'},
        {name: 'form_tr_telp', type: 'string'},
        {name: 'form_tr_kota', type: 'string'},
        {name: 'form_tr_negara', type: 'string'},
        {name: 'form_tr_nama_bank', type: 'string'},
        {name: 'form_tr_cabang_bank', type: 'string'},
        {name: 'form_tr_alamat_bank', type: 'string'},
        {name: 'form_tr_kota_bank', type: 'string'},
        {name: 'form_tr_negara_bank', type: 'string'},
        {name: 'form_tr_ket1', type: 'string'},
        {name: 'form_tr_ket2', type: 'string'},
        {name: 'form_tr_ket3', type: 'string'},
        {name: 'active', type: 'boolean'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});