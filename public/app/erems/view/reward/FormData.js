Ext.define('Erems.view.purchaseletterrevision.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.purchaseletterrevisionformdata',
    requires:[
		'Erems.view.purchaseletterrevision.RevisionHistoryGrid',
		'Erems.view.purchaseletterrevision.ChangePriceGrid',
		'Erems.view.purchaseletterrevision.ChangeNameGrid',
		'Erems.view.purchaseletterrevision.ChangeKavlingGrid'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 610,
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
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_pl_id',
                    name: 'purchaseletter_id'
                },
				/* PURCHASE LETTER INFORMATION */
               	{xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER INFORMATION', collapsible: true,
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
                                                    fieldLabel: 'Purchase Letter No',
                                                    anchor: '-5',
                                                    name: 'purchaseletter_no',
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
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'cluster',
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
                                                    xtype: 'textfield',
                                                    fieldLabel: '',
                                                    anchor: '-5',
                                                    name: 'block',
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
                                                    fieldLabel: 'Kavling / Unit No. ',
                                                    anchor: '-5',
                                                    name: 'unit_number',
                                                    flex: 5,
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
													fieldLabel: 'Customer Name',
													anchor: '-5',
													name: 'customer_name',
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
													fieldLabel: 'Salesman',
													anchor: '-5',
													name: 'salesman_name',
													flex: 1,
													readOnly: true,
													fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
												}]
										},
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
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Tanggal SP (Purchase Date)',
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
                                            layout: 'hbox',
                                            bodyStyle: 'border:0px',
                                            width: '100%',
                                            items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Product Category',
                                                    anchor: '-5',
                                                    name: 'productcategory',
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
                                                    fieldLabel: 'Price Type',
                                                    anchor: '-5',
                                                    name: 'pricetype',
                                                    flex: 1,
                                                    readOnly: true,
                                                    fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
                                                }]
                                        },
                                    ]
                                },
								
                            ]
                        }

                    ]
                },
				/* END PURCHASE LETTER INFORMATION */
				/* REVISION HISTORY */
               	{xtype: 'panel', bodyPadding: 10, title: 'REVISION HISTORY', collapsible: true,
                    items: [
                        {
                            xtype: 'tabpanel',
							items: [
								{
									title: 'Revision History',
									items: [{
										xtype: 'purchaseletterrevisionhistorygrid',
										width: '100%',
										itemId: 'RevisionHistoryGrid'
									}]
								},
								{
									title: 'Change Price',
									items: [{
										xtype: 'purchaseletterrevisionchangepricegrid',
										width: '100%',
										itemId: 'ChangePriceGrid'
									}]
								},
								{
									title: 'Change Name',
									items: [{
										xtype: 'purchaseletterrevisionchangenamegrid',
										width: '100%',
										itemId: 'ChangeNameGrid'
									}]
								},
								{
									title: 'Change Kavling',
									items: [{
										xtype: 'purchaseletterrevisionchangekavlinggrid',
										width: '100%',
										itemId: 'ChangeKavlingGrid'
									}]
								},
							]
                        }

                    ]
                },
				/* REVISION HISTORY */
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
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Cancel',
                handler: function() {
                    this.up('window').close();
                }
            }
            ]
        }
        ];
        return x;
    },
});