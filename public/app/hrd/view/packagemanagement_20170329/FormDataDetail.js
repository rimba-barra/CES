Ext.define('Hrd.view.packagemanagement.FormDataDetail', {
    alias: 'widget.packagemanagementformdatadetail',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    deletedData: {},
    initComponent: function () {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'pmdocument_detail_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pmdocument_id',
                },
                {
                    xtype: 'combobox',
                    name: 'jenisdocument_id',
                    fieldLabel: 'Doc Name',
                    width: 450,
                    displayField: 'code',
                    valueField: 'jenisdocument_id',
                    action: 'resetdetail',
                    readOnly: false,
                    allowBlank: false,
                },
                {
                    xtype: 'numberfield',
                    name: 'bobot',
                    fieldLabel: 'Bobot (%)',
                    width: 180,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    readOnly: false,
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});