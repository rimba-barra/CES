Ext.define('Gl.view.bungashl.FormData', {
    extend: 'Ext.form.Panel',
    alias: 'widget.bungashlformdata',
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
                    padding: '0 0 0 58px',
                    items: [
                         {
                            xtype: 'datefield',
                            fieldLabel: 'Report Date',
                            emptyText: 'Report Date',
                            name: 'reportdate',
                            allowBlank: false,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d'
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Report Type',
                            padding: '0 0 0 20px',
                            layout: 'vbox',
                            items: [
                                {
                                    boxLabel: 'Dari awal tahun',
                                    xtype: 'radiofield',
                                    name: 'reporttype',
                                    inputValue: '1',
                                    id: 'radio1'
                                },
                                {
                                    boxLabel: 'Dari awal bulan',
                                    xtype: 'radiofield',
                                    name: 'reporttype',
                                    inputValue: '2',
                                    id: 'radio2',
                                    checked: true,
                                },
                            ]
                        }
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
                    padding: '0 0 0 100px',
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
