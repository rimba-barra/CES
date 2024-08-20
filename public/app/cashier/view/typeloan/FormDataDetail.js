Ext.define('Cashier.view.typeloan.FormDataDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.typeloandetailformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 280,
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
                    xtype: 'hiddenfield',
                    name: 'typeloaninterest_id',
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Interest Date',
                    emptyText: 'Interest Date',
                    name: 'interestdate',
                    id: 'interestdate_xxx',
                    allowBlank: false,
                    enableKeyEvents: true,
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    readOnly: false,
                },
                {
                    xtype: 'numberfield',
                    minValue: 0,
                    itemId: 'fdms_value',
                    name: 'value',
                    id: 'value_xx',
                    fieldLabel: 'Value',
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
                {
                    
                    xtype: 'numberfield',
                    minValue: 0,
                    itemId: 'fdms_flag_percentage',
                    name: 'flag_percentage',
                    id: 'flag_percentage_xx',
                    fieldLabel: 'Flag %',
                    // Remove spinner buttons, and arrow key and mouse wheel listeners
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 10,
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_description',
                    name: 'description',
                    id: 'description_xzc',
                    fieldLabel: 'Description',
                    allowBlank: false,
                    enforceMaxLength: true,
                    grow: true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

