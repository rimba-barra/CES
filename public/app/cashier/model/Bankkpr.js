Ext.define('Cashier.model.Bankkpr', {
    extend: 'Ext.data.Model',
    alias: 'model.bankkprmodel',
    idProperty: 'purchaseletter_bankkpr_id',
    fields: [
		{name: 'purchaseletter_bankkpr_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},

		{name: 'bank_id', type: 'int'},
		{name: 'bank_createdby', type: 'int'},

		{name: 'appraisalplan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'appraisal_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'appraisal_createdby', type: 'int'},
		
		{name: 'berkasmasuk_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'berkasbank_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'berkasbank_createdby', type: 'int'},
		
		{name: 'interviewplan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'interview_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'interview_createdby', type: 'int'},
		{name: 'interview_pic', type: 'string'},
		
		{name: 'kpr_acc_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'kpr_realisation', type: 'decimal'},
		{name: 'kpr_tenor', type: 'int'},
		{name: 'kpr_interest', type: 'decimal'},
		{name: 'kpr_cicilan', type: 'decimal'},
		{name: 'kpr_createdby', type: 'int'},
		
		{name: 'rejected_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'nextprocess_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'reject_createdby', type: 'int'},
		
		{name: 'akadplan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'akad_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'akad_createdby', type: 'int'},
		
		{name: 'is_use', type: 'boolean'},
		{name: 'note', type: 'string'},
		
		{name: 'bank_name', type: 'string'},
		{name: 'bank_company_name', type: 'string'},
		
		{name: 'bank_createdby_name', type: 'string'},
		{name: 'appraisal_createdby_name', type: 'string'},
		{name: 'berkasbank_createdby_name', type: 'string'},
		{name: 'interview_createdby_name', type: 'string'},
		{name: 'kpr_createdby_name', type: 'string'},
		{name: 'reject_createdby_name', type: 'string'},
		{name: 'akad_createdby_name', type: 'string'},
		
		{name: 'is_bayarpajak', type: 'boolean'},
		{name: 'pajak_amount', type: 'decimal'},
		{name: 'data_akad' , type:'auto'},
		{name: 'temp_id_detail' , type:'string'},
		
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'}
    ]
});