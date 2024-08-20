Ext.define('Hrd.view.reloadpm.FormApplyToDoc', {
    alias: 'widget.reloadpmformapplytodoc',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    deletedData: {},
    initComponent: function () {
        var me = this;
      //  var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'combobox',
                    name: 'periode',
                    fieldLabel: 'Periode',
                    width: 180,
                    displayField: 'periode',
                    valueField: 'periode',
                    readOnly: false,
                    allowBlank: false,
                    matchFieldWidth: false
                },

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});