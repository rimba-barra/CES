Ext.define('Cashier.view.masteroffbalancesheet.FormDataCopy', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masteroffbalancesheetformdatacopy',
    frame: false,
    autoScroll: false,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;background-color:#dfe8f6',
    deletedRows: [],
    editedRow: -1,
    id: 'off_balancesheet_id',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '97%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'off_balancesheet_id'
                },
                {
                xtype: 'hiddenfield',
                name: 'project_id'
            },
            {
                xtype: 'projectptcombobox',
                fieldLabel:'PT',
                emptyText: 'Select PT',
                name: 'pt_id_copy',
                allowBlank: false,
                enableKeyEvents: true,
                margin: '0 0 5 0',
                readOnly:true,
                disabled:true,
                enforeMaxLength: true,
                forceSelection:true,
            },
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Period',
                allowBlank: false,
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [
                {
                    xtype: 'datefield',
                    fieldLabel: '',
                    emptyText: 'From Date',
                    name: 'date_from_copy',
                    width: 100,
                    allowBlank: false,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d'
                },
                {
                    xtype: 'label',
                    forId: 'lbl1',
                    text: 'To',
                    margin: '2 10 0 10'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: '',
                    emptyText: 'Until Date',
                    name: 'date_until_copy',
                    width: 100,
                    allowBlank: false,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d'
                }
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
                align: 'center',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'copy',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-copy',
                        text: 'Copy'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
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

