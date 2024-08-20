Ext.define('Cashier.view.tbank.FormCoadetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.tbankformcoadetail',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: "_tbankformcoadetail",
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
                    name: 'seq',
                    id: 'seq'+me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbank_id',
                    id: 'kasbank_id'+me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbankdetail_id',
                    id: 'kasbankdetail_id'+me.uniquename,
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
                            itemId: 'fd_coa_id'+me.uniquename,
                            id: 'coa_id_d',
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
                            itemId: 'fd_coaname'+me.uniquename,
                            id: 'coaname_d',
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
                            id: 'description_d'+me.uniquename,
                            name: 'description',
                            emptyText: '',
                            width: 400,
                            readOnly: false,
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
                            xtype: 'inoutcombobox',
                            fieldLabel: 'Data Flow',
                            itemId: 'fd_dataflow'+me.uniquename,
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
                            minValue: 0,
                            fieldLabel: 'Amount',
                            itemId: 'fd_amount'+me.uniquename,
                            id: 'amount_d',
                            name: 'amount',
                            emptyText: 'Manual Input',
                            // Remove spinner buttons, and arrow key and mouse wheel listeners
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: 400,
                            readOnly: false,
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
    }
});

