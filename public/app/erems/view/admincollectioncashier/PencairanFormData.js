Ext.define('Erems.view.admincollectioncashier.PencairanFormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.admincollectioncashierpencairanformdata',
    requires:[
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.view.admincollectioncashier.PencairanGrid',
                'Erems.view.admincollectioncashier.Gridcoadetail',
                'Erems.library.template.combobox.Voucherprefixcombobox',
                'Erems.library.template.combobox.Statuscombobox',
                'Erems.library.template.combobox.Groupcombobox'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

		function dateOneYear(){
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth()+x);
			return CurrentDate;
		}

        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_unit_id',
                    name: 'unit_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_bankkpr_id',
                    name: 'bankkpr_id'
                },
                
                {
                    xtype: 'hiddenfield',
                    name: 'pt_pt_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'paymentcashier_thcoa_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'paymentcashier_voucherprefix_id'
                    
                },
                {
                    xtype: 'hiddenfield',
                    name: 'paymentcashier_th_kasbank_id'
                    
                },
                {
                    xtype: 'hiddenfield',
                    name: 'is_out'
                    
                },
                {xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
                    items: [
                        {
                            layout: 'hbox',
                            padding: '10px 0 0 0',
                            bodyStyle: 'border:0px',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'panel', flex: 8,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kawasan / Cluster',
                                                    anchor: '-5',
                                                    name: 'cluster_code',
                                                    flex: 5,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                },
                                                {
                                                    xtype: 'clustercombobox',
                                                    itemId: 'fd_clustercb',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'unit_cluster_id',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Block name',
                                                    anchor: '-5',
                                                    name: 'block_code',
                                                    flex: 5,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'blockcombobox',
                                                    itemId: 'fd_blockcb',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'unit_block_id',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'combobox',
                                                    fieldLabel: 'Kavling / Unit No. ',
                                                    anchor: '-5',
                                                    name: 'unit_unit_number',
                                                    flex: 6,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }/*, {
                                                    xtype: 'splitter', width: 5,
                                                }, {
                                                    xtype: 'button',
                                                    text: 'Browse Unit',
                                                    itemId: 'fd_browse_unit_btn',
                                                    padding: '2px 5px',
                                                    action: 'browse_unit',
                                                    iconCls: 'icon-search',
                                                    style: 'background-color:#FFC000;'
                                                },
                                                {xtype: 'label', text: '', flex: 2}*/]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'PT Name',
                                                    anchor: '-5',
                                                    name: 'unit_pt_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        }
                                    ]
                                },
                                {xtype: 'splitter', width: 30},
                                {
                                    xtype: 'panel', flex: 7,
                                    layout: {
                                        type: 'vbox',
                                        defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    },
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Product Category',
                                                    anchor: '-5',
                                                    name: 'unit_productcategory',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Type',
                                                    anchor: '-5',
                                                    name: 'unit_type_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Land Size',
                                                    anchor: '-5',
                                                    name: 'unit_land_size',
                                                    flex: 12,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Long',
                                                    anchor: '-5',
                                                    name: 'unit_long',
                                                    flex: 6,
													readOnly: true,
                                                    labelWidth: 30,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        },
                                        {
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Building Size',
                                                    anchor: '-5',
                                                    name: 'unit_building_size',
                                                    flex: 12,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Width',
                                                    anchor: '-5',
                                                    name: 'unit_width',
                                                    flex: 6,
                                                    labelWidth: 30,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        },
										{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Electricity power',
                                                    anchor: '-5',
                                                    name: 'unit_electricity',
                                                    flex: 6,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'Watt', flex: 1, margin: '0 0 0 10px'}]
                                        }
                                        /*{
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Kelebihan Tanah',
                                                    anchor: '-5',
                                                    name: 'unit_kelebihan',
                                                    flex: 12,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                {
                                                    xtype: 'splitter', width: 30,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Floor',
                                                    anchor: '-5',
                                                    name: 'unit_floor',
                                                    flex: 6,
                                                    labelWidth: 30,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                },
                                                {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
                                            ]
                                        }*/
                                    ]
                                }
                            ]
                        }

                    ]
                },
               /* PURCHASE LETTER & CUSTOMER INFORMATION */
               	{xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER & CUSTOMER INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    flex: 3,
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Purchase Letter No.',
                                                    anchor: '-5',
                                                    name: 'purchaseletter_no',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Purchase Letter Date',
                                                    anchor: '-5',
                                                    name: 'purchase_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
                                        {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Customer Name',
                                                    anchor: '-5',
                                                    name: 'customer_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Akad Date',
                                                    anchor: '-5',
                                                    name: 'akad_realisasiondate',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													/*format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'*/
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'KTP Number',
                                                    anchor: '-5',
                                                    name: 'customer_ktp',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'NPWP',
                                                    anchor: '-5',
                                                    name: 'customer_npwp',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                        {
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Address',
                                                    anchor     : '-5',
                                                    name       : 'customer_address',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }
                                            ]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
													xtype: 'citycombobox',
													anchor: '-5',
													itemId:'fd_city',
													flex: 1,
													readOnly: true,
													fieldLabel: 'City',
													name: 'customer_city_id',
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}, {
                                                    xtype: 'splitter', width: 20,
                                                },{
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Phone',
                                                    name       : 'customer_homephone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Email',
                                                    anchor: '-5',
                                                    name: 'customer_email',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
                                                    xtype      : 'xphonenumberfieldEST',
                                                    fieldLabel : 'Mobile Phone',
                                                    name       : 'customer_mobilephone',
                                                    flex       : 1,
                                                    readOnly   : true,
                                                    anchor     : '-5',
                                                    fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Netto Price',
                                                    anchor: '-5',
                                                    name: 'harga_netto',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
                                                    xtype: 'pricetypecombobox',
													anchor: '-5',
													itemId:'fd_pricetype',
													flex: 1,
													readOnly: true,
													fieldLabel: 'Price Type',
													name: 'pricetype_id',
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total payment',
                                                    anchor: '-5',
                                                    name: 'total_payment',
                                                    flex: 1,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Payment percentage (%)',
                                                    anchor: '-5',
                                                    name: 'payment_percentage',
                                                    flex: 1,
													readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
										{
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Realisation price',
                                                    anchor: '-5',
                                                    name: 'kpr_value_approve',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'ACC Date',
                                                    anchor: '-5',
                                                    name: 'kpapprove_date',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													/*format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'*/
                                                }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
				 /* DETAIL PENCAIRAN */
               	{xtype: 'panel', bodyPadding: 10, title: 'DETAIL PENCAIRAN', collapsible: true,
                    width: '100%',
                    items: [
						{
							xtype: 'panel',
                            layout: 'fit',
                            bodyStyle: 'border:0px',
                            items: [
								{
									//  bodyPadding: 10,
									padding: '10px 0 0 0',
									layout: 'hbox',
									bodyStyle: 'border:0px',
									items: [{
											xtype: 'admincollectioncashierpencairangrid',
											width: '100%',
											itemId: 'MyPencairanGrid'
									}]
								}
							]
						}
					]
				},
                                {xtype: 'panel', bodyPadding: 10, title: 'CASH/BANK INFORMATION', collapsible: true,
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 2,
                                    width: '100%',
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            flex: 3,
                                            layout: 'vbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                  {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'xmoneyfield',
                                                    fieldLabel: 'TOTAL PAYMENT',
                                                    name: 'total_payment_selected',
                                                    maskRe: /[0-9\.]/,
                                                    value:0.00,
                                                    currencyFormat: true,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right',
                                                 
                                                    flex: 1,
                                                }]
                                        },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'datefield',
                                            fieldLabel: 'Accept Date',
                                            itemId: 'fd_accept_date',
                                            id: 'accept_date_qq',
                                            name: 'paymentcashier_accept_date',
                                            format: 'd-m-Y',
                                            submitFormat: 'Y-m-d H:i:s.u',
                                            flex: 1,
                                            width: 300
                        }]
                                                },
                                               
                                                
                                                
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                        xtype: 'statuscombobox',
                            fieldLabel: 'Payment Type',
                            emptyText: 'Select Bank/Cash',
                            itemId: 'fdms_cash_bank',
                            name: 'paymentcashier_kasbank',
                            allowBlank: false,
                            enforceMaxLength: true,
                        }]
                                                },
                                                
                                                
                                                
                                                
                                             
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                             xtype: 'deptprefixcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id',
                            id: 'department_id_c',
                            name: 'paymentcashier_department_id',
                            emptyText: '',
                            width: 400,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                                                        },
                                                        {xtype: 'label', text: '', flex: 1}]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'voucherprefixcombobox',
                                                            fieldLabel: 'Prefix Cash',  
                                                            displayField: 'coa',
                                                            valueField:'prefix_id',
                                                            id: 'voucherprefix_cash',
                                                            name: 'paymentcashier_prefix_id',
                                                            width: 400,
                                                           readOnly: true,
                                                           allowBlank :false,
                                                        }
                                                    ]
                                                },
                                                 {
                                                    padding   : '10px 0 0 0',
                                                    layout    : 'hbox',
                                                    width     : '100%',
                                                    bodyStyle : 'border:0px',
                                                    items     : [
                                                        {
                                                            xtype        : 'xnotefieldEST',
                                                            fieldLabel   : 'Notes ',  
                                                            displayField : 'Notes',
                                                            id           : 'notes',
                                                            name         : 'notes',
                                                            height       : 50,
                                                            width        : 400
                                                        }
                                                    ]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'voucherprefixcombobox',
                                                            fieldLabel: 'Prefix Bank',     
                                                            id: 'voucherprefix_bank',
                                                            name: 'paymentcashier_prefix_id_bank',
                                                            width: 400,
                                                           readOnly: true,
                                                           hidden:true,
                                                           allowBlank :false,
                                                        }]
                                                },
                                           

                                            ]
                                        },
                                        {xtype: 'splitter', width: 30},
                                        {
                                            xtype: 'panel',
                                            flex: 2,
                                            layout: 'vbox',
                                            bodyStyle: 'border:0px',
                                            items: [
                                                
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                            xtype: 'groupcombobox',
                            fieldLabel: 'Group Trans',
                            itemId: 'fd_grouptrans_id',
                            id: 'grouptrans_id_eeee',
                            name: 'paymentcashier_grouptrans_id',          
                            width: 200,
                            readOnly: true,

                                                        }]
                                                },
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 0 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                           
                            xtype: 'textfield',
                            fieldLabel: 'Transaction No.',
                            itemId: 'fd_transno',
                            id: 'transno_c',
                            name: 'paymentcashier_transno',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                                                        }]
                                                },
                                                
                                                {
                                            //  bodyPadding: 10,
                                            padding: '10px 0 0 0',
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'No. Voucher Finance',
                                                    name: 'voucher_no',
                                                    id:'voucher_erems',
                                                    keepRO: true,
                                                    readOnly: true,
                                                    flex: 1,
                                                }]
                                        },
                                        
                                             {
                padding: '10px 0 0 0',
               layout: 'hbox',
               width: '100%',
               bodyStyle: 'border:0px',
               items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Cheque / Giro No.',
                    itemId: 'fd_chequegiro_no',
                    id: 'chequegiro_no_ww',
                    name: 'paymentcashier_chequegiro_no',
                    emptyText: 'Manual Input',
                    hidden:true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    width: 260
                    }]
                },
                                        //sini
                                                
                                                {
                                                    //  bodyPadding: 10,
                                                    padding: '10px 0 10px 0',
                                                    layout: 'hbox',
                                                    width: '100%',
                                                    bodyStyle: 'border:0px',
                                                    items: [{
                                                          
                            xtype: 'datefield',
                            fieldLabel: 'Cheque Giro Date',
                            itemId: 'fd_chequegiro_date',
                            id: 'chequegiro_date_ww',
                            name: 'paymentcashier_chequegiro_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d H:i:s.u',
                            width: 260,
                            hidden:true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                                                        }]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                //////// bagian bawah ///

                            ]
                        },
                        {
                    // Fieldset in Column 1
                    xtype: 'panel',
                    
                    collapsible: false,
                    defaults: {anchor: '100%'},
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'coadetailgrid',
                            name: 'coadetailgrid',
                            title: 'Coa Detail',
                            width: '100%',
                            height: 200,
                            padding: '10px 0 0 0px',
                            enableKeyEvents: true,
                        },
                    ]
                },
               
             
                                                
                                    
                          
                
                    ]
                },
                
                
                {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                align: 'left',
                                bodyBorder: false,
                                defaults: {
                                    layout: 'fit'
                                },
                                items: [
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                    {
                                        xtype: 'xmoneyfield',                         
                                        anchor: '100%',
                                        itemId: 'fd_totalheader_eeee',
                                        id: 'totalheader',
                                        name: 'totalheader',
                                        fieldLabel: ' Header',   
                                        emptyText: 'Auto Value',
                                        width: 220,
                                        value: 0, 
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,                            
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                     {
                                        xtype: 'xmoneyfield',                         
                                        anchor: '100%',
                                        itemId: 'fd_totaldetail_eeeee',
                                        id: 'totaldetail',
                                        name: 'totaldetail',
                                        fieldLabel: ' Detail ',   
                                        emptyText: 'Auto Value',
                                        value: 0, 
                                        width: 220,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,                            
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },  
                                    
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                     {
                                        xtype: 'xmoneyfield',                         
                                        anchor: '100%',
                                        itemId: 'fd_balance_eeee',
                                        id: 'balance',
                                        name: 'balance',
                                        fieldLabel: 'Balance',   
                                        emptyText: 'Auto Value',
                                        value: 0, 
                                        width: 220,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                        enforceMaxLength: true,
                                        readOnly: true,
                                        allowBlank: false,                            
                                        enableKeyEvents: true,
                                        rowdata: null
                                    },  
                                    
                                ]
                            },
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});