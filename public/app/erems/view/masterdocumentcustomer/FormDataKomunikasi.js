Ext.define('Erems.view.masterdocumentcustomer.FormDataKomunikasi', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterdocumentcustomerformdatakomunikasi',
    requires: [],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    editedRow: -1,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'customer_komunikasi_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'customer_customer_id'
                },
                {
                    xtype: 'textfield',
                    name: 'email',
                    fieldLabel: 'Email',
                    readOnly:true
                },
                {
                    xtype: 'combobox',
                    name: 'dept_phone',
                    displayField: 'dept_phone',
                    valueField: 'customerphone_id',
                    fieldLabel: 'Phone'
                },
                {
                    xtype      : 'xnotefieldEST',
                    name       : 'log_komunikasi',
                    fieldLabel : 'Log Komunikasi'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
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
                        action: 'save',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});

