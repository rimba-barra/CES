Ext.define('Cashier.view.voucher.FormDataOut', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.voucherformdataout',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
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
                    name: 'cheque_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cheque_type',
                    value: 'OUT'
                },

                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                },
                
                {
                    xtype: 'combobox',
                    name: 'project_project_id',
                    fieldLabel: 'Project',
                    displayField: 'name',
                    valueField: 'project_id',
                    readOnly: false,
                    allowBlank: true,
                    hidden:true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: true,
                    typeAhead: false,
                    //readOnly: true,
                    //fieldStyle: 'background-color:#eee;background-image: none;'
                },
//                {
//                    xtype: 'hiddenfield',
//                    name: 'project_project_id',
//                },
//                {
//                    xtype: 'hiddenfield',
//                    name: 'pt_pt_id'
//                },
//                {
//                    xtype: 'textfield',
//                    name: 'pt_name',
//                    fieldLabel: 'Company',
//                    enforceMaxLength: true,
//                    readOnly: true,
//                    maskRe: /[^\`\"\']/,
//                    maxLength: 255,
//                    anchor: '-5'
//                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    readOnly: false,
                    hidden:true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: true,
                    typeAhead: false,
                    listeners: {
                        keyup: function (field) {
                            var c = 0;
                            var searchString = field.getValue();

                            if (searchString) {

                                this.store.filterBy(function (record, id) {

                                    if (record.get('name').toLowerCase().indexOf(field.getValue()) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    }

                                    else {
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
                    xtype: 'combobox',
                    name: 'voucherprefix_voucherprefix_id',
                    fieldLabel: 'Bank',
                    displayField: 'coa_name',
                    valueField: 'voucherprefix_id',
                    queryMode: 'local',
                    id:'formdataoutchequeid',
                    itemId:'formdataoutchequeid',
                    allowBlank: false,
                    forceSelection: true,
                },
                {
                    xtype: 'textfield',
                    name: 'series',
                    fieldLabel: 'Series',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 5,
                    anchor: '-5',
                },
                {
                    xtype: 'textfield',
                    name: 'cheque_no',
                    fieldLabel: 'Cheque No.',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 16,
                    anchor: '-5',
                },
//                {
//                    xtype: 'datefield',
//                    fieldLabel: 'Issued Date',
//                    name: 'issued_date',
//                    format: 'd-m-Y',
//                    submitFormat: 'Y-m-d H:i:s.u',
//                },
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
                        action: 'saveuse',
                        itemId: 'btnSaveUse',
                        disabled: true,
                        padding: 5,
                        width: 105,
                        iconCls: 'icon-search',
                        text: 'Save & Use'
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

