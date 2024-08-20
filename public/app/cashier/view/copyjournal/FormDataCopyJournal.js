Ext.define('Cashier.view.copyjournal.FormDataCopyJournal', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.copydatajournalformdata',
    requires: [
       // 'Cashier.view.copyjournal.CopyAccountJournalGrid',
        //'Cashier.view.copyjournal.CopySubAccountGrid'
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 500,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_journal_id',
                    name: 'journal_id'
                },
                {
                    xtype: 'panel',
                    itemId: 'panelvoucher',
                    title: 'VOUCHER',
                    collapsible: true,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'splitter',
                            width: '1000'
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            padding: '10px 0 0 20px',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'prefixcombobox',
                                    fieldLabel: 'Prefix',
                                    name: 'prefix_id',
                                    disabled:true,
                                },
                                {
                                    xtype: 'splitter', width: 10,
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'no_generate',
                                    emptyText: 'XXXXXX',
                                    width: 100,
                                    readOnly: true,
                                },
                                {
                                    xtype: 'splitter', width: 10,
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'generate_month',
                                    emptyText: 'MM',
                                    width: 50,
                                    readOnly: true,
                                },
                                {
                                    xtype: 'splitter', width: 100,
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: "Tanggal Voucher",
                                    name: 'voucher_date',
                                    readOnly: true,
                                    format: 'd-m-Y',
                                    submitFormat: 'Y-m-d'
                                },
                            ]

                        },
                        {
                            xtype: 'splitter', width: 10,
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            padding: '10px 0 0 20px',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: "Voucher No",
                                    name: 'voucher_no',
                                    width: 440,
                                    readOnly: true
                                }


                            ]

                        },
                        {
                            xtype: 'tbspacer',
                            height: 10
                        },
                        {
                            xtype: 'copyaccountjournalgrid',
                            itemId: 'fd_accountjournalgrid',
                            name: 'accountjournalgrid',
                            disabled: false,
                            title: 'Account Journal',
                            width: '98%',
                            height: 200,
                            padding: '20px 0 0 20px',
                        },
                        {
                            xtype: 'tbspacer',
                            height: 10
                        },
                        {
                            xtype: 'copysubaccountgrid',
                            itemId: 'fd_subaccountjournalgrid',
                            name: 'subaccountjournalgrid',
                            disabled: false,
                            hidden: false,
                            title: 'Sub Account Detail',
                            width: '98%',
                            height: 200,
                            padding: '20px 0 0 20px',                           
                        },
                        {
                            xtype: 'tbspacer',
                            height: 10
                        },
                        {
                            xtype: 'panel',
                            width: '100%',
                            padding: '20px 0 0 20px',
                            layout: 'vbox',
                            bodyStyle: 'border:0px',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: "Total Debet",
                                    name: 'debit_total',
                                    maskRe: /[0-9\.]/,
                                    width: 300,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: "Total Credit",
                                    name: 'credit_total',
                                    width: 300,
                                    maskRe: /[0-9\.]/,
                                    readOnly: true
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: "Selisih",
                                    name: 'selisih',
                                    maskRe: /[0-9\.]/,
                                    width: 300,
                                    readOnly: true
                                },
                            ]

                        },
                        {
                            xtype: 'tbspacer',
                            height: 30
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
                padding: '0 0 0 400',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    },
                ]
            }
        ];
        return x;
    }
});