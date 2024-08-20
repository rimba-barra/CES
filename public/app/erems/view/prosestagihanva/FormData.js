Ext.define('Erems.view.prosestagihanva.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.prosestagihanvaformdata',
    requires: [
	
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 400,
	// height: 400,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        var bankStore = Ext.create('Ext.data.Store', {
            fields: ['bankID', 'name'],
            data: [{
                "bankID": "BCA",
                "name": "BCA"
            }, {
                "bankID": "BNI",
                "name": "BNI"
            }]
        });

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
                            xtype: 'combobox',
                            itemId: 'cb_bank_va',
                            fieldLabel: 'Bank VA',
                            name: 'cb_bank_va',
                            allowBlank: false,
                            queryMode:'local',
                            displayField: 'name',
                            valueField: 'bankID',
                            store: bankStore,
                            value: bankStore.first(),

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
                            xtype: 'filefield',
                            itemId: 'browse_filename',
                            emptyText: 'Select File',
                            fieldLabel: 'Txt File',
                            name: 'browse_filename',
                            buttonText: 'Browse',
                            allowBlank: false
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

