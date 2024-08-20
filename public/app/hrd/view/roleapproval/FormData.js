Ext.define('Hrd.view.roleapproval.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.roleapprovalformdata',
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
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'generalparameter_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'module_name',
                    value: 'employeeparameter',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'data_type',
                    value: 'int',
                },
                {
                    xtype: 'functionapprovalcombobox',
                    fieldLabel: 'Approval for',
                    itemId: 'fd_name' + me.uniquename,
                    id: 'name' + me.uniquename,
                    name: 'name',
                    width: 250,
                    emptyText: 'Please Select',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    absoluteReadOnly: true,
                    triggerAction: "all",
                    forceSelection : true,
                },
                {
                    xtype: 'employeecombobox',
                    fieldLabel: 'Employee',
                    itemId: 'fd_value' + me.uniquename,
                    id: 'value' + me.uniquename,
                    name: 'value',
                    width: 250,
                    emptyText: 'Please Select',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    absoluteReadOnly: true,
                    triggerAction: "all",
                    forceSelection : true,	
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

});

