Ext.define('Erems.view.collbelumberkasreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.collbelumberkasreportformdata',
    requires: [
        //'Erems.library.template.component.Buildingclasscombobox',
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
                /*{
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
							fieldLabel: 'Periode Date',
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
                },*/
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
							height: 75,
							width: '100%',
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									columns: 1,
									fieldLabel: 'Belum Berkas',
									name: 'radiogroup_belum_berkas',
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Ke Kantor',
											name: 'radio_belum_berkas',
											inputValue: 'Kantor',
											itemId: 'Kantor',
											checked: true
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Ke Bank',
											name: 'radio_belum_berkas',
											inputValue: 'Bank', 
											itemId: 'Bank'
										}
									]
								}
							]
						}
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

