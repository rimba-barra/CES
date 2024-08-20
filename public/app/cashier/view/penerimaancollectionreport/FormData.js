Ext.define('Cashier.view.penerimaancollectionreport.FormData', {
	extend       : 'Cashier.library.template.view.FormData',
	alias        : 'widget.penerimaancollectionreportformdata',
	bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			dockedItems: me.generateDockedItems(),
			items      : [
				{
					xtype   : 'container',
					layout  : 'hbox',
					margin  : '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
                    },
					itemId: 'fltr_type',
					items : [	
						{
							xtype     : 'radiogroup',
							width     : 550,
							fieldLabel: 'Type Report',
							name      : 'radiogroup_filtertype',
							items     : [
								{
									xtype     : 'radiofield',
									boxLabel  : 'Penerimaan Collection (SH3A)',
									name      : 'radio_filtertype',
									inputValue: '1',
									itemId    : 'type_1',
									checked   : true
                                },
                                {
									xtype     : 'radiofield',
									boxLabel  : 'Collection (SH2)',
									name      : 'radio_filtertype',
									inputValue: '2',
									itemId    : 'type_2',
									handler   : function(field, value){
                                    	if(value){
                                			me.down('#fltr_date').setVisible(false);
                                			me.down('#fltr_cluster').setVisible(false);
                                			me.down('#fltr_salestype').setVisible(false);
                                    		me.down('#cut_off').setValue(true);
                                    		me.down('#periode').setValue(false);
                                			me.down('[name=cair_date]').setVisible(false);
                                    		me.down('[name=period_cut_off_div]').setVisible(true);
                                    		me.down('[name=periode_startdate]').setValue('');
                                    		me.down('[name=periode_enddate]').setValue('');
                                    		me.down('[name=cbf_cluster_id]').setValue(true);
                                    		me.down("[name=radiogroup_salestype] #all").setValue(true);
                                    	}
                                    	else{
                                			me.down('#fltr_date').setVisible(true);
                                			me.down('#fltr_cluster').setVisible(true);
                                			me.down('#fltr_salestype').setVisible(true);
                                    		me.down("[name=radiogroup_salestype] #penjualan").setValue(true);
                                    	}
                                    }
                                },
							]
						}
					]
				},
                {
					xtype   : 'container',
					layout  : 'hbox',
					margin  : '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
                    },
					itemId: 'fltr_date',
					items : [
                        {
							xtype     : 'radiogroup',
							width     : 400,
							fieldLabel: 'Filter Date',
							name      : 'radiogroup_filterdate',
							items     : [
                                {
									xtype     : 'radiofield',
									boxLabel  : 'Cut Off',
									name      : 'radio_filterdate',
									inputValue: '1',
									itemId    : 'cut_off',
									checked   : true
                                },
                                {
									xtype     : 'radiofield',
									boxLabel  : 'Periode',
									name      : 'radio_filterdate',
									inputValue: '2',
									itemId    : 'periode',
									handler   : function(field, value){
                                    	if(value){
                                    		me.down('[name=cair_date]').setVisible(true);
                                    		me.down('[name=period_cut_off_div]').setVisible(false);
                                    	}
                                    	else{
                                			me.down('[name=cair_date]').setVisible(false);
                                    		me.down('[name=period_cut_off_div]').setVisible(true);
                                    	}
                                    }
                                },
                            ]
                        }
                    ],
                },
				{
					xtype   : 'container',
					layout  : 'hbox',
					margin  : '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
                    },
					name  : 'cair_date',
					itemId: 'cair_date',
					hidden: true,
					items : [
                        {
							xtype         : 'datefield',
							itemId        : 'periode_startdate',
							name          : 'periode_startdate',
							fieldLabel    : 'Cair Date',
							labelSeparator: '',
							editable      : false,
							format        : 'd-m-Y',
							altFormats    : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat  : 'Y-m-d H:i:s.u'
						},
						{
							xtype           : 'label',
							styleHtmlContent: false,
							width           : 5,
							text            : 's/d'
						},
						{
							xtype         : 'datefield',
							itemId        : 'periode_enddate',
							name          : 'periode_enddate',
							labelSeparator: '',
							editable      : false,
							format        : 'd-m-Y',
							altFormats    : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat  : 'Y-m-d H:i:s.u'
						}
                    ]
                },
				{
					xtype   : 'container',
					layout  : 'hbox',
					margin  : '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					name : 'period_cut_off_div',
					items: [
						{
							xtype         : 'datefield',
							itemId        : 'period_cut_off',
							name          : 'period_cut_off',
							fieldLabel    : 'Period Cut Off',
							labelSeparator: '',
							format        : 'm Y',
							altFormats    : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat  : 'Y-m-d H:i:s.u',
							value         : new Date()
						},
					]
				},
				{
					xtype   : 'container',
					layout  : 'hbox',
					margin  : '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					itemId: 'fltr_cluster',
					items : [
						{
							xtype       : 'clusterV2combobox',
							name        : 'cluster_id',
							fieldLabel  : 'Cluster / Kawasan',
							reportParams: true
						},
						{
							xtype         : 'checkboxfield',
							fieldLabel    : '',
							name          : 'cbf_cluster_id',
							checked       : true,
							inputValue    : '1',
							uncheckedValue: '0',
							margin        : '0 5px 0 0',
							width         : 20
						},
						{
							xtype: 'label',
							text : 'ALL'
						}
					]
				},
                {
					xtype   : 'container',
					layout  : 'hbox',
					margin  : '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
                    },
					itemId: 'fltr_salestype',
					items : [
                        {
							xtype     : 'radiogroup',
							width     : 400,
							fieldLabel: 'Sales Type',
							name      : 'radiogroup_salestype',
							items     : [
                                {
									xtype     : 'radiofield',
									boxLabel  : 'Penjualan',
									name      : 'radio_salestype',
									inputValue: '1',
									itemId    : 'penjualan',
									checked   : true
                                },
                                {
									xtype     : 'radiofield',
									boxLabel  : 'Pembatalan',
									name      : 'radio_salestype',
									inputValue: '2',
									itemId    : 'pembatalan'
                                },
                                {
									xtype     : 'radiofield',
									boxLabel  : 'All',
									name      : 'radio_salestype',
									inputValue: '0',
									itemId    : 'all'
                                },
                            ]
                        }
                    ]
                },
			]

		});

		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var dockedItems = [
			{
				xtype : 'toolbar',
				dock  : 'bottom',
				ui    : 'footer',
				layout: {
					padding: 6,
					type   : 'hbox'
				},
				items : [
					{
						xtype  : 'button',
						action : 'process',
						itemId : 'btnSearch',
						padding: 5,
						width  : 75,
						iconCls: 'icon-search',
						text   : 'Process'
					},
					{
						xtype  : 'button',
						action : 'reset',
						itemId : 'btnReset',
						padding: 5,
						width  : 75,
						iconCls: 'icon-reset',
						text   : 'Reset'
					}
				]
			}
		];
		return dockedItems;
	}
});

