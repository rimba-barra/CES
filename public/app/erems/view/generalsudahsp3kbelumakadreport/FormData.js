Ext.define('Erems.view.generalsudahsp3kbelumakadreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.generalsudahsp3kbelumakadreportformdata',
    requires: [
        'Erems.library.template.component.Bankcombobox',
		'Erems.library.template.component.Kprstatusumcombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 800,
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
							xtype: 'datefield',
							itemId: 'periode_startdate',
							name: 'periode_startdate',
							fieldLabel: 'Purchase Letter Date',
							labelSeparator:'',
							labelWidth: '50%',
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
							itemId: 'periode_enddate',
							name: 'periode_enddate',
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
                            xtype: 'bankcombobox',
                            name: 'bank_id',
                            fieldLabel:'Bank KPR',
							labelWidth: '50%',
							//width:'50%',
                            reportParams: true
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
                            xtype: 'kprstatusumcombobox',
                            name: 'kprstatusum_id',
                            fieldLabel:'Status KPR',
							labelWidth: '50%',
							//width:'50%',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_kprstatusum_id',
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
							fieldLabel: 'Status',
							name: 'radiogroup_status_rekomendasi_batal',
							width: '100%',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Sedang Rekomendasi Batal',
									name: 'radio_status_rekomendasi_batal',
									inputValue: 'is_recommended',
									itemId: 'is_recommended'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Tidak Sedang Rekomendasi Batal',
									name: 'radio_status_rekomendasi_batal',
									inputValue: 'is_not_recommended', 
									itemId: 'is_not_recommended'
								},
								{
									xtype: 'radiofield',
									boxLabel: 'ALL',
									name: 'radio_status_rekomendasi_batal',
									inputValue: 'ALL', 
									itemId: 'ALL',
									checked: true
								}
							]
						},
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

