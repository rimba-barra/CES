Ext.define('Cashier.view.subdesccode.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.subdesccodeformsearch',
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
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                    value: '0'
                },
                {
                    xtype: 'projectptallcombobox',
                    fieldLabel: 'Pt/Company',
                    itemId: 'fs_projectpts_id',
                    id: 'projectpts_id_s',
                    name: 'projectpt_id',
                    width: 100,
                    emptyText: 'Project Company',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_subdsk',
                    name: 'subdsk',
                    fieldLabel: 'Kode Sub Deskripsi',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents: true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
