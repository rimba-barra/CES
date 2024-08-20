Ext.define('Cashier.view.typeloan.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.typeloanformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 350,
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
                    name: 'typeloan_id',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    items: [
                        {
                            xtype: 'projectcombobox',
                            fieldLabel: 'Project',
                            itemId: 'fd_project_id',
                            id: 'project_id_aaa',
                            name: 'project_id',
                            emptyText: 'Project Name',
                            width: 400,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            grow: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '40'
                        },
                        {
                            xtype: 'projectptcombobox',
                            fieldLabel: 'Pt/Company',
                            itemId: 'fd_pt_id',
                            id: 'pt_id_aaa',
                            name: 'pt_id',
                            emptyText: 'Pt/Company',
                            width: 400,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]

                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    align: 'right',
                    bodyBorder: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Code',
                            itemId: 'fd_code',
                            id: 'code_axv',
                            name: 'code',
                            width: 200,
                            maxLength: 10,
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
                            xtype: 'textfield',
                            fieldLabel: 'Prefix',
                            itemId: 'fd_typeloanprefix',
                            id: 'typeloanprefix_axv',
                            name: 'typeloanprefix',
                            width: 200,
                            maxLength: 5,
                            emptyText: 'Prefix',
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
                            xtype: 'flaginterestcombobox',
                            fieldLabel: 'Flag Interest',
                            itemId: 'fd_flag_interest',
                            id: 'flag_interest_xcv',
                            name: 'flag_interest',
                            emptyText: 'Flag for Interest',
                            width: 250,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                    ]

                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_description',
                    name: 'description',
                    id: 'description_xcv',
                    fieldLabel: 'Description',
                    allowBlank: false,
                    enforceMaxLength: true,
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

