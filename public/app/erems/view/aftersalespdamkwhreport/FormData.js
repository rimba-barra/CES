Ext.define('Erems.view.aftersalespdamkwhreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.aftersalespdamkwhreportformdata',
    requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Typecombobox',
		'Erems.library.template.component.Unitstatuscombobox',
		'Erems.library.template.component.Lunasstatuscombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 550,
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
                            xtype: 'typecombobox',
                            name: 'type_id',
                            fieldLabel:'Type',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_type_id',
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
                            xtype: 'unitstatuscombobox',
                            name: 'unitstatus_id',
                            fieldLabel:'Status Booking',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_unitstatus_id',
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
                            xtype: 'lunasstatuscombobox',
                            name: 'lunasstatus_id',
                            fieldLabel:'Status Lunas',
                            reportParams: true
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'cbf_statuslunas',
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
					width: '100%',
					items: [
                        {
                            xtype      : 'xnumericfieldEST',
                            fieldLabel : 'Progress',
                            name       : 'cp_start',
                            labelWidth : '42%',
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'},
						{xtype: 'splitter', width: 10}, 
						{
                            xtype      : 'xnumericfieldEST',
                            fieldLabel : 'to',
                            name       : 'cp_end',
                            labelWidth : '20%',
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'}
					]
				},
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '5px 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'radiogroup',
							//columns: 1,
							width: 300,
							fieldLabel: 'Laporan Type',
							name: 'radiogroup_laporantype',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'PDAM',
									name: 'radio_laporantype',
									inputValue: 'pdam',
									itemId: 'pdam',
									checked: true
								},
								{
									xtype: 'radiofield',
									boxLabel: 'KWH Listrik',
									name: 'radio_laporantype',
									inputValue: 'kwh', 
									itemId: 'kwh'
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

