Ext.define('Cashier.view.loaner.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.loanerformdata',   
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 380,
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
                    name: 'loaner_id',
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
                            fieldLabel: 'Loaner Code',
                            itemId: 'fd_code',
                            id: 'code',
                            name: 'code',
                            width: 300,
                            maxLength: 5,
                            emptyText: 'Code',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                         {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'fd_active',
                            name: 'active',
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
                    fieldLabel: 'Loaner Name',
                    itemId: 'fd_loaner',
                    id: 'loaner',
                    name: 'loaner',
                    emptyText: 'Loaner Name',
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
                            xtype: 'textfield',
                            fieldLabel: 'Job Position',
                            itemId: 'fd_pekerjaan',
                            id: 'pekerjaan',
                            name: 'pekerjaan',
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
                            xtype: 'departmentcombobox',
                            fieldLabel: 'Departement',
                            itemId: 'fd_department_id',
                            id: 'department_id',
                            name: 'department_id',
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
                            fieldLabel: 'Phone',
                            itemId: 'fd_phone',
                            id: 'phone',
                            name: 'phone',
                            emptyText: '',
                            width: 300,
                            allowBlank: false,
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
                            itemId: 'fd_mobilephone',
                            id: 'mobilephone',
                            name: 'mobilephone',
                            emptyText: '',
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
                    xtype: 'textareafield',
                    fieldLabel: 'Description',
                    itemId: 'fd_description',
                    id: 'description',
                    name: 'description',
                    emptyText: '',
                    width: 120,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    grow: true,
                    
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

