Ext.define('Erems.view.admincollection.PencairanFormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.admincollectionpencairanformdata',
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.view.admincollection.PencairanGrid',
		'Erems.view.admincollection.Customerdocumentgrid',
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
	initComponent: function () {
		var me = this;

		function dateOneYear() {
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth() + x);
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
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
								                    listeners:{
								                        beforequery: function(record){
								                            record.query = new RegExp(record.query, 'i');
								                            record.forceAll = true;
								                        }
								                    }
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
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
								                    listeners:{
								                        beforequery: function(record){
								                            record.query = new RegExp(record.query, 'i');
								                            record.forceAll = true;
								                        }
								                    }
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
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
								                    listeners:{
								                        beforequery: function(record){
								                            record.query = new RegExp(record.query, 'i');
								                            record.forceAll = true;
								                        }
								                    }
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
													xtype: 'datefield',
													fieldLabel: 'Akad Date',
													anchor: '-5',
													name: 'akad_realisasiondate',
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
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [{
													xtype: 'admincollectioncustomerdocumentgrid',
													width: '100%',
													itemId: 'MyACCustomerDocumentGrid'
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
													itemId: 'fd_city',
													flex: 1,
													readOnly: true,
													fieldLabel: 'City',
													name: 'customer_city_id',
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
								                    listeners:{
								                        beforequery: function(record){
								                            record.query = new RegExp(record.query, 'i');
								                            record.forceAll = true;
								                        }
								                    }
												}, {
													xtype: 'splitter', width: 20,
												}, {
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
												}, {
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
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Office Phone',
													name       : 'customer_officephone',
													flex       : 1,
													readOnly   : true,
													anchor     : '-5',
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, {
													xtype: 'splitter', width: 20,
												}, {
													xtype: 'textfield',
													fieldLabel: 'Bank',
													anchor: '-5',
													name: 'bank_name',
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
													fieldLabel: 'Total Price',
													anchor: '-5',
													name: 'harga_netto',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}, {
													xtype: 'splitter', width: 20,
												}, {
													xtype: 'pricetypecombobox',
													anchor: '-5',
													itemId: 'fd_pricetype',
													flex: 1,
													readOnly: true,
													fieldLabel: 'Price Type',
													name: 'pricetype_id',
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
								                    listeners:{
								                        beforequery: function(record){
								                            record.query = new RegExp(record.query, 'i');
								                            record.forceAll = true;
								                        }
								                    }
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
													xtype: 'datefield',
													fieldLabel: 'ACC Date',
													anchor: '-5',
													name: 'kpapprove_date',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
												}]
										}
									]
								}
							]
						}
					]
				},
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