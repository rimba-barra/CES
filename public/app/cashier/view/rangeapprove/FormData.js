Ext.define('Cashier.view.rangeapprove.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.rangeapproveformdata',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox',
    ],
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
                    name: 'rangeapprove_id',
                },	
                {
                    xtype: 'ptbyusercombobox',
                    itemId: 'fs_pt_id',
                    name: 'projectpt_id',
                    anchor:'-15'

                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_range',
                    name: 'range',
                    fieldLabel: 'Range',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 1000,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_fromamount',
                    name: 'fromamount',
                    fieldLabel: 'From Amount',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 1000,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_untilamount',
                    name: 'untilamount',
                    fieldLabel: 'Until Amount',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 1000,
                },
                /*
                {
                    xtype: 'textfield',
                    itemId: 'fdms_md1',
                    name: 'md1',
                    fieldLabel: 'md1',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_md2',
                    name: 'md2',
                    fieldLabel: 'md2',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_dir1',
                    name: 'dir1',
                    fieldLabel: 'dir1',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_dir2',
                    name: 'dir2',
                    fieldLabel: 'dir2',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                },
                */
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

