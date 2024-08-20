Ext.define('Erems.view.cashierreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.cashierreportformdata',
    requires: [
        'Erems.library.template.component.Projectptcombobox',
		'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Paymentmethodcombobox',
		'Erems.library.template.component.Paymenttypecombobox',
		'Erems.library.template.component.Paymentflagcombobox'

        //added by anas 10062021
        ,'Erems.library.template.component.Clustercombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 600,
	//height: 300,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
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
                                xtype: 'radiogroup',
                                //columns: 1,
                                width: 400,
                                fieldLabel: 'Report Type',
                                name: 'radiogroup_grossnetto',
                                items: [
                                    {
                                        xtype: 'radiofield',
                                        boxLabel: 'Gross  (Default)',
                                        name: 'radio_grossnetto',
                                        inputValue: 'gross',
                                        itemId: 'gross',
                                        checked: true

                                    },
                                    {
                                        xtype: 'radiofield',
                                        boxLabel: 'Netto',
                                        name: 'radio_grossnetto',
                                        inputValue: 'netto',
                                        itemId: 'netto',
                                        
                                    }

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
							xtype: 'datefield',
							itemId: 'payment_startdate',
							name: 'payment_startdate',
							fieldLabel: 'Payment Date',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'payment_enddate',
							name: 'payment_enddate',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
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
							itemId: 'cair_startdate',
							name: 'cair_startdate',
							fieldLabel: 'Cair Date',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'cair_enddate',
							name: 'cair_enddate',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_cair_date',
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
							xtype: 'datefield',
							itemId: 'sales_period_startdate',
							name: 'sales_period_startdate',
							fieldLabel: 'Sales Period',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text:'to'
						},
						{
							xtype: 'datefield',
							itemId: 'sales_period_enddate',
							name: 'sales_period_enddate',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_sales_period_date',
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
                ////// added by rico 07092021
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

                //added by anas 10092021
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
                            fieldLabel:'Cluster / Tower',
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
                //end added by anas

				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'buildingclasscombobox',
                            name: 'buildingclass',
                            fieldLabel:'Group Type',
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
                            name: 'cbf_buildingclass',
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
                            xtype: 'paymentflagcombobox',
                            name: 'paymentflag_id',
							fieldLabel:'Transaction Type',
                            reportParams:true,
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
                            name: 'cbf_paymentflag_id',
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
                            xtype: 'paymentmethodcombobox',
                            name: 'paymentmethod_id',
							fieldLabel:'Payment Method',
                            reportParams:true,
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
                            name: 'cbf_paymentmethod_id',
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
                            xtype: 'paymenttypecombobox',
                            name: 'paymenttype_id',
							fieldLabel:'Jenis Pembayaran',
                            reportParams:true,
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
                            name: 'cbf_paymenttype_id',
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
							xtype: 'radiogroup',
							fieldLabel: 'Status Cair',
							name: 'radiogroup_status_cair',
							width: '100%',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Sudah Dicairkan',
									name: 'radio_status_cair',
									inputValue: 'sudah_cair',
									itemId: 'sudah_cair'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Belum Dicairkan',
									name: 'radio_status_cair',
									inputValue: 'belum_cair', 
									itemId: 'belum_cair'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'ALL',
									name: 'radio_status_cair',
									inputValue: 'ALL', 
									itemId: 'ALL',
									checked: true
								}
							]
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
							xtype: 'fieldset',
							height: 50,
							width: '100%',
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									fieldLabel: 'Sort by',
									name: 'radiogroup_sort_by',
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Cluster / Block',
											name: 'radio_sort_by',
											inputValue: 'cluster',
											itemId: 'cluster',
											checked: true
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Kwitansi No',
											name: 'radio_sort_by',
											inputValue: 'kwitansi_no', 
											itemId: 'kwitansi_no'
										}
									]
								}
							]
						}
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '10px 20px 0 0'
                    },
                    items: [
						{
							xtype: 'fieldset',
							height: 50,
							width: '100%',
							//title: 'My Fields',
							layout : 'column',
							items: [
								{
									xtype: 'textfield',
									itemId: 'kwitansi_no_start',
									name: 'kwitansi_no_start',
									fieldLabel: 'Kwitansi No.',
									labelSeparator:''
								},
								{
									xtype: 'label',
									margin: '0 10px 0 10px',
									styleHtmlContent: false,
									//width: 5,
									text:'s/d'
								},
								{
									xtype: 'textfield',
									itemId: 'kwitansi_no_end',
									name: 'kwitansi_no_end',
									labelSeparator:''
								}
							]
						}
                    ]
                }
            ]

        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
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

