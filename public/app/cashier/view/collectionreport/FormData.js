Ext.define('Cashier.view.collectionreport.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.collectionreportformdata',
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
                                xtype: 'combobox',
                                name: 'pt_pt_id',
                                fieldLabel: 'Company',
                                displayField: 'name',
                                valueField: 'pt_id',
                                width: '300',
                                forceSelection: true,
                                allowBlank: false
                            },
                            {
                                xtype: 'combobox',
                                name: 'department_department_id',
                                fieldLabel: 'Dept',
                                displayField: 'name',
                                valueField: 'department_id',
                                width: '300',
								hidden: true,
                                forceSelection: true,
                                allowBlank: true
                            },
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Year',
                                layout: 'hbox',
                                items: [
                                        {
                                            xtype: 'yearcombobox',
                                            fieldLabel:'',
                                            emptyText: 'Year',
                                            name: 'yeardata',
                                            allowBlank: false,
                                        }
                                ]
                            }, 
                            {
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Period',
                                layout: 'hbox',
                                items: [
                                         {
                                            xtype: 'monthcombobox',
                                            fieldLabel:'',
                                            emptyText: 'Month',
                                            name: 'monthdata',
                                            allowBlank: true,
                                        },
                                        {
                                            xtype: 'monthcombobox',
                                            fieldLabel:' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Until',
                                            emptyText: 'Month',
											hidden: true,
                                            name: 'monthdatauntil',
                                            allowBlank: true,
                                        }
                                ]
                            }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 10px',
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
