Ext.define('Cashier.view.deptprefix.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.deptprefixformdata',   
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 550,
    bodyBorder: true,
    bodyPadding: 10,
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
                    name: 'deptprefix_id',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout:'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Code',
                            itemId: 'fd_deptprefixcode',
                            id: 'deptprefixcode',
                            name: 'deptprefixcode',
                            width: 300,
                            maxLength: 10,
                            emptyText: 'Vendor Code',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                         {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_flag_id',
                            name: 'flag_id',
                            boxLabel: 'Active',
                            padding: '0 0 0 0',
                            margin: '0 0 0 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Vendor Name',
                    itemId: 'fd_deptprefixname',
                    id: 'deptprefixname',
                    name: 'deptprefixname',
                    emptyText: 'Vendor Name',
                    width: 120,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'NPWP No.',
                    itemId: 'fd_npwp',
                    id: 'npwp',
                    name: 'npwp',
                    emptyText: 'NPWP No.',
                    width: 120,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_address',
                    name: 'address',
                    fieldLabel: 'Address',
                    allowBlank: false,
                    enforceMaxLength: true,
                    grow: true,
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout:'fit'
                    },
                    items: [
                         {
                            xtype: 'jenisusahacombobox',
                            itemId: 'fdms_jenisusaha_id',
                            name: 'jenisusaha_id',
                            width: 300,
                            fieldLabel: 'Jenis Usaha',
                            allowBlank: false,
                            enforceMaxLength: true,
                        },
                                               
                    ]
                },               
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout:'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Office Phone',
                            itemId: 'fd_office_phone',
                            id: 'office_phone',
                            name: 'office_phone',
                            emptyText: '',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Mobile Phone',
                            itemId: 'fd_mobile_phone',
                            id: 'mobile_phone',
                            name: 'mobile_phone',
                            emptyText: '',
                            width: 300,
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
                        layout:'fit'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Email',
                            itemId: 'fd_email',
                            id: 'email',
                            name: 'email',
                            emptyText: '',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'splitter',
                            width: '20'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Fax No.',
                            itemId: 'fd_fax',
                            id: 'fax',
                            name: 'fax',
                            emptyText: '',
                            width: 300,
                            allowBlank: true,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Contacr Person',
                    itemId: 'fd_contactperson',
                    id: 'contactperson',
                    name: 'contactperson',
                    emptyText: '',
                    width: 120,
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
                padding: '0 0 0 250',
                layout: {
                    padding: 6,
                    type: 'hbox',
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
                    },
                   
                ]
            }
        ];
        return x;
    }
});

