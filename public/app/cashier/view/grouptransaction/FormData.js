Ext.define('Cashier.view.grouptransaction.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.grouptransactionformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
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
                    name: 'grouptrans_id',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        flex: 2
                    },
                    items: [
                        {
                            xtype: 'projectcombobox',
                            fieldLabel: 'Project',
                            itemId: 'fd_project_id',
                            id: 'project_id',
                            name: 'project_id',
                            emptyText: 'Project Name',                            
                            padding: '0 30 10 0',
                            anchor:'100%',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            grow: true,
                        },
                        {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            align: 'right',
                            bodyBorder: false,
                            defaults: {
                                flex: 2
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    fieldLabel: '',
                                    itemId: 'fd_is_default',
                                    name: 'is_default',
                                    boxLabel: 'Default',
                                    padding: '0 0 0 0',
                                    margin: '0 0 0 0',
                                    boxLabelCls: 'x-form-cb-label small',
                                    inputValue: '1',
                                    uncheckedValue: '0',
                                    checked: true
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
                    ]
                },
                {
                    xtype: 'projectptcombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fd_pt_id',
                    id: 'pt_id',
                    name: 'pt_id',
                    emptyText: 'Pt/Company',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    defaults: {
                        flex: 2
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Code',
                            itemId: 'fd_code',
                            id: 'code',
                            name: 'code',
                            emptyText: 'Code',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },
                        {
                            xtype: 'statuscombobox',
                            itemId: 'fdms_status',
                            name: 'status',
                            fieldLabel: 'Status',
                            allowBlank: true,
                            enforceMaxLength: true,
                        },
                    ]
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: true,
                    enforceMaxLength: true,
                    grow: true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

