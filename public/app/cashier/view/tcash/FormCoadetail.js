Ext.define('Cashier.view.tcash.FormCoadetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tcashformcoadetail',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_tcashformcoadetail",
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
                    id: 'kasbank_id' + me.uniquename,
                    name: 'kasbank_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'seq',
                    id: 'seq_wwsw',
                },
                {
                    xtype: 'hiddenfield',
                    id: 'kasbankdetail_id' + me.uniquename,
                    name: 'kasbankdetail_id',
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
                            xtype: 'coadeptcombobox',
                            fieldLabel: 'Account Code',
                            itemId: 'fd_coa_id',
                            id: 'coa_id' + me.uniquename,
                            name: 'coa_id',
                            emptyText: 'Select COA',
                            width: 230,
                            allowBlank: false,
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
                            fieldLabel: 'Account Name',
                            itemId: 'fd_coaname',
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
                            fieldLabel: 'Description',
                            itemId: 'fd_description',
                            id: 'description' + me.uniquename,
                            name: 'description',
                            emptyText: '',
                            width: 400,
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
                            xtype: 'inoutcombobox',
                            fieldLabel: 'Data Flow',
                            itemId: 'fd_dataflow' + me.uniquename,
                            id: 'dataflow',
                            name: 'dataflow',
                            emptyText: 'Auto Value',
                            width: 400,
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
                            xtype: 'xmoneyfield',
                            anchor: '100%',
                            itemId: 'fd_amount' + me.uniquename,
                            id: 'amount' + me.uniquename,
                            name: 'amount',
                            fieldLabel: 'Amount',
                            emptyText: 'Manual Input',
                            value: 0,
                            width: 400,
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
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

