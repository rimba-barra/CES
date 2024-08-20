Ext.define('Cashier.view.deptprefix.FormDataDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.deptprefixdetailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
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
                    xtype: 'hiddenfield',
                    name: 'deptprefixdetail_id',
                },
                {
                    xtype: 'projectcombobox',
                    fieldLabel: 'Project',
                    itemId: 'fd_project_id',
                    id: 'project_id',
                    name: 'project_id',
                    emptyText: 'Project Name',
                    padding: '0 30 10 0',
                    anchor: '100%',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    grow: true,
                },
                {
                    xtype: 'projectptcombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fd_pt_id',
                    id: 'pt_id',
                    name: 'pt_id',
                    emptyText: 'Pt/Company',
                    padding: '0 30 10 0',
                    anchor: '100%',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_deptprefix',
                    name: 'deptprefix',
                    fieldLabel: 'Prefix Code',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 10,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

