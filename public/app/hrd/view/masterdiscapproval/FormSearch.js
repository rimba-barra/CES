Ext.define('Hrd.view.masterdiscapproval.FormSearch', {
    extend: 'Hrd.library.template.view.FormSearch',
    alias: 'widget.masterdiscapprovalformsearch',
    uniquename: '_masterdiscapprovalformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_read',
                    value: 'default'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Type',
                    itemId: 'fdms_tipe',
                    id: 'tipe',
                    name: 'tipe',
                    width: 200,
                    emptyText: 'Please Select',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    triggerAction: "all",                 
                    store:[['HC','HC Project'],['HCSH','HC Sub Holding'],['GM','GM Project'],['DIR','Director Project']]
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
