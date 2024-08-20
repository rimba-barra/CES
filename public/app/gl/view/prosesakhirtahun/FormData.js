Ext.define('Gl.view.prosesakhirtahun.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.prosesakhirtahunformdata',   
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
                    layout: 'hbox',
                    bodyStyle: 'background-color:#dfe8f5;',
                    border: false,                  
                    items: [
                        {
                            xtype: 'hiddenfield',
                            name: 'hideparam',
                            value: 'default'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        
                        {   
                            xtype: 'textfield',
                            fieldLabel:'Periode',
                            emptyText: 'Tahun',
                            name: 'tahun',
                            allowBlank: false,
                            enableKeyEvents: true
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
                    padding: '0 0 0 150px',
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
