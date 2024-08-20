Ext.define('Erems.view.permintaankomisi.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.permintaankomisiformdata',
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.view.permintaankomisi.GridDetail'
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
		Ext.applyIf(me, {
			defaults: {
				//labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'fdms_id',
					name: 'komisi_permintaan_id'
				},
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
				{
//                    xtype: 'textfield',//UNTUK TAMBAHAN PARAMETER REGENERATE KLAIM KOMISI
                    xtype: 'hiddenfield',//UNTUK TAMBAHAN PARAMETER REGENERATE KLAIM KOMISI
                    itemId: 'fdms_pricetype_id',
                    name: 'pricetype_id'
                },

				/* UNIT INFORMATION */
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
													name: 'code',
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
													xtype: 'textfield',
													fieldLabel: 'PT',
													anchor: '-5',
													name: 'unit_pt_name',
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
													xtype: 'combobox',
													fieldLabel: 'Kavling / Unit No. ',
													anchor: '-5',
													name: 'unit_unit_number',
													flex: 6,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}, {
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
												{xtype: 'label', text: '', flex: 2}]
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
										}
									]
								}
							]
						}

					]
				},
				/* END UNIT INFORMATION */

				/* PURCHASE LETTER INFORMATION */
				{xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER INFORMATION', collapsible: true,
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
													allowBlank: false,
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
												}, {xtype: 'splitter', width: 20},
												{
													xtype: 'textfield',
													fieldLabel: 'KTP Number',
													anchor: '-5',
													name: 'customer_ktp',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [{
													xtype: 'maskfield',
													mask: '##.###.###.#-###.###',
													fieldLabel: 'NPWP',
													anchor: '-5',
													name: 'customer_npwp',
													flex: 1,
													readOnly: true,
//													allowBlank: false
												}, {xtype: 'splitter', width: 20},
												{
													xtype: 'textfield',
													fieldLabel: 'Email',
													anchor: '-5',
													name: 'customer_email',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
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
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [{
													xtype: 'textfield',
													fieldLabel: 'City',
													anchor: '-5',
													name: 'customer_city',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}, {xtype: 'splitter', width: 20},
												{
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Phone',
													anchor     : '-5',
													name       : 'customer_phone',
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
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Mobile Phone',
													anchor     : '-5',
													name       : 'customer_mobile_phone',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, {xtype: 'splitter', width: 20},
												{
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Office Phone',
													anchor     : '-5',
													name       : 'customer_office_phone',
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
													xtype: 'textfield',
													fieldLabel: 'Pricetype',
													anchor: '-5',
													name: 'purchaseletter_pricetype',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}, {xtype: 'splitter', width: 20},
												{
													xtype: 'textfield',
													fieldLabel: 'Salesman',
													anchor: '-5',
													name: 'purchaseletter_salesman',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [{
													xtype: 'xmoneyfield',
													fieldLabel: 'Harga Netto',
													anchor: '-5',
													name: 'purchaseletter_harga_netto',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right'
												}, {xtype: 'splitter', width: 20},
												{
													xtype: 'xmoneyfield',
													fieldLabel: 'Harga Netto Komisi',
													anchor: '-5',
													name: 'purchaseletter_harga_netto_komisi',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right'
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'xmoneyfield',
													fieldLabel: 'Harga Total Jual',
													anchor: '-5',
													name: 'purchaseletter_harga_total_jual',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;text-align:right'
												}, {xtype: 'splitter', width: 20},
												{
													xtype: 'textfield',
													fieldLabel: '% Pembayaran',
													anchor: '-5',
													name: 'permintaankomisi_persen_pembayaran',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [{
													xtype: 'textfield',
													fieldLabel: 'Total Payment',
													anchor: '-5',
													name: 'payment_total_payment',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}, {xtype: 'splitter', width: 20},
												{
													xtype: 'textfield',
													fieldLabel: 'Distribution Channel',
													anchor: '-5',
													name: 'distribution_channel',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'textfield',
													fieldLabel: 'Skema Sales',
													anchor: '-5',
													name: 'skema_sales',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										}
										
									]
								},
							]
						}
					]
				},
				/* END PURCHASELETTER INFORMATION */
				{
					xtype: 'container',
//					xtype: 'panel',
//					layout: 'fit',
//					title: 'Detail Pencairan Komisi',
					bodyStyle: 'border:0px',
					items: [
						{
							xtype: 'permintaankomisigriddetail',
//							title: 'Detail Pencairan Komisixx',
							height: 200,
							margin: '10 0 5 0'
						}
					]
				}
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	}
});

