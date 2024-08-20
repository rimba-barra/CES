Ext.define('Erems.view.ajbbphtb.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.ajbbphtbformdata',
    requires:[
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Citycombobox'
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
                    itemId: 'ajbbphtb_id',
                    name: 'ajbbphtb_id'
                },
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
                    itemId: 'fdms_bphtb_persen',
                    name: 'bphtb_persen'
                },
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_bajb_persen',
                    name: 'bajb_persen'
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
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
                                                    forceSelection:true,
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
                                                    forceSelection:true,
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
                                                    forceSelection:true,
                                                    listeners:{
                                                        beforequery: function(record){
                                                            record.query = new RegExp(record.query, 'i');
                                                            record.forceAll = true;
                                                        }
                                                    }
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
                                                    fieldLabel: 'PT Name',
                                                    anchor: '-5',
                                                    name: 'unit_pt_name',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
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
                                                }]
                                        },
										{
                                            padding   : '10px 0 0 0',
                                            layout    : 'hbox',
                                            bodyStyle : 'border:0px',
                                            items     : [
                                                {
                                                    xtype      : 'xaddressfieldEST',
                                                    fieldLabel : 'Customer Address',
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
                                                    xtype: 'textfield',
                                                    fieldLabel: 'NPWP',
                                                    anchor: '-5',
                                                    name: 'customer_npwp',
                                                    flex: 1,
													//allowBlank: false,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                },{
													xtype: 'citycombobox',
													anchor: '-5',
													itemId:'fd_city',
													flex: 1,
													readOnly: true,
													fieldLabel: 'City',
													name: 'customer_city_id',
                                                    forceSelection:true,
                                                    listeners:{
                                                        beforequery: function(record){
                                                            record.query = new RegExp(record.query, 'i');
                                                            record.forceAll = true;
                                                        }
                                                    }
												}]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
				/* BIAYA BIAYA Information */
               	{xtype: 'panel', bodyPadding: 10, title: 'BIAYA BIAYA', collapsible: true,
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
                                                    fieldLabel: 'Nomor Surat',
                                                    anchor: '-5',
                                                    name: 'ajbbphtb_no',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal Surat',
                                                    anchor: '-5',
                                                    name: 'ajbbphtb_date',
                                                    flex: 1,
													allowBlank: false,
													value: new Date(),
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{ xtype: 'splitter', height: 20 },
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Nilai Perolehan Object Pajak (NJOP)', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'npop',
													flex: 3,
													padding: '0 25px 0 0',
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													enableKeyEvents: true,
													//readOnly: true,
													value: 0.00,
													fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
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
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Nilai Perolehan Object Pajak Tidak Kena Pajak (NPOPTKP)', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'npoptkp',
													flex: 3,
													padding: '0 25px 0 0',
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													enableKeyEvents: true,
													value: 0.00,
													fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
												}
				
											]
										},
										{
											//  bodyPadding: 10,
											padding: '5px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 2,
													items: [
													]
												},
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 1,
													items: [
														{
															xtype: 'label',
															text: '',
															width: '100%',
															height: 2,
															padding: '8px 0 0 0',
															border: '0 0 2 0',
															style: {
																borderColor: 'black',
																borderStyle: 'solid',
															},
															flex: 1,
															margin: '0 0'
														},
														{xtype: 'label', text: '-', width: 20, padding: '0 0 0 10px'}
													]
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '5px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Nilai Perolehan Object Pajak Kena Pajak (NPOPKP)', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'npopkp',
													flex: 3,
													padding: '0 25px 0 0',
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													readOnly: true,
													value: 0.00,
													fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
												}
				
											]
										},
										{ xtype: 'splitter', height: 20 },
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 1,
													items: [
														{
															xtype: 'label', 
															text: '', 
															width: '100%',
															border: '0 0 2 0',
															style: {
																borderColor: 'black',
																borderStyle: 'solid',
															},
															flex: 1,
															margin: '0 0'}
													]
												}
											]
										},
										{ xtype: 'splitter', height: 20 },
										{
											//  bodyPadding: 10,
											padding: '0 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Nilai NETTO', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'harga_jual',
													flex: 3,
													padding: '0 25px 0 0',
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													readOnly: true,
													value: 0.00,
													fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
												}
				
											]
										},
										{ xtype: 'splitter', height: 10 },
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 1,
													items: [
														{
															xtype: 'label', 
															text: '', 
															width: '100%',
															border: '0 0 2 0',
															style: {
																borderColor: 'black',
																borderStyle: 'solid',
															},
															flex: 1,
															margin: '0 0'}
													]
												}
											]
										},
										{ xtype: 'splitter', height: 20 },
										{
											//  bodyPadding: 10,
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Bea Perolehan Hak Atas Tanah & Bangunan (BPHTB)', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'bphtb',
													flex: 3,
													padding: '0 25px 0 0',
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													enableKeyEvents: true,
													//readOnly: true,
													value: 0.00,
													fieldStyle: 'text-align:right;'
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
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Biaya AJB (Akta Jual Beli)', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'bajb',
													flex: 3,
													padding: '0 25px 0 0',
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													enableKeyEvents: true,
													value: 0.00,
													fieldStyle: 'text-align:right;'
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
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'Penerimaan Negara Bukan Pajak', flex: 1},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'nonpajak',
													flex: 3,
													padding: '0 25px 0 0',
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													enableKeyEvents: true,
													value: 0.00,
													fieldStyle: 'text-align:right;'
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
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    flex: 7,
                                                    items: [
                                                        {xtype: 'label', text: ' Biaya Tanah Kosong', flex: 1},
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    name: 'biaya_tanah_kosong',
                                                    flex: 3,
                                                    padding: '0 25px 0 0',
                                                    maskRe: /[0-9\.]/,
                                                    currencyFormat: true,
                                                    enableKeyEvents: true,
                                                    value: 0.00,
                                                    fieldStyle: 'text-align:right;'
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
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    flex: 7,
                                                    items: [
                                                        {xtype: 'label', text: ' Selisih PPH', flex: 1},
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    name: 'biaya_selisih_pph',
                                                    flex: 3,
                                                    padding: '0 25px 0 0',
                                                    maskRe: /[0-9\.]/,
                                                    currencyFormat: true,
                                                    enableKeyEvents: true,
                                                    value: 0.00,
                                                    fieldStyle: 'text-align:right;'
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
                                                    layout: 'hbox',
                                                    bodyStyle: 'border:0px',
                                                    flex: 7,
                                                    items: [
                                                        {xtype: 'label', text: 'Biaya Lain-lain', flex: 1},
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    name: 'biaya_lain_lain',
                                                    flex: 3,
                                                    padding: '0 25px 0 0',
                                                    maskRe: /[0-9\.]/,
                                                    currencyFormat: true,
                                                    enableKeyEvents: true,
                                                    value: 0.00,
                                                    fieldStyle: 'text-align:right;'
                                                }
                
                                            ]
                                        },
										{
											//  bodyPadding: 10,
											padding: '5px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 2,
													items: [
													]
												},
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 1,
													items: [
														{
															xtype: 'label',
															text: '',
															width: '100%',
															height: 2,
															padding: '8px 0 0 0',
															border: '0 0 2 0',
															style: {
																borderColor: 'black',
																borderStyle: 'solid',
															},
															flex: 1,
															margin: '0 0'
														},
														{xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
													]
												}
											]
										},
										{
											//  bodyPadding: 10,
											padding: '5px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													layout: 'hbox',
													bodyStyle: 'border:0px',
													flex: 7,
													items: [
														{xtype: 'label', text: 'TOTAL BIAYA', flex: 1, style: 'font-weight:bold;font-size:14px;'},
													]
												},
												{
													xtype: 'textfield',
													fieldLabel: '',
													name: 'total',
													flex: 3,
													padding: '0 25px 0 0',
													readOnly: true,
													maskRe: /[0-9\.]/,
													currencyFormat: true,
													value: 0.00,
													fieldStyle: 'text-align:right;background:none;background-color:#F2F2F2 !important;'
												}
				
											]
										}
                                    ]
                                }
                            ]
                        }
                    ]
                }
				/* END BIAYA BIAYA */
			],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
	
	generateDockedItem: function() {
        var x = [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                padding: 6,
                type: 'hbox'
            },
            items: [
            {
                xtype: 'button',
                action: 'save',
                itemId: 'btnSave',
                padding: 5,
                width: 75,
                iconCls: 'icon-save',
                text: 'Save'
            },
            {
                xtype: 'button',
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            },
			{
                xtype: 'button',
                action: 'prinout',
                itemId: 'btnPrintout',
                padding: 5,
                width: 75,
                iconCls: 'icon-print',
                text: 'Print',
				disabled: true
            },
            ]
        }
        ];
        return x;
    }
});