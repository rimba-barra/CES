Ext.define('Gl.view.prosesakhirbulan.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.prosesakhirbulanformdata',   
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
                            xtype: 'monthcombobox',
                            fieldLabel: 'Periode',
                            emptyText: 'Select Month',
                            name: 'month_data',
                            allowBlank: false,
                        },
                        {
                            xtype: 'label',
                            forId: 'myFieldId',
                            text: 'To',
                            margin: '2 30 0 30'
                        },
                        {   
                            xtype: 'yearcombobox',
                            emptyText: 'Select Year',
                            name: 'tahun',
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
                    padding: '0 0 0 350px',
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
