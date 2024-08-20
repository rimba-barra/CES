Ext.define('Hrd.view.disckaryawangolongan.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.disckaryawangolonganformdata',
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
                labelWidth: 150,
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
                    name: 'disc_id',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Employee',
                    name: 'employee_name',
                    readOnly:true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'No Ref',
                    name: 'noref',
                    readOnly:true
                },
                {
                    xtype: 'groupcombobox',
                    fieldLabel: 'Group (Golongan) Code',
                    itemId: 'fd_group_code',
                    id: 'group_code',
                    name: 'group_code',
                    labelWidth: 150,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    queryMode:'local',
                    displayField: 'code',
                    valueField:'code'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

});

