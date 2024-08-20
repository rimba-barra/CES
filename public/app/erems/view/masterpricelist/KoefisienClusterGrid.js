Ext.define('Erems.view.masterpricelist.KoefisienClusterGrid', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.masterpricelistkoefisienclustergrid',
	requires : [
		'Erems.view.masterpricelist.KoefisienGridDetail',
		'Erems.library.template.component.TypeByUnitcombobox',
		'Erems.library.template.component.ClusterByUnitcombobox'
	],
	frame         : true,
	autoScroll    : true,
	anchorSize    : 100,
	height        : '100%',//560,
	bodyBorder    : true,
	bodyPadding   : 10,
	bodyStyle     : 'padding:5px 5px 0',
	initComponent : function () {
		var me = this;
		Ext.applyIf(me, {
			items: [
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '0 0 5px 0',
					defaults : { margin : '0 20px 0 0' },
					items    : [
						{
							xtype      : 'clusterbyunitcombobox',
							itemId     : 'fs_cluster_id',
							name       : 'cluster_id',
							allowBlank : false,
							listeners  : {
								beforequery : function(record){
									record.query = new RegExp(record.query, 'i');
									record.forceAll = true;
								}
							}
						}
					]
				},
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '0 0 5px 0',
					defaults : { margin : '0 20px 0 0' },
					items    : [
						{
							xtype      : 'typebyunitcombobox',
							itemId     : 'fs_type_id',
							name       : 'type_id',
							allowBlank : false,
							listeners  : {
								beforequery : function(record){
									record.query = new RegExp(record.query, 'i');
									record.forceAll = true;
								}
							}
						}
					]
				},
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '10px 0 0 0',
					defaults : {
						xtype  : 'container',
						layout : 'vbox',
						flex   : 1,
						width  : '100%'
					},
					items: [
						{
							xtype    : 'fieldset',
							title    : 'Harga Tanah / m2 - @luasan saleable',
							layout   : 'hbox',
							width    : 372,
							margin   : '0 0 0 0',
							defaults : {
								xtype  : 'container',
								layout : 'vbox',
								flex   : 1,
								width  : '100%'
							},
							items : [
								{
									margin   : '0 0 0 0',
									defaults : {
										xtype  : 'container',
										layout : 'hbox',
										width  : '100%',
										margin : '0 0 10px 0'
									},
									items : [
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'xmoneyfieldEST',
												width : '100%'
											},
											items: [
												{
													fieldLabel : 'Mentah',
													name       : 'harga_tanahmentahpermeter',
													value      : 0.00,
													allowBlank : false
												}
											]
										},
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'xmoneyfieldEST',
												width : '100%'
											},
											items: [
												{
													fieldLabel : 'Dev Cost',
													name       : 'harga_tanahdevcostpermeter',
													value      : 0.00,
													allowBlank : false
												}
											]
										},
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'xmoneyfieldEST',
												width : '100%'
											},
											items : [
												{
													fieldLabel : 'HPP',
													name       : 'harga_tanahhpp',
													value      : 0.00,
													readOnly   : true,
													fieldCls   : 'readonly',
													allowBlank : false
												}
											]
										},
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'xmoneyfieldEST',
												width : '100%'
											},
											items : [
												{
													fieldLabel : 'Harga Jual',
													name       : 'harga_tanahpermeter',
													value      : 0.00,
													allowBlank : false
												}
											]
										},
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'xmoneyfieldEST',
												width : '100%'
											},
											items: [
												{
													fieldLabel : 'Gross Margin %',
													name       : 'margin_persen_tanah',
													value      : 0.00,
													readOnly   : true,
													fieldCls   : 'readonly',
												}
											]
										},
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'textfield',
												width : '100%'
											},
											items : [
												{
													fieldLabel : 'Genco',
													itemId     : 'genco_grossup',
													name       : 'genco_grossup',
													labelWidth : 170,
													readOnly   : true,
													hidden     : true
												}
											]
										},
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'textfield',
												width : '100%'
											},
											items : [
												{
													fieldLabel : 'Genco',
													itemId     : 'genco_tanah',
													name       : 'genco_tanah',
													labelWidth : 170,
													readOnly   : true,
													hidden     : true
												}
											]
										},
									]
								}
							]
						},
						{
							xtype    : 'fieldset',
							title    : 'Harga Bangunan / m2 - @luasan saleable',
							layout   : 'hbox',
							margin   : '0 0 0 0',
							height   : 198,
							width    : 372,
							defaults : {
								xtype  : 'container',
								layout : 'vbox',
								flex   : 1,
								width  : '100%'
							},
							items: [
								{
									margin   : '0 0 0 0',
									defaults : {
										xtype  : 'container',
										layout : 'hbox',
										width  : '100%',
										margin : '0 0 10px 0'
									},
									items : [
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'xmoneyfieldEST',
												width : '100%'
											},
											items : [
												{
													fieldLabel : 'HPP',
													name       : 'harga_bangunanhpp',
													value      : 0.00,
													allowBlank : false
												}
											]
										},
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'xmoneyfieldEST',
												width : '100%'
											},
											items : [
												{
													fieldLabel : 'Harga Jual',
													name       : 'harga_bangunanpermeter',
													value      : 0.00,
													allowBlank : false
												}
											]
										},
										{
											layout   : 'vbox',
											defaults : {
												xtype : 'xmoneyfieldEST',
												width : '100%'
											},
											items : [
												{
													fieldLabel : 'Gross Margin %',
													name       : 'margin_persen_bangunan',
													value      : 0.00,
													readOnly   : true,
													fieldCls   : 'readonly',
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{
                    xtype    : 'container',
                    layout   : 'hbox',
                    margin   : '10px 0 0 0',
                    defaults : {
                        xtype  : 'container',
                        layout : 'vbox',
                        flex   : 1,
                        width  : '100%'
                    },
					items : [
                    	{
                            xtype    : 'fieldset',
                            title    : 'Total',
                            layout   : 'hbox',
                            margin   : '0 0 1px 0',
                            defaults : {
                                xtype  : 'container',
                                layout : 'vbox',
                                flex   : 1,
                                width  : '100%'
                            },
                            items : [
                                {
                                    margin   : '0 20px 0 0',
                                    defaults : {
                                        xtype  : 'container',
                                        layout : 'hbox',
                                        width  : '100%',
                                        margin : '0 0 0 0'
                                    },
                                    items: [
                                    	{
                                            layout   : 'vbox',
                                            defaults : {
                                                xtype : 'xmoneyfieldEST',
                                                width : '100%'
                                            },
                                            items: [
                                                {
                                                    fieldLabel : 'Spare %',
                                                    name       : 'spare',
                                                    labelWidth : 170,
                                                    value      : 0.00,
                                                }
                                            ]
                                        },
                                    ]
								}
							]
						}
                    ]
                },
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '10px 0 5px 0',
					defaults : { width : '100%' },
					items: [
						{
							xtype          : 'checkboxfield',
							itemId         : 'is_grossup',
							name           : 'is_grossup',
							inputValue     : 1,
							uncheckedValue : 0,
							boxLabel       : 'Gross Up',
							anchor         : '1',
							flex           : 1
						}
					]
				}, 
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '0 0 5px 0',
					defaults : { width : '100%' },
					items: [
						{
							xtype          : 'checkboxfield',
							itemId         : 'is_bphtb',
							name           : 'is_bphtb',
							inputValue     : 1,
							uncheckedValue : 0,
							boxLabel       : 'Include BPHTB',
							anchor         : '1',
							flex           : 1
						}, 
						{
							xtype: 'splitter', width: 5,
						}, 
						{
							xtype          : 'checkboxfield',
							itemId         : 'is_bbn',
							name           : 'is_bbn',
							inputValue     : 1,
							uncheckedValue : 0,
							boxLabel       : 'Include BBN',
							anchor         : '1',
							flex           : 1
						}, 
						{
							xtype: 'splitter', width: 5,
						}, 
						{
							xtype          : 'checkboxfield',
							itemId         : 'is_ajb',
							name           : 'is_ajb',
							inputValue     : 1,
							uncheckedValue : 0,
							boxLabel       : 'Include AJB',
							anchor         : '1',
							flex           : 1
						}
					]
				},
				{
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype  : 'masterpricelistkoefisiengriddetail',
							width  : '100%',
							itemId : 'MyMasterpricelistkoefisiengriddetail'
						}
					]
				}
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var x = [
			{
				xtype  : 'toolbar',
				dock   : 'bottom',
				ui     : 'footer',
				layout : {
					padding : 6,
					type    : 'hbox'
				},
				items: [
					{
						xtype    : 'button',
						action   : 'save',
						itemId   : 'btnSave',
						disabled : true,
						padding  : 5,
						width    : 75,
						iconCls  : 'icon-save',
						text     : 'Save'
					},
					{
						xtype   : 'button',
						action  : 'cancel',
						itemId  : 'btnCancel',
						padding : 5,
						width   : 75,
						iconCls : 'icon-cancel',
						text    : 'Cancel',
						handler : function () {
							this.up('window').close();
						}
					}
				]
			}
		];
		return x;
	}
});