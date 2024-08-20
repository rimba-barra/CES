Ext.define('Erems.view.mastercustomer.FormDataAddress', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.mastercustomerformdataaddress',
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
                    xtype : 'hiddenfield',
                    name  : 'customer_customer_id'
                },
                {
                    xtype : 'hiddenfield',
                    name  : 'customeraddress_id'
                },
                {
                    xtype      : 'xaddressfieldEST', ///edited by Erwin.S 21042021
                    name       : 'address',
                    fieldLabel : 'Address'
                },
                {
                    xtype          : 'checkboxfield',
                    fieldLabel     : ' ',
                    name           : 'is_default',
                    checked        : false,
                    inputValue     : '1',
                    uncheckedValue : '0',
                    margin         : '0 5px 0 0',
                    boxLabel       :'Default'
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

