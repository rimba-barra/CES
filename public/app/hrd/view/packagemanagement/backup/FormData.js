Ext.define('Hrd.view.backup.packagemanagement.FormData', {
    alias: 'widget.packagemanagementformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pmdocument_id'
                },
                {
                    fieldLabel: 'Code',
                    name: 'code'
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Document Name',
                    name: 'package_name',
                    enforceMaxLength: true,
                    grow: true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});