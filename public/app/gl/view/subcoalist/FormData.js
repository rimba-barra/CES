Ext.define('Gl.view.subcoalist.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.subcoalistformdata',
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
                            fieldLabel: 'From',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'subaccountcodecomboboxrev',
                                    fieldLabel: '',
                                    emptyText: 'Select Data',
                                    name: 'from_subgl_id',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    emptyText: '',
                                    width: 300,
                                    name: 'from_subgl_name',
                                    allowBlank: true,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'To',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'subaccountcodecomboboxrev',
                                    fieldLabel: '',
                                    emptyText: 'Select Data',
                                    name: 'until_subgl_id',
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: '',
                                    emptyText: '',
                                    name: 'until_subgl_name',
                                    width: 300,
                                    allowBlank: true,
                                    readOnly: true
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
                    padding: '0 0 0 250px',
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
