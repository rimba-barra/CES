Ext.define('Cashier.view.vdposting.FormDataDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdpostingdetailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 350,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_voucherpostingdetail',
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
                    id: 'hideparam' + me.uniquename,
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'statedata',
                    id: 'statedata' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_id',
                    id: 'kelsub_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucher_id',
                    id: 'voucher_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'voucherdetail_id',
                    id: 'voucherdetail_id' + me.uniquename,
                },
                {
                    xtype: 'textfield',
                    name: 'indexdata',
                    id: 'indexdata' + me.uniquename,
                    fieldLabel: 'Index',
                    width: 100,
                    readOnly: true,
                    allowBlank: false,
                },
                {
                    xtype: 'coadeptvouchercombobox',
                    fieldLabel: 'Account Code',
                    itemId: 'fd_coa_id' + me.uniquename,
                    id: 'coa_id' + me.uniquename,
                    name: 'coa_id',
                    emptyText: 'Select COA',
                    width: 230,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Account Name',
                    itemId: 'fd_coaname' + me.uniquename,
                    id: 'coaname' + me.uniquename,
                    name: 'coaname',
                    emptyText: 'Auto Value',
                    width: 400,
                    readOnly: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
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
                            xtype: 'textfield',
                            fieldLabel: 'Kel Sub',
                            itemId: 'fd_kelsub' + me.uniquename,
                            id: 'kelsub' + me.uniquename,
                            name: 'kelsub',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '10',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_kelsubdesc' + me.uniquename,
                            id: 'kelsubdesc' + me.uniquename,
                            name: 'kelsubdesc',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
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
                            xtype: 'textfield',
                            fieldLabel: 'Data Flow',
                            itemId: 'fd_dataflow' + me.uniquename,
                            id: 'dataflow' + me.uniquename,
                            name: 'dataflow',
                            emptyText: 'Auto Value',
                            width: 200,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        }
                    ]
                },
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
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_amount' + me.uniquename,
                            id: 'amount' + me.uniquename,
                            name: 'amount',
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 300,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Remaks',
                    itemId: 'fd_remarks' + me.uniquename,
                    id: 'remarks' + me.uniquename,
                    name: 'remarks',
                    emptyText: '',
                    width: 400,
                    grow: true,
                    readOnly: false,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

