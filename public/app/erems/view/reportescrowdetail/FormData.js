Ext.define('Erems.view.reportescrowdetail.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.reportescrowdetailformdata',
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	width: 600,
	height: 300,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			dockedItems: me.generateDockedItems(),
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'projectptcombobox',
							name: 'pt_id',
							fieldLabel: 'Unit PT Name',
							valueField: 'pt_id',
							reportParams: true,
							width: 475
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_pt_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'clustercombobox',
							name: 'cluster_id',
							fieldLabel: 'Cluster',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_cluster_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
                        {
                            xtype: 'bankcombobox',
                            name: 'bank_id',
                            fieldLabel:'Nama Bank',
                            reportParams: true,
                            forceSelection:true,
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_bank_id',
                            checked: true,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
                        {
                            xtype: 'label',
                            text: 'ALL'
                        },
					]
				},
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            //columns: 1,
                            width: 400,
                            fieldLabel: 'Status Pencairan',
                            name: 'radiogroup_statuspencairan',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'All',
                                    name: 'radio_statuspencairan',
                                    inputValue: '0',
                                    itemId: 'all',
                                    checked: true
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Sudah Cair',
                                    name: 'radio_statuspencairan',
                                    inputValue: '1',
                                    itemId: 'sudah_cair'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Belum Cair',
                                    name: 'radio_statuspencairan',
                                    inputValue: '2',
                                    itemId: 'belum_cair'
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            //columns: 1,
                            width: 400,
                            fieldLabel: 'Status Lunas ',
                            name: 'radiogroup_statuslunas',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'All',
                                    name: 'radio_statuslunas',
                                    inputValue: '0',
                                    itemId: 'all',
                                    checked: true
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Sudah Lunas',
                                    name: 'radio_statuslunas',
                                    inputValue: '1',
                                    itemId: 'sudah_lunas'
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Belum Lunas',
                                    name: 'radio_statuslunas',
                                    inputValue: '2',
                                    itemId: 'belum_lunas'
                                },
                            ]
                        }
                    ]
                },
                // added by rico 10082023
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'datefield',
							fieldLabel: 'Purchase Date',
							name: 'purchase_start_date',
							id: 'purchase_start_date',
							submitFormat: 'Y-m-d',
							flex: 1,
							listeners:{
								change: function (el, val, prev) {
									var purchase_start_date   = Ext.getCmp('purchase_start_date');
									var purchase_end_date = Ext.getCmp('purchase_end_date');

									if(purchase_start_date.getValue() != null && purchase_end_date.getValue() != null){
										if(purchase_start_date.getValue() > purchase_end_date.getValue()){
											purchase_end_date.setValue("");

							                Ext.Msg.show({
							                    title: 'Failure',
							                    msg: 'Error: Purchase End Date Harus Lebih Besar.',
							                    icon: Ext.Msg.ERROR,
							                    buttons: Ext.Msg.OK
							                });
										}
									}
								}
							}
						},
						{
							xtype: 'label',
							text: 'to',
							width: 20

						},
						{
							xtype: 'datefield',
							name: 'purchase_end_date',
							id: 'purchase_end_date',
							submitFormat: 'Y-m-d',
							fieldLabel: '',
							flex: 1,
							listeners:{
								change: function (el, val, prev) {
									var purchase_start_date   = Ext.getCmp('purchase_start_date');
									var purchase_end_date = Ext.getCmp('purchase_end_date');

									if(purchase_start_date.getValue() != null && purchase_end_date.getValue() != null){
										if(purchase_start_date.getValue() > purchase_end_date.getValue()){
											purchase_end_date.setValue("");
											
							                Ext.Msg.show({
							                    title: 'Failure',
							                    msg: 'Error: Purchase End Date Harus Lebih Besar.',
							                    icon: Ext.Msg.ERROR,
							                    buttons: Ext.Msg.OK
							                });
										}
									}
								}
							}
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'datefield',
							fieldLabel: 'Cair Date',
							name: 'cair_start_date',
							id: 'cair_start_date',
							submitFormat: 'Y-m-d',
							flex: 1,
							listeners:{
								change: function (el, val, prev) {
									var cair_start_date   = Ext.getCmp('cair_start_date');
									var cair_end_date = Ext.getCmp('cair_end_date');

									if(cair_start_date.getValue() != null && cair_end_date.getValue() != null){
										if(cair_start_date.getValue() > cair_end_date.getValue()){
											cair_end_date.setValue("");
											
							                Ext.Msg.show({
							                    title: 'Failure',
							                    msg: 'Error: Cair End Date Harus Lebih Besar.',
							                    icon: Ext.Msg.ERROR,
							                    buttons: Ext.Msg.OK
							                });
										}
									}
								}
							}
						},
						{
							xtype: 'label',
							text: 'to',
							width: 20

						},
						{
							xtype: 'datefield',
							name: 'cair_end_date',
							id: 'cair_end_date',
							submitFormat: 'Y-m-d',
							fieldLabel: '',
							flex: 1,
							listeners:{
								change: function (el, val, prev) {
									var cair_start_date   = Ext.getCmp('cair_start_date');
									var cair_end_date = Ext.getCmp('cair_end_date');

									if(cair_start_date.getValue() != null && cair_end_date.getValue() != null){
										if(cair_start_date.getValue() > cair_end_date.getValue()){
											cair_end_date.setValue("");
											
							                Ext.Msg.show({
							                    title: 'Failure',
							                    msg: 'Error: Cair End Date Harus Lebih Besar.',
							                    icon: Ext.Msg.ERROR,
							                    buttons: Ext.Msg.OK
							                });
										}
									}
								}
							}
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
						action: 'process',
						itemId: 'btnSearch',
						padding: 5,
						width: 75,
						iconCls: 'icon-search',
						text: 'Process'
					},
					{
						xtype: 'button',
						action: 'reset',
						itemId: 'btnReset',
						padding: 5,
						width: 75,
						iconCls: 'icon-reset',
						text: 'Reset'
					}
				]
			}
		];
		return dockedItems;
	}
});

