Ext.define('Cashier.view.journaleliminasi.FormDataSubDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.journaleliminasisubdetailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    uniquename: '_journalrequestsubdetail',
    id: 'journalsubdetailformdataID',
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
                    name: 'journal_id',
                    id: 'journal_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'journaldetail_id',
                    id: 'journaldetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'journaldetail_journaldetail_id',
                    id: 'journaldetail_journaldetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'journalsubdetail_id',
                    id: 'journalsubdetail_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'coa_id',
                    id: 'coa_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_kelsub_id',
                    id: 'kelsub_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'subgl_code',
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
                                    xtype: 'textfield',
                                    name: 'journaldetail_indexdata',
                                    id: 'indexdata' + me.uniquename,
                                    fieldLabel: 'Index',
                                    width: 200,
                                    readOnly: true,
                                    allowBlank: false,
                                },
                                {
                                    xtype: 'splitter',
                                    width: '10',
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'indexsubdata',
                                    readOnly: true,
                                    allowBlank: false,
                                    hidden:true,
                                },
                            ]
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Kel Sub.',
                            itemId: 'fd_kelsub' + me.uniquename,
                            id: 'kelsub' + me.uniquename,
                            name: 'kelsub_kelsub',
                            width: 300,
                            readOnly: true,
                        },

                        {
                            xtype: 'subglcombobox',
                            fieldLabel: 'Sub Code',
                            itemId: 'fd_subgl_id',
                            id: 'subgl_id',
                            name: 'subgl_subgl_id',
                            emptyText: 'Ketik Sub Code...',
                            width: 300,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            queryMode: 'remote',
                            minChars: 2,
                            forceSelection:true,
                            typeAhead:false
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
                            name: 'subgl_code1',
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
                            name: 'subgl_code2',
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
                            name: 'subgl_code3',
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
                            id: 'subgl_code4' + me.uniquename,
                            name: 'subgl_code4',
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
                            minValue: 1,
                            allowBlank: false,
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
    generateDockedItem: function() {
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
                        action: 'directsave',
                        itemId: 'btnDirectSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'SAVE'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});

