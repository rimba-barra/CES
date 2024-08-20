Ext.define('Erems.view.uploadva.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.uploadvaformdata',
    requires: [
	
   	],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
	width: 600,
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
            }, {
                "bankID": "Mandiri",
                "name": "MANDIRI"
            }, {
                "bankID": "Permata",
                "name": "PERMATA"
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
                            xtype: 'label',
                            styleHtmlContent: false,
                            text:'Harap download template berikut dan isi kolom No VA sebelum melakukan Upload'
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
                            xtype: 'label',
                            styleHtmlContent: false,
                            autoEl: {
                                tag: 'a',
                                href: '#',
                                html: '[ Download BCA ]'
                             },
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(e) {
                                        var mea = _Apps.getController('Uploadva'); 
                                        mea.printExcel("BCA");
                                    });    
                                }
                            }
                        },

                        {
                            xtype: 'label',
                            styleHtmlContent: false,
                            autoEl: {
                                tag: 'a',
                                href: '#',
                                html: '[ Download BNI ]'
                             },
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(e) {
                                        var mea = _Apps.getController('Uploadva'); 
                                        mea.printExcel("BNI");
                                    });    
                                }
                            }
                        },

                        {
                            xtype: 'label',
                            styleHtmlContent: false,
                            autoEl: {
                                tag: 'a',
                                href: '#',
                                html: '[ Download Mandiri ]'
                             },
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(e) {
                                        var mea = _Apps.getController('Uploadva'); 
                                        mea.printExcel("Mandiri");
                                    });    
                                }
                            }
                        },

                        {
                            xtype: 'label',
                            styleHtmlContent: false,
                            autoEl: {
                                tag: 'a',
                                href: '#',
                                html: '[ Download Permata ]'
                             },
                            listeners: {
                                render: function(component) {
                                    component.getEl().on('click', function(e) {
                                        var mea = _Apps.getController('Uploadva'); 
                                        mea.printExcel("Permata");
                                    });    
                                }
                            }
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
                            xtype: 'combobox',
                            itemId: 'cb_bank_va',
                            fieldLabel: 'Bank VA',
                            name: 'cb_bank_va',
                            allowBlank: false,
                            queryMode:'local',
                            displayField: 'name',
                            valueField: 'bankID',
                            store: bankStore,
                            listeners:{
                                beforequery: function(record){
                                    record.query = new RegExp(record.query, 'i');
                                    record.forceAll = true;
                                }
                            }
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
                            itemId: 'excel_filename',
                            emptyText: 'Select File',
                            fieldLabel: 'Excel File',
                            name: 'excel_filename',
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

