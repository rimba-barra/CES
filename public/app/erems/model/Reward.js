Ext.define('Erems.model.Reward', {
    extend: 'Ext.data.Model',
    alias: 'model.rewardmodel',
    idProperty: 'purchaseletter_id',
    fields: [
		{name: 'purchaseletter_id', type: 'int'},		
		{name: 'cluster_id', type: 'int'},		
		{name: 'code', type: 'string'},
        {name: 'cluster', type: 'string'},
		{name: 'unit_number', type: 'string'},
		{name: 'purchaseletter_no', type: 'string'},
		{name: 'purchase_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'customer_name', type: 'string'},
		{name: 'rewardsales_id', type: 'int'},
		{name: 'rewardcustomer_id', type: 'int'},
		{name: 'rewardtambahan_id', type: 'int'},
		{name: 'rewardsales', type: 'int'},
		{name: 'ket_reward_sales', type: 'string'},
		{name: 'rewardsales_checkby', type: 'string'},		
		{name: 'rewardcustomer', type: 'int'},
		{name: 'ket_reward_customer', type: 'string'},
		{name: 'rewardcustomer_checkby', type: 'string'},
		{name: 'rewardtambahan', type: 'int'},
		{name: 'ket_reward_tambahan', type: 'string'},
		{name: 'rewardtambahan_checkby', type: 'string'},
		{name: 'is_bgb', type: 'int'},
		{name: 'bgb', type: 'int'},

        //added by anas 19022021
		{name: 'promo', type: 'string'},
		{name: 'promo_st_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'promo_st_date_str', type: 'string'},		
        //end added by anas 19022021

        /// added by Erwin.S 20042021
		{name: 'closing_fee_value', type: 'float'},
		{name: 'is_approve_closing_fee', type: 'int'},
		{name: 'closing_fee_approved_by_user', type: 'string'},
		{name: 'blt_value', type: 'float'},
		{name: 'is_approve_blt', type: 'int'},
		{name: 'blt_approved_by_user', type: 'string'},
		{name: 'extrareward_value', type: 'float'},
		{name: 'is_approve_extrareward', type: 'int'},
		{name: 'extrareward_approved_by_user', type: 'string'},
		{name: 'harga_netto', type: 'float'},
		{name: 'harga_total_jual', type: 'float'},
		{name: 'salesman', type: 'string'},
        /////////////////////////////

        //added by anas 21072021
        
		{name: 'rewardsales_coll', type: 'int'},
		{name: 'rewardsales_coll_checkby', type: 'string'},
		{name: 'rewardcustomer_coll', type: 'int'},
		{name: 'rewardcustomer_coll_checkby', type: 'string'},
		{name: 'rewardtambahan_coll', type: 'int'},
		{name: 'rewardtambahan_coll_checkby', type: 'string'},		
		{name: 'bgb_coll', type: 'int'},
		{name: 'bgb_coll_checkby', type: 'string'},
		{name: 'bgb_done_coll', type: 'int'},
		{name: 'bgb_done_coll_checkby', type: 'string'},
		{name: 'closing_fee_coll', type: 'int'},
		{name: 'closing_fee_coll_checkby', type: 'string'},
		{name: 'blt_coll', type: 'int'},
		{name: 'blt_coll_checkby', type: 'string'},
		{name: 'extrareward_coll', type: 'int'},
		{name: 'extrareward_coll_checkby', type: 'string'},

		//end added by anas
    ]
});