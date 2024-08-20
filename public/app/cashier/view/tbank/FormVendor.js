Ext.define('Cashier.view.tbank.FormVendor', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tbankformvendor',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_vendor_id',
                },
                {
                    xtype: 'tbankvendorgrid',
                    itemId: 'fd_tbankvendorgrid',
                    id: 'tbankvendorgrid_e',
                    name: 'tbankvendorgrid',
                    title: 'Vendor Data',
                    width: '98%',
                    height: 300,
                    padding: '20px 0 0 20px',
                },
                {xtype: 'tbspacer', height: 10},
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'splitter',
                            width: '540'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'TOTAL :',
                            itemId: 'fd_totalvendor',
                            id: 'totalvendor_e',
                            name: 'totalvendor',
                            emptyText: 'Auto Value',
                            value: 0,
                            width: 300,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: '0 0 0 720',
                    type: 'hbox',
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'apply',
                        itemId: 'btnApply',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Apply'
                    },
                   {
                    xtype: 'button',
                    action: 'cancel',
                    itemId: 'btnCancel',
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
    },
});

