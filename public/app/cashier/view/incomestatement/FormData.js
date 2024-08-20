Ext.define('Cashier.view.incomestatement.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.incomestatementformdata',
    layout: 'vbox',
    bodyStyle: 'background-color:#dfe8f5;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tbspacer',
                    height: 10
                },
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            padding: '0 0 0 20px',
                            layout: 'vbox',
                            items: [
                                {
                                    boxLabel: 'This Month',
                                    xtype: 'radiofield',
                                    name: 'reporttypeincome',
                                    inputValue: '1',
                                    id: 'radioincome1',
                                    checked: true,
                                },
                                {
                                    boxLabel: 'This Month vs Last Month vs Budget',
                                    xtype: 'radiofield',
                                    name: 'reporttypeincome',
                                    inputValue: '2',
                                    id: 'radioincome2'
                                },
                               
                            ]
                        }
                    ]
                },
				{
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'PT',
                            padding: '0 0 0 20px',
                            layout: 'vbox',
                            items: [
									{
										xtype: 'ptcombobox',
										fieldLabel:'',
										emptyText: 'Select PT',
										name: 'pt_id',
										allowBlank: false,
										enableKeyEvents: true
									}
                               
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'vbox',                   
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,
                    padding: '0 0 0 20px',
                    items: [
                          {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Level',
                            layout: 'hbox',
                            items: [
                                     {
                                        xtype: 'levelcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Select Level',
                                        name: 'levelincome',
                                        allowBlank: false,
                                    }
                            ]
                        },  
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Periode',
                            layout: 'hbox',
                            items: [
                                     {
                                        xtype: 'monthcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Month',
                                        name: 'monthdataincome',
                                        allowBlank: false,
                                    },
                                    {
                                        xtype: 'splitter',
                                        width: '10'
                                    },
                                    {
                                        xtype: 'yearcombobox',
                                        fieldLabel:'',
                                        emptyText: 'Year',
                                        name: 'yeardataincome',
                                        allowBlank: false,
                                    }
                            ]
                        },  
                    ]
                },  
                {
                    xtype: 'tbspacer',
                    height: 20
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 200px',
                    items: [
                        {
                            xtype: 'button',
                            action: 'submit',
                            itemId: 'btnSubmit',
                            iconCls: 'icon-submit',
                            text: 'Submit',
                            padding: 5,
                        },
                        {
                            xtype: 'button',
                            action: 'cancel',
                            itemId: 'btnCancel',
                            iconCls: 'icon-cancel',
                            padding: 5,
                            text: 'Cancel',
                            handler: function () {
                                this.up('window').close();
                            }
                        }
                    ]
                }
            ],
        });
        me.callParent(arguments);
    },
});
