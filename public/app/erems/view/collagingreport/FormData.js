Ext.define('Erems.view.collagingreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.collagingreportformdata',
    requires: [
        'Erems.library.template.component.Buildingclasscombobox',
        'Erems.library.template.component.Sourcemoneycombobox',
		'Erems.library.template.component.Projectptcombobox',
                'Erems.library.template.component.Clustercombobox',
    ],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    width: 600,
    //height: 300,
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
                            xtype: 'radiogroup',
                            //columns: 1,
                            width: 300,
                            fieldLabel: 'Report',
                            name: 'radiogroup_laporantype',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Detail',
                                    name: 'radio_laporantype',
                                    inputValue: 'detail',
                                    itemId: 'detail',
                                    checked: true
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Rekap',
                                    name: 'radio_laporantype',
                                    inputValue: 'rekap',
                                    itemId: 'rekap'
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
                            xtype: 'buildingclasscombobox',
                            name: 'buildingclass',
                            fieldLabel: 'Group Type',
                            reportParams: true
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
                            xtype: 'clustercombobox',
                            name: 'cluster_id',
							fieldLabel:'Cluster / Kawasan',
                            reportParams:true
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
                // {
                    // xtype: 'container',
                    // layout: 'hbox',
                    // margin: '0 0 5px 0',
                    // defaults: {
                        // margin: '0 20px 0 0'
                    // },
                    // items: [
                        // {
                            // xtype: 'datefield',
                            // itemId: 'jatuhtempo_date',
                            // name: 'jatuhtempo_date',
                            // fieldLabel: 'Tanggal Jatuh Tempo',
                            // //labelSeparator:'',
                            // editable: false,
                            // format: 'd-m-Y',
                            // altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                            // submitFormat: 'Y-m-d H:i:s.u',
                            // //disabled: true,
                            // readOnly: true,
                            // value: new Date()
                        // }
                    // ]
                // },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'combobox',
							fieldLabel: 'Periode jatuh Tempo',
							labelWidth: 120,
							itemId:'fd_proses_date',
							name: 'proses_date',
							//allowBlank: false,
							displayField: 'proses_date',
							valueField: 'proses_date',
							editable: false
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
                            xtype: 'sourcemoneycombobox',
                            name: 'sourcemoney_id',
                            fieldLabel: 'Jenis Laporan',
                            valueField: 'sourcemoney_id',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_sourcemoney_id',
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
                            //columns: 1,
                            width: 400,
                            fieldLabel: 'Report Type',
                            name: 'radiogroup_grossnetto',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Gross (Default)',
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
                                    
                                },
                                
                                
                            ]
                        }
                    ]
                },
				{
					xtype: 'fieldset',
					bodyPadding: 10, 
					width: '100%',
					title: 'Additional Filter (Surabaya)',
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
									width: '80%'
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
                            width: 300,
                            fieldLabel: 'Data Unit',
                            name: 'radiogroup_dataunit',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'All Data',
                                    name: 'radio_dataunit',
                                    inputValue: 1,
                                    itemId: 'alldata',
                                    checked: true
                                },
                                {
                                    xtype: 'radiofield',
                                    boxLabel: 'Aging Only',
                                    name: 'radio_dataunit',
                                    inputValue: 2,
                                    itemId: 'agingonly'
                                },
                            ]
                        }
                    ]
                }
		/*
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '',
                    itemId: 'fd_fileexcel',
                    name: 'fileexcel',
                    boxLabel: 'Export Data to Excel ?',
                    padding: '0 0 0 0',
                    margin: '0 0 10 0',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    checked: false
                },
		*/
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

