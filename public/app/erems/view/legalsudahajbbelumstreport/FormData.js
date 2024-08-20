Ext.define('Erems.view.legalsudahajbbelumstreport.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.legalsudahajbbelumstreportformdata',
    requires: [
		'Erems.library.template.component.Bankcombobox',
		'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Productcategorycombobox'
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
                            xtype: 'bankcombobox',
                            name: 'bank_id',
                            fieldLabel:'Nama Bank',
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

