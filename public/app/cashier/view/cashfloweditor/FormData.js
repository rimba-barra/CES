Ext.define('Cashier.view.cashfloweditor.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    requires: ['Ext.EventObject'],
    alias: 'widget.cashfloweditorformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    id: 'journaldetail_id',
    initComponent: function () {
        var me = this;
        var code = Ext.create('Ext.data.Store', {
            autoLoad: false,
            storeId : 'storeCode',
            fields: [{
                name: 'subgl_id',
                type: 'int'
            },
            {
                name: 'code',
                type: 'string'
            },
            {
                name: 'code1',
                type: 'string'
            },
            {
                name: 'code2',
                type: 'string'
            },
            {
                name: 'code3',
                type: 'string'
            },
            {
                name: 'code4',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'kelsub_id',
                type: 'int'
            }
            ],
        });
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
            },
            {
                xtype: 'hiddenfield',
                name: 'journaldetail_id'
            },
            {
                xtype: 'textfield',
                name: 'project_id',
                hidden : true
            },
            {
                xtype: 'textfield',
                name: 'pt_id',
                hidden : true
            },
            {
                xtype: 'hiddenfield',
                name: 'kelsub_id'
            },
            {
                xtype: 'hiddenfield',
                name: 'ceksubglempty',
                value : 1

            },
            {
                xtype: 'textfield',
                name: 'voucher_no',
                emptyText: 'Input Journal No',
                fieldLabel: 'Journal No',
                readOnly:true,
                // allowBlank: false
            },
            {
                xtype: 'datefield',
                fieldLabel:'Journal Date',
                name: 'voucher_date',
                emptyText: 'Select Date',
                readOnly:true,
                // allowBlank: false,
                format: 'd-m-Y',
                submitFormat: 'Y-m-d'
            },
            {
                xtype: 'textfield',
                name: 'coa',
                emptyText: 'Input COA',
                fieldLabel: 'COA',
                readOnly:true,
                // allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'type',
                emptyText: 'Input Type',
                readOnly:true,
                fieldLabel: 'Type',
            },
            {
                xtype: 'cashflowsetupcombobox',
                fieldLabel: 'Cashflow ',
                forceSelection: true,
                name: 'setupcashflow_id',
                displayField: 'cashflowtype',
                valueField: 'cashflowtype_id',
                flex: 2,
                emptyText: 'Input Cashflow',
                forceSelection: true,
                typeAhead: false,
                allowBlank: false,
                listeners: {
                    keyup: function (field) {
                        var c = 0;
                        var searchString = field.getValue();
                        if (searchString) {
                            this.store.filterBy(function (record, id) {
                                if (record.get('cashflowtype').toString().toLowerCase().indexOf(searchString) > -1) {
                                    return true;
                                    this.store.clearFilter(true);
                                } else {
                                    return false;
                                    this.store.clearFilter(true);
                                }
                            });
                        }
                    },
                    buffer: 300,
                },
            },
            {
                xtype: 'textareafield',
                name: 'description',
                emptyText: 'Input Description',
                readOnly:true,
                fieldLabel: 'Description'
            },
            {
                xtype: 'textareafield',
                name: 'keterangan',
                emptyText: 'Input Remarks',
                fieldLabel: 'Remarks',
                readOnly:true
            },
            {
                xtype: 'xmoneyfield',
                name: 'amount',
                readOnly:true,
                fieldLabel: 'Amount',
                emptyText: 'Input Amount',
                enforceMaxLength: true,
                align: 'right',
                maskRe: /[^\`\"\']/,
                enableKeyEvents: false,
                fieldStyle: 'text-align:right;',
                renderer: Ext.util.Format.numberRenderer('0,000.00')
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
                    text: 'Save'
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
                }]
            }];
            return x;
        },
    }
);

