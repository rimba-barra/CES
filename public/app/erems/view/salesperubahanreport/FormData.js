Ext.define('Erems.view.salesperubahanreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.salesperubahanreportformdata',
    requires: ['Erems.library.template.view.combobox.Cluster2', 'Erems.library.template.view.combobox.Type',
        'Erems.library.template.view.combobox.Productcategory',
        'Erems.library.template.component.Buildingclasscombobox',
        'Erems.library.template.component.Unitstatuscombobox'],
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
							xtype: 'datefield',
							itemId: 'purchase_startdate',
							name: 'purchase_startdate',
							fieldLabel: 'Approve Date',
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
							itemId: 'purchase_enddate',
							name: 'purchase_enddate',
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
									fieldLabel: 'Sort by',
									name: 'radiogroup_sort_by',
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Cluster',
											name: 'radio_sort_by',
											inputValue: 'cluster',
											itemId: 'cluster',
											checked: true
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Change Date',
											name: 'radio_sort_by',
											inputValue: 'change_date', 
											itemId: 'change_date'
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
							items: [
								{
									xtype: 'radiogroup',
									fieldLabel: 'Perubahan',
									name: 'radiogroup_perubahan',
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Nama',
											name: 'radio_perubahan',
											inputValue: 'perubahan_nama',
											itemId: 'perubahan_nama',
											checked: true
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Harga',
											name: 'radio_perubahan',
											inputValue: 'perubahan_harga', 
											itemId: 'perubahan_harga'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Block',
											name: 'radio_perubahan',
											inputValue: 'perubahan_block', 
											itemId: 'perubahan_block'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'ALL',
											name: 'radio_perubahan',
											inputValue: 'perubahan_all', 
											itemId: 'perubahan_all'
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

