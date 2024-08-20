Ext.define('Cashier.model.Kasbondeptpostingnew', {
    extend: 'Ext.data.Model',
    alias: 'model.kasbondeptpostingmodelnew',
    idProperty: 'kasbondept_id',
    fields: [
        {name: 'kasbondept_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'department', type: 'string'},
        {name: 'kasbon_id', type: 'int'},
        {name: 'voucher_id', type: 'int'},
        {name: 'kasbank_id', type: 'int'},
        {name: 'department_id', type: 'int'},
        {name: 'voucherprefix_id', type: 'int'},
        {name: 'prefix_id', type: 'int'},
        {name: 'coa_id', type: 'int'},
        {name: 'module_id', type: 'int'},
        {name: 'made_by', type: 'int'},
        {name: 'other_made_by', type: 'string'},
        {name: 'approveby_id', type: 'int'},
        {name: 'dataflow', type: 'string'},
        {name: 'status', type: 'string'},
        {name: 'kasbank', type: 'string'},
        {name: 'voucher_no', type: 'string'},
        {name: 'voucher_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'kasbon_voucher_no', type: 'string'},
        {name: 'voucher_voucher_no', type: 'string'},
        {name: 'kasbank_voucher_no', type: 'string'},
        {name: 'chequegiro_no', type: 'string'},
        {name: 'chequegiro_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'chequegiro_handover_date', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'amount', type: 'number'},
        {name: 'amount_bayar', type: 'number'},
        {name: 'amount_selisih', type: 'number'},
        {name: 'amount_kembali', type: 'number'},
        {name: 'description', type: 'string'},
        {name: 'requestmail', type: 'int'},
        {name: 'approvemail', type: 'int'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'employee_name', type: 'string'},
        {name: 'cashier_voucher_date', type: 'date'},
        {name: 'claim_date', type: 'date'},
         {name: 'remainingkasbon', type: 'number'},
         {name: 'is_cashback', type: 'int'},
          {name: 'cashbackon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
          {name: 'uncashbackon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
          {name: 'cashbackby', type: 'string'},
          {name: 'is_realized', type: 'string'},
          {name: 'is_posting', type: 'string'},
           {name: 'approve_by_name', type: 'string'},
               {name: 'made_by_name', type: 'string'},
               {name: 'amount_cashback', type:'number'},
               {name: 'open_voucher', type:'string'},
               {name: 'voucher_dept_no', type:'string'},
               {name: 'cashier_voucher_no', type:'string'},
              {name: 'project_claim_date', type: 'date'},
               {name: 'cashbon_fund_transfer_id', type: 'int'},
                {name: 'batas_toleransi', type: 'number'},
                {name: 'is_realized_cashbon_fund', type: 'int'},
                 {name: 'project_close_date', type: 'date'},
    ]
});