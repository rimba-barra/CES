Ext.define('Erems.view.writeoffdenda.FormData', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.writeoffdendaformdata',
	requires :[
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.template.component.Citraclubcombobox',
		'Erems.view.writeoffdenda.DetailGrid'
	],
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 600,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent : function() {
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
					xtype  : 'hiddenfield',
					itemId : 'writeoff_id',
					name   : 'writeoff_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_pl_id',
					name   : 'purchaseletter_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_unit_id',
					name   : 'unit_id'
				},
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'UNIT INFORMATION', 
					collapsible : true,
					items       : [
						{
							layout    : 'hbox',
							padding   : '10px 0 0 0',
							bodyStyle : 'border:0px',
							width     : '100%',
							items     : [
								{
									xtype     : 'panel', flex: 8,
									bodyStyle : 'border:0px',
									layout    : {
										type           : 'vbox',
										defaultMargins : { top: 0, right: 0, bottom: 10, left: 0 }
									},
									items : [
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Kawasan / Cluster',
													anchor     : '-5',
													name       : 'cluster_code',
													flex       : 5,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												{
													xtype : 'splitter', 
													width : 5,
												},
												{
													xtype      : 'clustercombobox',
													itemId     : 'fd_clustercb',
													fieldLabel : '',
													anchor     : '-5',
													name       : 'unit_cluster_id',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Block name',
													anchor     : '-5',
													name       : 'block_code',
													flex       : 5,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												{
													xtype : 'splitter', 
													width : 5,
												}, 
												{
													xtype      : 'blockcombobox',
													itemId     : 'fd_blockcb',
													fieldLabel : '',
													anchor     : '-5',
													name       : 'unit_block_id',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'combobox',
													fieldLabel : 'Kavling / Unit No. ',
													anchor     : '-5',
													name       : 'unit_unit_number',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												{
													xtype : 'splitter', 
													width : 5,
												}, 
												{
													xtype   : 'button',
													text    : 'Browse Unit',
													itemId  : 'fd_browse_unit_btn',
													padding : '2px 5px',
													action  : 'browse_unit',
													iconCls : 'icon-search',
													style   : 'background-color:#FFC000;'
												},
												{
													xtype: 'label', 
													text: '', 
													flex: 2
												}
											]
										}
									]
								},
								{
									xtype : 'splitter', 
									width : 30
								},
								{
									xtype     : 'panel', flex: 7,
									bodyStyle : 'border:0px',
									layout    : {
										type           : 'vbox',
										defaultMargins : { top: 0, right: 0, bottom: 10, left: 0 }
									},
									items : [
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'PT Name',
													anchor     : '-5',
													name       : 'unit_pt_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										/*{
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
										},*/
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Type',
													anchor     : '-5',
													name       : 'unit_type_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Land Size',
													anchor     : '-5',
													name       : 'unit_land_size',
													flex       : 12,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype: 'label', 
													text: 'm2', 
													flex: 1, 
													margin: '0 0 0 10px'
												},
												{
													xtype : 'splitter', 
													width : 30,
												}, 
												{
													xtype      : 'textfield',
													fieldLabel : 'Long',
													anchor     : '-5',
													name       : 'unit_long',
													flex       : 6,
													readOnly   : true,
													labelWidth : 30,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm', 
													flex   : 1, 
													margin : '0 0 0 10px'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Building Size',
													anchor     : '-5',
													name       : 'unit_building_size',
													flex       : 12,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm2', 
													flex   : 1, 
													margin : '0 0 0 10px'
												},
												{
													xtype : 'splitter', 
													width : 30,
												}, 
												{
													xtype      : 'textfield',
													fieldLabel : 'Width',
													anchor     : '-5',
													name       : 'unit_width',
													flex       : 6,
													labelWidth : 30,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm', 
													flex   : 1, 
													margin : '0 0 0 10px'
												}
											]
										},
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
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'PURCHASE LETTER & CUSTOMER INFORMATION', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Purchase Letter No.',
													anchor     : '-5',
													name       : 'purchaseletter_no',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												{
													xtype : 'splitter', 
													width : 20,
												}, 
												{
													xtype        : 'datefield',
													fieldLabel   : 'Purchase Letter Date',
													anchor       : '-5',
													name         : 'purchase_date',
													flex         : 1,
													readOnly     : true,
													fieldStyle   : 'background:none;background-color:#F2F2F2 !important;',
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Customer Name',
													anchor     : '-5',
													name       : 'customer_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
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
									]
								},
							]
						}
					]
				},
				 /* DETAIL WRITE OFF */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'DETAIL WRITE OFF', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'fit',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'Write Off No.',
									anchor     : '-5',
									name       : 'writeoff_no',
									flex       : 1,
									readOnly   : true,
									fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
								}
							]
						},
						{
							xtype     : 'panel',
							layout    : 'fit',
							bodyStyle : 'border:0px',
							items     : [
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype  : 'writeoffdendadetailgrid',
											width  : '100%',
											itemId : 'MyDetailGrid'
										}
									]
								}
							]
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'xnotefieldEST',
							fieldLabel : 'Write Off Note',
							anchor     : '-5',
							name       : 'note',
							flex       : 1,
						}
					]
				},
			],
			dockedItems : me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});