Ext.define('Cashier.view.rangeapprove.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.rangeapproveformsearch',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox'
    ],
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'ptbyusercombobox',
                    itemId: 'fs_pt_id',
                    name: 'projectpt_id',
                    anchor:'-15'

                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_range',
                    name: 'range',
                    fieldLabel: 'range',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                /*
                {
                    xtype: 'textfield',
                    itemId: 'fs_md1',
                    name: 'md1',
                    fieldLabel: 'md1',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_md2',
                    name: 'md2',
                    fieldLabel: 'md2',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_dir1',
                    name: 'dir1',
                    fieldLabel: 'dir1',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_dir2',
                    name: 'dir2',
                    fieldLabel: 'dir2',
                    allowBlank: true,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                */
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
