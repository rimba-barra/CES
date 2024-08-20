Ext.define('Erems.view.reward.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.rewardgrid',
    store: 'Reward',
    bindPrefixName: 'Reward',
    newButtonLabel: 'New Reward',
    id: 'rewardgrid_id',
        
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            // dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults:{
                align: 'left',
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchaseletter_no',
                    width: 150,
                    hideable: false,
                    dataIndex: 'purchaseletter_no',
                    text: 'Purchase Letter No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kawasan',
                    width: 150,
                    dataIndex: 'cluster',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    width: 100,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cust_name',
                    width: 200,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_purchase_date',
                    width: 150,
                    dataIndex: 'purchase_date',
                    hideable: false,
                    text: 'Purchase Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardsales',
                    header: 'Reward Sales',
                    dataIndex: 'rewardsales',
                    // hidden: true,
                    align: 'center',
                    width: 80,
                    renderer: me.inlineEditRewardSales
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardsales_coll',
                    header: 'Reward Sales (Coll)',
                    dataIndex: 'rewardsales_coll',
                    // hidden: true,
                    align: 'center',
                    width: 120,
                    renderer: me.inlineEditRewardSalesColl
                },
                //end added by anas
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ket_reward_sales',
                    width: 150,
                    dataIndex: 'ket_reward_sales',
                    hideable: false,
                    text: 'Ket. Reward Sales'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardsales_checkby',
                    width: 150,
                    dataIndex: 'rewardsales_checkby',
                    hideable: false,
                    text: 'User Check'
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardsales_coll_checkby',
                    width: 150,
                    dataIndex: 'rewardsales_coll_checkby',
                    hideable: false,
                    text: 'User Check (Coll)'
                },
                //end added by anas
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardcustomer',
                    header: 'Reward Customer',
                    dataIndex: 'rewardcustomer',
                    // hidden: true,
                    align: 'center',
                    width: 100,
                    renderer: me.inlineEditRewardCustomer
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardcustomer_coll',
                    header: 'Reward Customer (Coll)',
                    dataIndex: 'rewardcustomer_coll',
                    // hidden: true,
                    align: 'center',
                    width: 130,
                    renderer: me.inlineEditRewardCustomerColl
                },
                //end added by anas
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ket_reward_customer',
                    width: 150,
                    dataIndex: 'ket_reward_customer',
                    hideable: false,
                    text: 'Ket. Reward Customer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardcustomer_checkby',
                    width: 150,
                    dataIndex: 'rewardcustomer_checkby',
                    hideable: false,
                    text: 'User Check'
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardcustomer_coll_checkby',
                    width: 150,
                    dataIndex: 'rewardcustomer_coll_checkby',
                    hideable: false,
                    text: 'User Check (Coll)'
                },
                //end added by anas
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardtambahan',
                    header: 'Reward Tambahan',
                    dataIndex: 'rewardtambahan',
                    // hidden: true,
                    align: 'center',
                    width: 110,
                    renderer: me.inlineEditRewardTambahan
                },
                //added by anas 21072021                
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardtambahan_coll',
                    header: 'Reward Tambahan (Coll)',
                    dataIndex: 'rewardtambahan_coll',
                    // hidden: true,
                    align: 'center',
                    width: 130,
                    renderer: me.inlineEditRewardTambahanColl
                },
                //end added by anas
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ket_reward_tambahan',
                    width: 150,
                    dataIndex: 'ket_reward_tambahan',
                    hideable: false,
                    text: 'Ket. Reward Tambahan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardtambahan_checkby',
                    width: 150,
                    dataIndex: 'rewardtambahan_checkby',
                    hideable: false,
                    text: 'User Check'
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rewardtambahan_coll_checkby',
                    width: 150,
                    dataIndex: 'rewardtambahan_coll_checkby',
                    hideable: false,
                    text: 'User Check (Coll)'
                },
                //end added by anas
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bgb',
                    header: 'BGB',
                    dataIndex: 'is_bgb',
                    // hidden: true,
                    align: 'center',
                    width: 50,
                    renderer: me.inlineEditBGB
                },                
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bgb_coll',
                    header: 'BGB (Coll)',
                    dataIndex: 'bgb_coll',
                    // hidden: true,
                    align: 'center',
                    width: 70,
                    renderer: me.inlineEditBGBColl
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bgb_coll_checkby',
                    width: 150,
                    dataIndex: 'bgb_coll_checkby',
                    hideable: false,
                    text: 'User Check (Coll)'
                },
                //end added by anas
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sudahbgb',
                    header: 'Sudah BGB',
                    dataIndex: 'bgb',
                    // hidden: true,
                    align: 'center',
                    width: 70,
                    renderer: me.inlineEditSudahBGB
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sudahbgb_coll',
                    header: 'Sudah BGB (Coll)',
                    dataIndex: 'bgb_done_coll',
                    // hidden: true,
                    align: 'center',
                    width: 100,
                    renderer: me.inlineEditSudahBGBColl
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_bgb_done_coll_checkby',
                    width: 150,
                    dataIndex: 'bgb_done_coll_checkby',
                    hideable: false,
                    text: 'User Check (Coll)'
                },
                //end added by anas

                //added by anas 19022021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_promo',
                    width: 150,
                    dataIndex: 'promo',
                    hideable: false,
                    text: 'Ket. Promo'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_promo_st_date',
                    width: 180,
                    dataIndex: 'promo_st_date',
                    hideable: false,
                    text: 'Tanggal ST Promo ke Customer',
                    renderer: me.inlineEditPromoDate,
                    format: "d-m-Y"
                },
                //end added by anas 19022021
                
                /// added by Erwin.S 20042021
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_closing_fee_value',
                    width     : 150,
                    dataIndex : 'closing_fee_value',
                    hideable  : false,
                    text      : 'Closing Fee',
                    align     : 'right',
                    renderer  : me.inlineEditClosingFeeValue
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_closing_fee_coll',
                    header: 'Closing Fee (Coll)',
                    dataIndex: 'closing_fee_coll',
                    // hidden: true,
                    align: 'center',
                    width: 100,
                    renderer: me.inlineEditClosingFeeColl
                },
                //end added by anas
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_is_approve_closing_fee',
                    width     : 55,
                    dataIndex : 'is_approve_closing_fee',
                    hideable  : false,
                    text      : 'Approve',
                    align     : 'center',
                    renderer  : me.inlineEditIsApproveClosingFee
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_closing_fee_approved_by',
                    width     : 150,
                    dataIndex : 'closing_fee_approved_by_user',
                    hideable  : false,
                    text      : 'Approved By'
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_closing_fee_coll_checkby',
                    width: 150,
                    dataIndex: 'closing_fee_coll_checkby',
                    hideable: false,
                    text: 'User Check (Coll)'
                },
                //end added by anas
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_blt_value',
                    width     : 150,
                    dataIndex : 'blt_value',
                    hideable  : false,
                    text      : 'BLT',
                    align     : 'right',
                    renderer  : me.inlineEditBltValue
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_blt_coll',
                    header: 'BLT (Coll)',
                    dataIndex: 'blt_coll',
                    // hidden: true,
                    align: 'center',
                    width: 70,
                    renderer: me.inlineEditBltColl
                },
                //end added by anas
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_is_approve_blt',
                    width     : 55,
                    dataIndex : 'is_approve_blt',
                    hideable  : false,
                    text      : 'Approve',
                    align     : 'center',
                    renderer  : me.inlineEditIsApproveBlt
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_blt_approved_by',
                    width     : 150,
                    dataIndex : 'blt_approved_by_user',
                    hideable  : false,
                    text      : 'Approved By'
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_blt_coll_checkby',
                    width: 150,
                    dataIndex: 'blt_coll_checkby',
                    hideable: false,
                    text: 'User Check (Coll)'
                },
                //end added by anas
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_extrareward_value',
                    width     : 150,
                    dataIndex : 'extrareward_value',
                    hideable  : false,
                    text      : 'Extra Reward',
                    align     : 'right',
                    renderer  : me.inlineEditExtraRewardValue
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_extrareward_coll',
                    header: 'Extra Reward (Coll)',
                    dataIndex: 'extrareward_coll',
                    // hidden: true,
                    align: 'center',
                    width: 110,
                    renderer: me.inlineEditExtraRewardColl
                },
                //end added by anas
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_is_approve_extrareward',
                    width     : 55,
                    dataIndex : 'is_approve_extrareward',
                    hideable  : false,
                    text      : 'Approve',
                    align     : 'center',
                    renderer  : me.inlineEditIsApproveExtraReward
                },
                {
                    xtype     : 'gridcolumn',
                    itemId    : 'colms_extrareward_approved_by',
                    width     : 150,
                    dataIndex : 'extrareward_approved_by_user',
                    hideable  : false,
                    text      : 'Approved By'
                },
                //added by anas 21072021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_extrareward_coll_checkby',
                    width: 150,
                    dataIndex: 'extrareward_coll_checkby',
                    hideable: false,
                    text: 'User Check (Coll)'
                },
                //end added by anas
                /////////////////////////////

                // me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },

    inlineEditRewardSales: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'rewardsales';
        return this.comboBoxFieldGen(name, record);  
    },
    
    inlineEditRewardCustomer: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'rewardcustomer';
        return this.comboBoxFieldGen(name, record);  
    },

    inlineEditRewardTambahan: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'rewardtambahan';
        return this.comboBoxFieldGen(name, record);  
    },    

    inlineEditBGB: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_bgb';
        return this.comboBoxFieldGen(name, record);  
    },    

    inlineEditSudahBGB: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'bgb';
        return this.comboBoxFieldGen(name, record);  
    },    
    
    //added by anas 19022021
    inlineEditPromoDate: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'promodate';
        return this.comboBoxFieldGen(name, record);  
    }, 
    //end added by anas 19022021

    /// Added by Erwin.S 20042021
    inlineEditIsApproveClosingFee : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('is_approve_closing_fee', record);  
    },
    inlineEditIsApproveBlt : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('is_approve_blt', record);  
    },
    inlineEditIsApproveExtraReward : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('is_approve_extrareward', record);  
    },
    inlineEditClosingFeeValue : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('closing_fee_value', record);  
    },
    inlineEditBltValue : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('blt_value', record);  
    },
    inlineEditExtraRewardValue : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('extrareward_value', record);  
    },
    /////////////////////////////

    //added by anas 21072021

    inlineEditRewardSalesColl: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'rewardsales_coll';
        return this.comboBoxFieldGen(name, record);  
    },

    inlineEditRewardCustomerColl: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'rewardcustomer_coll';
        return this.comboBoxFieldGen(name, record);  
    },
    inlineEditRewardTambahanColl: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'rewardtambahan_coll';
        return this.comboBoxFieldGen(name, record);  
    },    
    inlineEditBGBColl: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'bgb_coll';
        return this.comboBoxFieldGen(name, record);  
    },
    inlineEditSudahBGBColl: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'bgb_done_coll';
        return this.comboBoxFieldGen(name, record);  
    },
    inlineEditClosingFeeColl : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('closing_fee_coll', record);  
    },
    inlineEditBltColl : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('blt_coll', record);  
    },
    inlineEditExtraRewardColl : function (val, meta, record, rowIndex, colIndex, store) {
        return this.comboBoxFieldGen('extrareward_coll', record);  
    },
    //end added by anas

    comboBoxFieldGen: function(name, record){
        if(name == 'rewardsales'){
            if(record.get("rewardsales_id") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }else if(name == 'rewardcustomer'){
            if(record.get("rewardcustomer_id") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }else if(name == 'rewardtambahan'){
            if(record.get("rewardtambahan_id") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }else if(name == 'is_bgb'){
            if(record.get("bgb") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked disabled />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }
        }else if(name == 'bgb'){
            if(record.get("is_bgb") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }        

        //added by anas 19022021
        else if(name == 'promodate'){
            if(record.get("promo") == null || record.get("promo") == ""){
                var a = '<input type="text" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }else{
                var a = '<input type="date" value="'+record.get("promo_st_date_str")+'" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
            }
        }        
        //end added by anas 19022021

        /// Added by Erwin.S 20042021
        else if(name == 'is_approve_closing_fee' || name == 'is_approve_blt' || name == 'is_approve_extrareward'){
            var checked = record.get(name) == 1 ? 'checked' : '';
            var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' ' + checked + ' disabled />';
        }
        else if(name == 'closing_fee_value' || name == 'blt_value' || name == 'extrareward_value'){
            var disabled = true;
            if(name == 'blt_value'){ 
                var title = 'BLT'; 
                if(record.get("is_approve_blt") == 0){
                    disabled = false;
                }
            }
            else if(name == 'extrareward_value'){ 
                var title = 'Extra Reward'; 
                if(record.get("is_approve_extrareward") == 0){
                    disabled = false;
                }
            }
            else{
                var title = 'Closing Fee';
                if(record.get("is_approve_closing_fee") == 0){
                    disabled = false;
                }
            }

            var nominal_disabled = disabled ? 'disabled' : '';
            var email_disabled   = disabled ? 'disabled' : '';
            
            var style_disabled = disabled ? 'pointer-events: none; cursor: not-allowed;' : '';
            var icon_email     = disabled ? 'mail_not_allowed.png' : 'mail.png';
            var qtip_email     = disabled ? 'Not Allowed Send Email' : 'Send Email';      

            var a = '<input type="text" name="' + name + '" class="uang" data=' + record.get("purchaseletter_id") + ' flag="' + name + '" old_value="' + record.get(name) + '" value="' + record.get(name) + '" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" style="text-align:right; width:70%;" ' + nominal_disabled + '/> '
                    +' <a href="javascript:" class="send_email" data=' + record.get("purchaseletter_id") + ' flag="' + name + '" title_text="' + title + '" style="' + style_disabled + '" ' + email_disabled + '><img alt="" src="./app/main/images/icons/' + icon_email + '" data-qtip="' + qtip_email + '"></a>';
        }
        /////////////////////////////

        //added by anas 21072021

        else if(name == 'rewardsales_coll'){
            if(record.get("rewardsales_id") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }
        else if(name == 'rewardcustomer_coll'){
            if(record.get("rewardcustomer_id") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }
        else if(name == 'rewardtambahan_coll'){
            if(record.get("rewardtambahan_id") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }
        else if(name == 'bgb_coll'){
            if(record.get("bgb_done_coll") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked disabled />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }
        }else if(name == 'bgb_done_coll'){
            if(record.get("bgb_coll") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }
        else if(name == 'closing_fee_coll'){
            if(record.get("closing_fee_value") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }
        else if(name == 'blt_coll'){
            if(record.get("blt_value") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }        
        else if(name == 'extrareward_coll'){
            if(record.get("extrareward_value") > 0){
                if (record.get(name) == 1) {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' checked />';
                } else {
                    var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' />';
                }
            }else{
                var a = '<input type="checkbox" name="'+name+'" data=' + record.get("purchaseletter_id") + ' disabled />';
            }
        }
        //end adedd by anas

        return a;  
    }

    // generateDockedItems: function() {
    //     var me = this;

    //     var dockedItems = [
    //         {
    //             xtype: 'toolbar',
    //             dock: 'top',
    //             height: 28,
    //             items: [
    //              {
    //                     xtype: 'button',
    //                     action: 'view',
    //                     disabled: true,
    //                     itemId: 'btnView',
    //                     margin: '0 5 0 0',
    //                     iconCls: 'icon-search',
    //                     text: 'View',
    //                     bindAction: me.bindPrefixName+'Read'
    //                 }
    //             ]
    //         },
    //         {
    //             xtype: 'pagingtoolbar',
    //             dock: 'bottom',
    //             width: 360,
    //             displayInfo: true,
    //             store: this.getStore()
    //         }
    //     ];
    //     return dockedItems;
    // },
    
    // generateActionColumn: function() {
    //     var me = this;
    //     var ac = {
    //         xtype: 'actioncolumn',
    //         hidden: true,
    //         itemId: 'actioncolumn',
    //         width: 50,
    //         resizable: false,
    //         align: 'right',
    //         hideable: false,
    //         items: [
    //            {
    //                 text: 'View',
    //                 iconCls: 'icon-search',
    //                 className:'view',
    //                 bindAction: me.bindPrefixName + 'Read',
    //                 altText: 'View',
    //                 tooltip: 'View'
    //             }
    //         ]
    //     };
    //     return ac;
    // }
});
