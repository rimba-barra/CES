Ext.define('Cashier.view.reportparam.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.reportparamformdata',
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
                    name: 'reportparam_id',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                            defaults: {
                                        flex: 3
                                    },
                    items: [
                        {
                            xtype: 'projectcombobox',
                            fieldLabel: 'Project',
                            itemId: 'fd_project_id',
                            id: 'project_id',
                            name: 'project_id',
                            emptyText: 'Project Name',
                            width: 700,
                            padding: '0 30 10 0',
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null
                        },                        
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: '',
                            itemId: 'active',
                            name: 'active',
                            boxLabel: 'Active',
                            padding: '0 0 0 0',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: true
                        }

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
                    xtype: 'codecombogrid',
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
                    xtype: 'textfield',
                    itemId: 'fdms_object',
                    name: 'object',
                    fieldLabel: 'Object Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_value',
                    name: 'value',
                    fieldLabel: 'Object Value',
                    allowBlank: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

