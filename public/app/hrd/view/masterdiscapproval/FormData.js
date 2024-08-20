Ext.define('Hrd.view.masterdiscapproval.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.masterdiscapprovalformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 150,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelWidth: 100,
                labelClsExtra: 'small',
                flex:'100%',
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'disckaryawan_approval_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Type',
                    itemId: 'fd_tipe' + me.uniquename,
                    id: 'tipe' + me.uniquename,
                    name: 'tipe',
                    width: 400,
                    emptyText: 'Please Select',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    absoluteReadOnly: true,
                    triggerAction: "all",
                    forceSelection : true,                   
                    store:[['HC','HC Project'],['HCSH','HC Sub Holding'],['GM','GM Project'],['DIR','Director Project']]
                },
                {
                    xtype: 'reporttocombobox',
                    itemId: 'fd_employee_id',
                    name: 'employee_id',
                    id: 'employee_id',
                    fieldLabel: 'Employee',
                    readOnly: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    allowBlank: false,
                    emptyText: 'Please Select',
                    width:400,
                    selectOnFocus:true
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

});

