Ext.define('Erems.view.aftersalesstrumahreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.aftersalesstrumahreportformdata',
    requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Productcategorycombobox'
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
                    xtype  : 'container',
                    layout : 'hbox',
                    width  : '100%',
                    items  : [
                        {
                            xtype      : 'xnumericfieldEST',
                            fieldLabel : 'Construction Progress',
                            anchor     : '-5',
                            name       : 'cp_start',
                            flex       : 12,
                            labelWidth : '60%',
						},
						{xtype: 'label', text: '%', flex: 1, margin: '0 0 0 10px'},
						{xtype: 'splitter', width: 10}, 
						{
                            xtype      : 'xnumericfieldEST',
                            fieldLabel : 'to',
                            anchor     : '-5',
                            name       : 'cp_end',
                            flex       : 6,
                            labelWidth : 30,
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
                            xtype: 'productcategorycombobox',
                            name: 'productcategory_id',
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
                        margin: '10px 20px 0 0'
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
									//columns: 1,
									fieldLabel: 'Status Serah Terima',
									name: 'radiogroup_st',
									labelWidth: '30%',
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'SUDAH',
											name: 'radio_st',
											inputValue: 'sudah_st', 
											itemId: 'sudah_st'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'BELUM',
											name: 'radio_st',
											inputValue: 'belum_st', 
											itemId: 'belum_st'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'ALL',
											name: 'radio_st',
											inputValue: 'ALL',
											itemId: 'ALL',
											checked: true
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
                        margin: '0 20px 0 0'
                    },
                    items: [
                        {
							xtype: 'datefield',
							itemId: 'periode_startdate',
							name: 'periode_startdate',
							fieldLabel: 'Serah Terima Date',
							labelWidth: 120,
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							disabled: true
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
							//fieldLabel: 'to',
							//labelWidth: 20,
							labelSeparator:'',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							disabled: true,
							//margin: '5px 0 0 0'
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

