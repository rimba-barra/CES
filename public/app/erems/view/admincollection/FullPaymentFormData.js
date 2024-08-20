Ext.define('Erems.view.admincollection.FullPaymentFormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.admincollectionfullpaymentformdata',
    requires:[
		// 'Erems.library.template.component.Clustercombobox',
		// 'Erems.library.template.component.Citycombobox',
		// 'Erems.library.template.component.Pricetypecombobox',
		// 'Erems.view.admincollection.FullPaymentGrid'
		'Erems.view.admincollection.PencairanGrid',
                'Erems.view.admincollection.Hgbajbgrid'
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
                    itemId: 'fdms_payment_id',
                    name: 'payment_id'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_kpr_value_approve',
                    name: 'kpr_value_approve'
                },
				{xtype: 'panel', bodyPadding: 10, title: 'FULL PAYMENT INFORMATION', collapsible: true,
					items: [
						{
							layout: 'hbox',
							padding: '10px 0 0 0',
							bodyStyle: 'border:0px',
							width: '100%',
							items: [{
									xtype: 'textfield',
									fieldLabel: 'Payment No',
									anchor: '-5',
									name: 'payment_no',
									flex: 5,
									readOnly: true,
									fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
								}, {
									xtype: 'splitter', width: 5,
								},
								{
									xtype: 'textfield',
									fieldLabel: 'Receipt No',
									anchor: '-5',
									name: 'receipt_no',
									flex: 5,
									readOnly: true,
									fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
								}
							]
						},
						{
							layout: 'hbox',
							padding: '10px 0 0 0',
							bodyStyle: 'border:0px',
							width: '100%',
							items: [{
									xtype: 'datefield',
									fieldLabel: 'Escrow Date',
									anchor: '-5',
									name: 'payment_date',
									flex: 1,
									readOnly: true,
									fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
									format: 'd-m-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u'
								}, {
									xtype: 'splitter', width: 5,
								},
								{
									xtype: 'datefield',
									fieldLabel: 'Due Date',
									anchor: '-5',
									name: 'duedate',
									flex: 1,
									readOnly: true,
									fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
									format: 'd-m-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u'
								}
							]
						},
						{
							layout: 'hbox',
							padding: '10px 0 0 0',
							bodyStyle: 'border:0px',
							width: '100%',
							items: [{
									xtype: 'textfield',
									fieldLabel: 'Payment',
									anchor: '-5',
									name: 'payment',
									flex: 1,
									readOnly: true,
									fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
								}
							]
						}
				]},
                                            /* LEGAL INFORMATION */
                {xtype: 'panel', bodyPadding: 10, title: 'LEGAL INFORMATION', collapsible: true,
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
                                                                                        fieldLabel: 'IMB Number',
                                                                                        anchor: '-5',
                                                                                        name: 'imb_no',
                                                                                        flex: 1,
                                                                                        readOnly: true,
                                                                                        fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                                                }, {
                                                                                        xtype: 'splitter', width: 20,
                                                                                }, {
                                                                                        xtype: 'datefield',
                                                                                        fieldLabel: 'IMB Date',
                                                                                        anchor: '-5',
                                                                                        name: 'imb_date',
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
                                                                                        xtype: 'admincollectionhgbajbgrid',
                                                                                        width: '100%',
                                                                                        itemId: 'MyHgbAjbGrid'
                                                                        }]
                                                                }
                                                        ]
                                                },
                                        ]
                                }
                        ]
                },
                // {xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
                    // items: [
                        // {
                            // layout: 'hbox',
                            // padding: '10px 0 0 0',
                            // bodyStyle: 'border:0px',
                            // width: '100%',
                            // items: [
                                // {
                                    // xtype: 'panel', flex: 8,
                                    // layout: {
                                        // type: 'vbox',
                                        // defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    // },
                                    // bodyStyle: 'border:0px',
                                    // items: [
                                        // {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Kawasan / Cluster',
                                                    // anchor: '-5',
                                                    // name: 'cluster_code',
                                                    // flex: 5,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 5,
                                                // },
                                                // {
                                                    // xtype: 'clustercombobox',
                                                    // itemId: 'fd_clustercb',
                                                    // fieldLabel: '',
                                                    // anchor: '-5',
                                                    // name: 'unit_cluster_id',
                                                    // flex: 6,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }
                                            // ]
                                        // },
                                        // {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Block name',
                                                    // anchor: '-5',
                                                    // name: 'block_code',
                                                    // flex: 5,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 5,
                                                // }, {
                                                    // xtype: 'blockcombobox',
                                                    // itemId: 'fd_blockcb',
                                                    // fieldLabel: '',
                                                    // anchor: '-5',
                                                    // name: 'unit_block_id',
                                                    // flex: 6,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
                                        // {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'combobox',
                                                    // fieldLabel: 'Kavling / Unit No. ',
                                                    // anchor: '-5',
                                                    // name: 'unit_unit_number',
                                                    // flex: 6,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }/*, {
                                                    // xtype: 'splitter', width: 5,
                                                // }, {
                                                    // xtype: 'button',
                                                    // text: 'Browse Unit',
                                                    // itemId: 'fd_browse_unit_btn',
                                                    // padding: '2px 5px',
                                                    // action: 'browse_unit',
                                                    // iconCls: 'icon-search',
                                                    // style: 'background-color:#FFC000;'
                                                // },
                                                // {xtype: 'label', text: '', flex: 2}*/]
                                        // },
										// {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'PT Name',
                                                    // anchor: '-5',
                                                    // name: 'unit_pt_name',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // }
                                    // ]
                                // },
                                // {xtype: 'splitter', width: 30},
                                // {
                                    // xtype: 'panel', flex: 7,
                                    // layout: {
                                        // type: 'vbox',
                                        // defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                                    // },
                                    // bodyStyle: 'border:0px',
                                    // items: [
                                        // {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Product Category',
                                                    // anchor: '-5',
                                                    // name: 'unit_productcategory',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
                                        // {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Type',
                                                    // anchor: '-5',
                                                    // name: 'unit_type_name',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
                                        // {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Land Size',
                                                    // anchor: '-5',
                                                    // name: 'unit_land_size',
                                                    // flex: 12,
													// readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // },
                                                // {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                // {
                                                    // xtype: 'splitter', width: 30,
                                                // }, {
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Long',
                                                    // anchor: '-5',
                                                    // name: 'unit_long',
                                                    // flex: 6,
													// readOnly: true,
                                                    // labelWidth: 30,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // },
                                                // {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                            // ]
                                        // },
                                        // {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Building Size',
                                                    // anchor: '-5',
                                                    // name: 'unit_building_size',
                                                    // flex: 12,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // },
                                                // {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                // {
                                                    // xtype: 'splitter', width: 30,
                                                // }, {
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Width',
                                                    // anchor: '-5',
                                                    // name: 'unit_width',
                                                    // flex: 6,
                                                    // labelWidth: 30,
													// readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // },
                                                // {xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
                                            // ]
                                        // },
										// {
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Electricity power',
                                                    // anchor: '-5',
                                                    // name: 'unit_electricity',
                                                    // flex: 6,
													// readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // },
                                                // {xtype: 'label', text: 'Watt', flex: 1, margin: '0 0 0 10px'}]
                                        // }
                                        // /*{
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // width: '100%',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Kelebihan Tanah',
                                                    // anchor: '-5',
                                                    // name: 'unit_kelebihan',
                                                    // flex: 12,
													// readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // },
                                                // {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
                                                // {
                                                    // xtype: 'splitter', width: 30,
                                                // }, {
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Floor',
                                                    // anchor: '-5',
                                                    // name: 'unit_floor',
                                                    // flex: 6,
                                                    // labelWidth: 30,
													// readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // },
                                                // {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
                                            // ]
                                        // }*/
                                    // ]
                                // }
                            // ]
                        // }

                    // ]
                // },
               // /* PURCHASE LETTER & CUSTOMER INFORMATION */
               	// {xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER & CUSTOMER INFORMATION', collapsible: true,
                    // width: '100%',
                    // items: [
                        // {
                            // xtype: 'panel',
                            // layout: 'hbox',
                            // bodyStyle: 'border:0px',
                            // items: [
                                // {
                                    // xtype: 'panel',
                                    // width: '100%',
                                    // flex: 3,
                                    // bodyStyle: 'border:0px',
                                    // items: [
                                        // {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Purchase Letter No.',
                                                    // anchor: '-5',
                                                    // name: 'purchaseletter_no',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 20,
                                                // }, {
                                                    // xtype: 'datefield',
                                                    // fieldLabel: 'Purchase Letter Date',
                                                    // anchor: '-5',
                                                    // name: 'purchase_date',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													// format: 'd-m-Y',
													// altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													// submitFormat: 'Y-m-d H:i:s.u'
                                                // }]
                                        // },
                                        // {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Customer Name',
                                                    // anchor: '-5',
                                                    // name: 'customer_name',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 20,
                                                // }, {
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Akad Date',
                                                    // anchor: '-5',
                                                    // name: 'akad_realisasiondate',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													// /*format: 'd-m-Y',
													// altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													// submitFormat: 'Y-m-d H:i:s.u'*/
                                                // }]
                                        // },
										// {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'KTP Number',
                                                    // anchor: '-5',
                                                    // name: 'customer_ktp',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 20,
                                                // }, {
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'NPWP',
                                                    // anchor: '-5',
                                                    // name: 'customer_npwp',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
										// {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textareafield',
                                                    // fieldLabel: 'Address',
                                                    // anchor: '-5',
                                                    // name: 'customer_address',
                                                    // flex: 1,
													// //allowBlank: false,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
										// {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
													// xtype: 'citycombobox',
													// anchor: '-5',
													// itemId:'fd_city',
													// flex: 1,
													// readOnly: true,
													// fieldLabel: 'City',
													// name: 'customer_city_id',
													// fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												// }, {
                                                    // xtype: 'splitter', width: 20,
                                                // },{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Phone',
                                                    // anchor: '-5',
                                                    // name: 'customer_homephone',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
										// {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Email',
                                                    // anchor: '-5',
                                                    // name: 'customer_email',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 20,
                                                // },{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Mobile Phone',
                                                    // anchor: '-5',
                                                    // name: 'customer_mobilephone',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
										// {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Office Phone',
                                                    // anchor: '-5',
                                                    // name: 'customer_officephone',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
										// {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Netto Price',
                                                    // anchor: '-5',
                                                    // name: 'harga_netto',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 20,
                                                // },{
                                                    // xtype: 'pricetypecombobox',
													// anchor: '-5',
													// itemId:'fd_pricetype',
													// flex: 1,
													// readOnly: true,
													// fieldLabel: 'Price Type',
													// name: 'pricetype_id',
													// fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
										// {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Total payment',
                                                    // anchor: '-5',
                                                    // name: 'total_payment',
                                                    // flex: 1,
													// readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 20,
                                                // }, {
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Payment percentage (%)',
                                                    // anchor: '-5',
                                                    // name: 'payment_percentage',
                                                    // flex: 1,
													// readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }]
                                        // },
										// {
                                            // //  bodyPadding: 10,
                                            // padding: '10px 0 0 0',
                                            // layout: 'hbox',
                                            // bodyStyle: 'border:0px',
                                            // items: [{
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'Realisation price',
                                                    // anchor: '-5',
                                                    // name: 'kpr_value_approve',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                // }, {
                                                    // xtype: 'splitter', width: 20,
                                                // }, {
                                                    // xtype: 'textfield',
                                                    // fieldLabel: 'ACC Date',
                                                    // anchor: '-5',
                                                    // name: 'kpapprove_date',
                                                    // flex: 1,
                                                    // readOnly: true,
                                                    // fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													// /*format: 'd-m-Y',
													// altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													// submitFormat: 'Y-m-d H:i:s.u'*/
                                                // }]
                                        // }
                                    // ]
                                // }
                            // ]
                        // }
                    // ]
                // },
				 /* DETAIL PAYMENT */
               	{xtype: 'panel', bodyPadding: 10, title: 'DETAIL PAYMENT', collapsible: true,
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
											// xtype: 'admincollectionfullpaymentgrid',
											// width: '100%',
											// itemId: 'MyFullPaymentGrid'
											xtype: 'admincollectionpencairangrid',
											width: '100%',
											itemId: 'MyPencairanGrid'
									}]
								}
							]
						}
					]
				}
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});