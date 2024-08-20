Ext.define('Cashier.view.pemutihan.FormPemutihan', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.pemutihanformpemutihan',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    width: 1000,
    height: 300,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'schedule_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id'
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'cluster',
                            id: 'cluster',
                            fieldLabel: 'Cluster',
                            align: 'right',
                            readOnly:true,
                            width: '300',
                            fieldStyle: 'margin-left:-30px'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            name: 'code',
                            id: 'code',
                            fieldLabel: 'Unit Number',
                            align: 'right',
                            readOnly:true,
                            width: 250,
                            fieldStyle: 'margin-left:-30px'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'customer_name',
                            id: 'customer_name',
                            fieldLabel: 'Customer',
                            align: 'right',
                            readOnly:true,
                            width: '300',
                            fieldStyle: 'margin-left:-30px'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            name: 'schedule',
                            id: 'schedule',
                            fieldLabel: 'Installment',
                            align: 'right',
                            readOnly:true,
                            width: 250,
                            fieldStyle: 'margin-left:-30px'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'schedule_amount',
                            id: 'schedule_amount',
                            fieldLabel: 'Amount',
                            align: 'right',
                            readOnly:true,
                            width: '300',
                            fieldStyle: 'margin-left:-30px'
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            name: 'remaining_balance',
                            id: 'remaining_balance',
                            fieldLabel: 'Remaining Amount',
                            align: 'right',
                            readOnly:true,
                            width: 250,
                            fieldStyle: 'margin-left:-30px'
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    width: 300,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'fp_no',
                            id: 'fp_no',
                            fieldLabel: 'No FP',
                            align: 'right',
                            width: '300',
                            fieldStyle: 'margin-left:-30px'
                        },
                    ]
                },
                {
                    xtype: 'textareafield',
                    name: 'note',
                    id: 'note',
                    fieldLabel: 'Note:',
                    align: 'right',
                    width: '850',
                    fieldStyle: 'margin-left:-30px'
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
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
                        text: 'Proses'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

