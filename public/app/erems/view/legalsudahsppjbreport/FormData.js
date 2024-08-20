Ext.define('Erems.view.legalsudahsppjbreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.legalsudahsppjbreportformdata',
    requires: [
		'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Productcategorycombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Pricetypecombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 700,
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
                            xtype: 'buildingclasscombobox',
                            name: 'buildingclass',
                            fieldLabel:'Group Admin',
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
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
                            xtype: 'blockcombobox',
                            name: 'block_id',
							fieldLabel:'Block',
                            reportParams:true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_block_id',
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
                            xtype: 'productcategorycombobox',
                            name: 'productcategory_id',
							fieldLabel:'Type Bangunan',
                            reportParams:true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_productcategory_id',
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
                            xtype: 'pricetypecombobox',
                            name: 'pricetype_id',
							fieldLabel:'Price Type',
                            reportParams:true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_pricetype_id',
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
							itemId: 'sppjb_startdate',
							name: 'sppjb_startdate',
							fieldLabel: 'SPPJB Date',
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
							itemId: 'sppjb_enddate',
							name: 'sppjb_enddate',
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
							xtype: 'radiogroup',
							fieldLabel: 'Status Tanda Tangan',
							labelWidth: 120,
							name: 'radiogroup_status_ttd',
							width: '100%',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Sudah Tanda Tangan',
									name: 'radio_status_ttd',
									inputValue: 'sudah_ttd',
									itemId: 'sudah_ttd'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Belum Tanda Tangan',
									name: 'radio_status_ttd',
									inputValue: 'belum_ttd', 
									itemId: 'belum_ttd'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'ALL',
									name: 'radio_status_ttd',
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
							xtype: 'datefield',
							itemId: 'sign_sppjb_startdate',
							name: 'sign_sppjb_startdate',
							fieldLabel: 'Sign SPPJB Date',
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
							itemId: 'sign_sppjb_enddate',
							name: 'sign_sppjb_enddate',
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_sign_sppjb_date',
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
							fieldLabel: 'Type Report',
							labelWidth: 100,
							name: 'radiogroup_type_report',
							width: '65%',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Standart',
									name: 'radio_type_report',
									inputValue: 'standart',
									itemId: 'standart'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Additional for Surabaya',
									name: 'radio_type_report',
									inputValue: 'additional_sby', 
									itemId: 'additional_sby'
								}
							]
						},
					]
				},
				/*{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        margin: '10px 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'fieldset',
							height: 60,
							width: '100%',
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									fieldLabel: 'Down Payment Status',
									name: 'radiogroup_statusdp',
									//labelWidth: 120,
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Lunas',
											name: 'radio_statusdp',
											inputValue: 'sudah_lunas',
											itemId: 'sudah_lunas'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Belum Lunas',
											name: 'radio_statusdp',
											inputValue: 'belum_lunas', 
											itemId: 'belum_lunas'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'ALL',
											name: 'radio_statusdp',
											inputValue: 'all', 
											itemId: 'all',
											checked: true
										}
									]
								}
							]
						}
                    ]
                }*/
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

