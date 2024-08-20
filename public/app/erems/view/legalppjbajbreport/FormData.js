Ext.define('Erems.view.legalppjbajbreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.legalppjbajbreportformdata',
    requires: [
		'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Pricetypecombobox'
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 500,
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
                            xtype: 'pricetypecombobox',
                            name: 'pricetype_id',
							fieldLabel:'Jenis Bayar',
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
                            xtype      : 'xnumericfieldEST',
                            fieldLabel : 'Awal Ambil Data (Tahun)',
                            name       : 'year_start',
                        }
                    ]
                },
				{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5px 0',
                    defaults: {
                        //margin: '10px 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'fieldset',
							height: 70,
							width: '100%',
							border: false,
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									fieldLabel: '',
									name: 'radiogroup_reporttype',
									columns: 1,
									//labelWidth: 120,
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Sudah PPJB belum AJB',
											name: 'radio_reporttype',
											inputValue: 'ppjb_belum_ajb',
											itemId: 'ppjb_belum_ajb',
											checked: true
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Sudah AJB belum Balik Nama',
											name: 'radio_reporttype',
											inputValue: 'ajb_belum_baliknama', 
											itemId: 'ajb_belum_baliknama'
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

