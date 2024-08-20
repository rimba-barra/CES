Ext.define('Cashier.view.postingstepsatu.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.postingstepsatuformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: '_fdpostingstepsatu',
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    id: 'journal_id' + me.uniquename,
                    name: 'journal_id',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'statedata' + me.uniquename,
                    name: 'statedata',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbank_id' + me.uniquename,
                    name: 'kasbank_id',
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    bodyBorder: false,
                    border: false,
                    defaults: {
                        flex: 2
                    },
                    layout: 'vbox',
                    items: [
                         {
                            xtype: 'prefixcashierpostingcombobox',
                            fieldLabel: 'GL Prefix',
                            itemId: 'fd_prefix_id_gl'+ me.uniquename,
                            id: 'prefix_id_gl'+ me.uniquename,
                            name: 'prefix_id_gl',
                            emptyText: '',
                            width: 300,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                         xtype:'splitter',
                         width:'10'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'GL Voucher Date',
                            itemId: 'voucher_date_gl' + me.uniquename,
                            id: 'voucher_date_gl' + me.uniquename,
                            name: 'voucher_date_gl',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 200,
                            emptyText: 'Auto Value',
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fs_description' + me.uniquename,
                    id: 'description' + me.uniquename,
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: true,
                    enforceMaxLength: true,
                    grow: true,
                    width: 300,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

