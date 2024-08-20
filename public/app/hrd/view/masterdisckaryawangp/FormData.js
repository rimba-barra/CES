Ext.define('Hrd.view.masterdisckaryawangp.FormData', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.masterdisckaryawangpformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    satuan:'tahun',
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelWidth: 80,
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
                    name: 'generalparameter_id',
                },
                {
                    xtype: 'textfield',
                    name: 'name_form',
                    fieldLabel: 'Name',
                    readOnly:true
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                    {
                        xtype: 'textfield',
                        name: 'value',
                        labelWidth: 80,
                        fieldLabel: 'Value',
                        allowBlank: false,
                    },
                    {
                        xtype: 'displayfield',
                        name: 'satuan',
                        value: '&nbsp;'
                    }]
                },
                {
                    xtype: 'reporttocombobox',
                    itemId: 'fd_employee_id',
                    name: 'employee_value',
                    id: 'employee_value',
                    fieldLabel: 'Value',
                    readOnly: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    hidden: true,
                    width:300,
                    selectOnFocus:true
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },

});

