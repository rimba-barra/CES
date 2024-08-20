Ext.define('Gl.view.changeaccount.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.changeaccountformdata',   
    height: 180,
    width: 1024,
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
                    xtype: 'panel',
                    layout: 'vbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'hideparam',
                            value: 'default'
                        },
                       
                        {
                            xtype: 'coacombobox',
                            fieldLabel: 'Old Account',
                            emptyText: 'Old COA',
                            name: 'coa_old_id',
                            allowBlank: false,
                        },
                       
                        {
                            xtype: 'coacombobox',
                            fieldLabel: 'New Account',
                            emptyText: 'New COA',
                            name: 'coa_new_id',
                            allowBlank: false,
                        },
                    ]
                },
                {
                    xtype: 'tbspacer',
                    height: 30
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    padding: '0 0 0 160px',
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
