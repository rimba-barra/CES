Ext.define('Erems.model.Sppjb', {
    extend: 'Ext.data.Model',
    alias: 'model.sppjbmodel',
    idProperty: 'sppjb_id',
    fields: [
        {name: 'sppjb_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'unit_id', type: 'int'},
        {name: 'parametersppjb_id', type: 'int'},
        {name: 'purchaseletter_id', type: 'int'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'sppjb_no', type: 'string'},
        {name: 'sppjb_name', type: 'string'},
        {name: 'sppjb_address', type: 'string'},
        {name: 'sppjb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'sppjb_ktp', type: 'string'},
		{name: 'sppjb_npwp', type: 'string'},
        {name: 'atasnama', type: 'string'},
        {name: 'suratkuasa_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'serahterima_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'tandatangan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'serahterimaplan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'serahterimaplan_month', type: 'int'},
		{name: 'electricity', type: 'decimal'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
        {name: 'unit_number', type: 'string'},
        {name: 'land_size', type: 'decimal'},
        {name: 'building_size', type: 'decimal'},
        {name: 'floor_size', type: 'decimal'},
		{name: 'floor', type: 'int'},
		{name: 'bedroom', type: 'int'},
		{name: 'bathroom', type: 'int'},
		{name: 'electricity', type: 'decimal'},
        {name: 'width', type: 'decimal'},
		{name: 'long', type: 'decimal'},
		{name: 'kelebihan', type: 'decimal'},
		{name: 'depan', type: 'decimal'},
		{name: 'samping', type: 'decimal'},
		{name: 'belakang', type: 'decimal'},
		{name: 'code', type: 'string'},
        {name: 'cluster', type: 'string'},
		{name: 'block_code', type: 'string'},
		{name: 'block', type: 'string'},
		{name: 'radio_st_group', type: 'string'},
		{name: 'customer_name', type: 'string'},
        {name: 'more_customers', type: 'string'},
        {name: 'customer_address', type: 'string'},
        {name: 'customer_city_id', type: 'int'},
        {name: 'customer_zipcode', type: 'string'},
        {name: 'customer_homephone', type: 'string'},
        {name: 'customer_mobilephone', type: 'string'},
        {name: 'customer_officephone', type: 'string'},
        {name: 'customer_fax', type: 'string'},
        {name: 'customer_ktp', type: 'string'},
        {name: 'customer_npwp', type: 'string'},
        {name: 'customer_email', type: 'string'},
		{name: 'unit_electricity', type: 'decimal'},

        //added for sby
        {name: 'sent_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'received_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'return_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		
		{name: 'ijb_no', type: 'string'},
		{name: 'ijb_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'ijb_name', type: 'string'},
		{name: 'notaris_id', type: 'int'},
		{name: 'land_size_sppjb', type: 'decimal'},
		
		{name: 'finish_constr_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		
		{name: 'addby_user', type: 'string'},
		{name: 'modiby_user', type: 'string'},
		{name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		
		{name: 'note', type: 'string'},
		{name: 'adendum_ke', type: 'string'},
        {name: 'received_name', type: 'string'}, // addby: fatkur, addon:19/7/19
        {name: 'kelurahan_unit', type: 'string'}, // addby: fatkur, addon:23/12/19
        {name: 'kecamatan_unit', type: 'string'}, // addby: fatkur, addon:23/12/19,

        //added by rico 27082021
        {name: 'nomor_identifikasi_rumah', type: 'string'},

        //added by rico 16022022
        {name: 'is_cancel', type: 'int'},

        //added by rico 05072022
        {name: 'customer_ktp_address', type: 'string'},

        //added by rico 05072022
        {name: 'sppjb_kuasa_name', type: 'string'},
        {name: 'sppjb_kuasa_npwp', type: 'string'},
        {name: 'sppjb_kuasa_ktp', type: 'string'},
        {name: 'sppjb_kuasa_address', type: 'string'},
        {name: 'sppjb_doc_id', type: 'string'},

        {name: 'pjb_lunas_no', type: 'string'},
        {name: 'pjb_notaris', type: 'string'},
        {name: 'pjb_lunas_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'pjb_lunas_sign_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'}
    ]
});