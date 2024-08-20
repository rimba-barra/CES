Ext.define('Cashier.view.masterbudgetcoa.FormDataDepartment', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterbudgetcoaformdatadepartment',
    // stores: [
    //     'Department'
    // ],
    frame: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    height: 100,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow :-1,
    initComponent: function() {
        var me = this;


        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read'
                },
                // {
                //     xtype: 'departmentcombobox',
                //     fieldLabel: 'Department',
                //     itemId: 'fs_department_id',
                //     name: 'department_id',
                //     emptyText: 'Select Department',
                //     editable: false,
                //     allowBlank: false,
                //     enforceMaxLength: true,
                //     enableKeyEvents: true,
                //     disabled: false,
                //     rowdata: null
                // },
                {
                    xtype: 'combobox',
                    name: 'department_id_del',
                    fieldLabel: 'Department',
                    emptyText: 'Select Department',
                    displayField: 'name',
                    valueField: 'department_id',
                    queryMode: 'local'
                },
            ],
            buttons: [
                {
                    text: 'Delete',
                    action: 'departmentDel'
                },
                {
                    text: 'Cancel',
                    handler: function() {
                        this.up('window').close();
                    }
                }        
            ],
            dockedItems: null
        });

        me.callParent(arguments);
    }
});

