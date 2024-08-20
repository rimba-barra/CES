Ext.define('Cashier.view.kasbondeptposting.FormDataSubDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.kasbondeptpostingsubdetailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    uniquename: '_kasbondeptpostingsubdetail',
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
                    name: 'kasbondept_id',
                    id: 'kasbondept_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbondeptdetail_id',
                    id: 'kasbondeptdetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbondeptsubdetail_id',
                    id: 'kasbondeptsubdetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_id',
                    id: 'kelsub_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'subcode',
                    id: 'subcode' + me.uniquename,
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'indexdata',
                            id: 'indexdata' + me.uniquename,
                            fieldLabel: 'Index',
                            width: 200,
                            readOnly: true,
                            allowBlank: false,
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kel Sub.',
                            itemId: 'fd_kelsub' + me.uniquename,
                            id: 'kelsub' + me.uniquename,
                            name: 'kelsub',
                            emptyText: 'Auto Value',
                            width: 300,
                            readOnly: true,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'subglcombobox',
                            fieldLabel: 'Sub Code',
                            itemId: 'fd_subgl_id' + me.uniquename,
                            id: 'subgl_id' + me.uniquename,
                            name: 'subgl_id',
                            emptyText: 'Select Sub Code',
                            width: 300,
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
                    width: 700,
                    items: [
                        {
                            xtype: 'splitter',
                            width: '105',
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '',
                            itemId: 'fd_code1' + me.uniquename,
                            id: 'code1' + me.uniquename,
                            name: 'code1',
                            emptyText: 'Code 1',
                            width: 100,
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
                            itemId: 'fd_code2' + me.uniquename,
                            id: 'code2' + me.uniquename,
                            name: 'code2',
                            emptyText: 'Code 2',
                            width: 100,
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
                            itemId: 'fd_code3' + me.uniquename,
                            id: 'code3' + me.uniquename,
                            name: 'code3',
                            emptyText: 'Code 3',
                            width: 100,
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
                            itemId: 'fd_code4' + me.uniquename,
                            id: 'code4' + me.uniquename,
                            name: 'code4',
                            emptyText: 'Code 4',
                            width: 100,
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
                    width: 600,
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
                        width: 75,
                        iconCls: 'icon-save',
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
                    }
                ]
            }
        ];
        return x;
    },
});

