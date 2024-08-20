Ext.define('Cashier.view.rcash.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.rcashformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_fdrcash",
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
                    id: 'default' + me.uniquename,
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'status',
                    id: 'status' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'statusdata',
                    id: 'statusdata' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                    id: 'project_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                    id: 'kasbank_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'prefix_id',
                    id: 'prefix_id' + me.uniquename,
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
                            xtype: 'ptusercombobox',
                            fieldLabel: 'Pt/Company',
                            itemId: 'fd_pt_id' + me.uniquename,
                            id: 'pt_id' + me.uniquename,
                            name: 'pt_id',
                            width: 300,
                            emptyText: 'Pt / Company',
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '70'
                        },
                        {
                            xtype: 'ptusercombobox',
                            fieldLabel: 'New Pt/Company',
                            itemId: 'fd_pt_id_revision' + me.uniquename,
                            id: 'pt_id_revision' + me.uniquename,
                            name: 'pt_id_revision',
                            width: 300,
                            emptyText: 'New Pt / Company',
                            readOnly: false,
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
                            xtype: 'datefield',
                            fieldLabel: 'Transaction Date',
                            itemId: 'fd_kasbank_date',
                            id: 'kasbank_date' + me.uniquename,
                            name: 'kasbank_date',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            emptyText: 'Manual Input',
                            readOnly: true,
                            hidden: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '70'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'New Transaction Date',
                            itemId: 'fd_kasbank_date_revision',
                            id: 'kasbank_date_revision' + me.uniquename,
                            name: 'kasbank_date_revision',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: 300,
                            emptyText: 'Manual Input',
                            hidden: false,
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
                            fieldLabel: 'Voucher No.',
                            itemId: 'fd_voucher_no',
                            id: 'voucher_no' + me.uniquename,
                            name: 'voucher_no',
                            emptyText: 'Input manual',
                            width: 300,
                            readOnly: true,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '70'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'New Voucher No.',
                            itemId: 'fd_voucher_no_revision',
                            id: 'voucher_no_revision' + me.uniquename,
                            name: 'voucher_no_revision',
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
                            xtype: 'inoutcombobox',
                            fieldLabel: 'Data flow',
                            itemId: 'fd_dataflow' + me.uniquename,
                            id: 'dataflow' + me.uniquename,
                            name: 'dataflow',
                            width: 300,
                            readOnly: true,
                            emptyText: 'Select flow',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '70'
                        },
                        {
                            xtype: 'inoutcombobox',
                            fieldLabel: 'New Data flow',
                            itemId: 'fd_dataflow_revision' + me.uniquename,
                            id: 'dataflow_revision' + me.uniquename,
                            name: 'dataflow_revision',
                            width: 300,
                            readOnly: false,
                            emptyText: 'Select new flow',
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
                            xtype: 'textareafield',
                            itemId: 'fdms_description',
                            id: 'revision_note' + me.uniquename,
                            name: 'revision_note',
                            fieldLabel: 'Description',
                            allowBlank: false,
                            enforceMaxLength: true,
                            grow: true,
                            width: 670,
                        },
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

