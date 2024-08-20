Ext.define('Erems.view.mastergirik.DetailFormData', {
    extend: 'Main.library.FormData',
	
    alias: 'widget.MastergirikDetailFormData',
	itemId: 'MastergirikDetailFormData',
	
	title: 'Detail Histori Tanah',
	
	width: 650,
	
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {			
			defaults: {
				labelWidth: 60
            },
			items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'girik_detail_id',
                    name: 'girik_detail_id'
				},
				{
                    xtype: 'hiddenfield',
                    itemId: 'girik_id',
                    name: 'girik_id'
				},
				{xtype: 'panel', bodyPadding: 10, title: 'DETAIL HISTORI TANAH', collapsible: true,
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
                                                    fieldLabel: 'No Girik',
                                                    anchor: '-5',
                                                    name: 'girik_detail_no',
													allowBlank: false,
                                                    flex: 1
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal',
                                                    anchor: '-5',
                                                    name: 'girik_detail_date',
                                                    flex: 1,
													format: 'd-m-Y',
													altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat: 'Y-m-d H:i:s.u'
                                                }]
                                        },
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xaddressfieldEST',
													fieldLabel : 'Terletak di Jalan/Gang/RT',
													anchor     : '-5',
													name       : 'alamat_detail',
													flex       : 1
                                                }
											]
                                        },
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xgeneralfieldEST',
													fieldLabel : 'Kelurahan',
													name       : 'kelurahan_detail',
													anchor     : '-5',
													flex       : 1
												}, 
												{
													xtype: 'splitter', width: 20,
												}, 
												{
													xtype      : 'xgeneralfieldEST',
													fieldLabel : 'Kecamatan',
													name       : 'kecamatan_detail',
													anchor     : '-5',
													flex       : 1
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xgeneralfieldEST',
													fieldLabel : 'Kota',
													name       : 'kota_detail',
													anchor     : '-5',
													flex       : 1
                                                }, 
                                                {
                                                    xtype: 'splitter', width: 20,
                                                }, 
                                                {
													xtype      : 'textfield',
													fieldLabel : 'Luas Tanah',
													anchor     : '-5',
													name       : 'luas_detail',
													flex       : 1,
													maskRe     : /[0-9\.]/,
													value      : 0
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
                                                    fieldLabel: 'Panjang',
                                                    anchor: '-5',
                                                    name: 'panjang_detail',
													flex: 1,
													maskRe: /[0-9\.]/,
													value: 0
                                                }, {
                                                    xtype: 'splitter', width: 20,
                                                }, {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Lebar',
                                                    anchor: '-5',
                                                    name: 'lebar_detail',
                                                    flex: 1,
													maskRe: /[0-9\.]/,
													value: 0
                                                }]
                                        },
										{
											padding: '5px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											//width: '100%',
											items: [{
												xtype: 'radiogroup',
												fieldLabel: 'Jenis Surat',
												name: 'group_jenis_surat',
												width: '70%',
												labelWidth: 100,
												items: [
													{
														padding: '0 0 0 10px',
														xtype: 'radiofield',
														boxLabel: 'SPPHAT',
														name: 'jenis_surat',
														inputValue: 'SPPHAT',
														itemId: 'jenis_surat_SPPHAT',
													},
													{
														padding: '0 0 0 10px',
														xtype: 'radiofield',
														boxLabel: 'SKUMHAT',
														name: 'jenis_surat',
														inputValue: 'SKUMHAT',
														itemId: 'jenis_surat_SKUMHAT'
													}
												]
											}]
										},
										{
											padding: '10px 0 0 0',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													//  bodyPadding: 10,
													xtype: 'fieldset',
													title: 'Dari (Pemilik Pertama)',
													flex: 2,
													margin: '10px 0 0 0',
													layout: 'vbox',
													bodyStyle: 'border:0px',
													items: [
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 6,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Pemilik',
																	anchor: '-5',
																	name: 'pemilik_1',
																	flex: 1
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 6,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'No. KTP',
																	anchor: '-5',
																	name: 'ktp_no_1',
																	flex: 1
																}
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															flex      : 6,
															items     : [
																{
																	xtype      : 'xaddressfieldEST',
																	fieldLabel : 'Alamat',
																	anchor     : '-5',
																	name       : 'alamat_pemilik_1',
																	flex       : 1
																}
															]
														}
													]
												},
												{
													//  bodyPadding: 10,
													xtype: 'fieldset',
													title: 'Ke (Pemilik Kedua)',
													//flex: 2,
													margin: '10px 0 0 0',
													layout: 'vbox',
													bodyStyle: 'border:0px',
													items: [
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 6,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'Pemilik',
																	anchor: '-5',
																	name: 'pemilik_2',
																	flex: 1
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															flex: 6,
															items: [
																{
																	xtype: 'textfield',
																	fieldLabel: 'No. KTP',
																	anchor: '-5',
																	name: 'ktp_no_2',
																	flex: 1
																}
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															flex      : 6,
															items     : [
																{
																	xtype      : 'xaddressfieldEST',
																	fieldLabel : 'Alamat',
																	anchor     : '-5',
																	name       : 'alamat_pemilik_2',
																	flex       : 1
																}
															]
														}
													]
												}
											]
										}
									]
                                }
                            ]
                        }
                    ]
                }			
			]
		});
        me.callParent(arguments);
    }
});