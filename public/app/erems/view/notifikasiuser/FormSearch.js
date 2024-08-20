Ext.define('Erems.view.notifikasiuser.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.notifikasiuserformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_email',
                    name: 'user_email',
                    fieldLabel: 'Email',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                        xtype: 'notifikasimodulecombobox',
                        itemId: 'fs_module_name',
                        name: 'module_name',
                        anchor: '-15',
                        listeners: {
                            beforequery: function (record) {
                                record.query = new RegExp(record.query, 'i');
                                record.forceAll = true;
                            }
                        }

                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});