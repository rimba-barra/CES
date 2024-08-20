Ext.define('Hrd.view.msection.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.msectionformdata',
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
                    name: 'section_id',
                },
		/*
                {
                    xtype: 'departmentcombobox',
                    fieldLabel: 'Department',
                    itemId: 'fd_department_id' + me.uniquename,
                    id: 'department_id' + me.uniquename,
                    name: 'department_id',
                    width: 250,
                    emptyText: 'Department',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    absoluteReadOnly: true,
                },
		*/	
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                    absoluteReadOnly: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_section',
                    name: 'section',
                    fieldLabel: 'Section',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

});

