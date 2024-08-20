Ext.define('Hrd.view.plafonkaryawan.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.plafonkaryawanformsearch',
    requires: ['Hrd.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        var yearStore = Ext.create('Ext.data.ArrayStore', {
            fields: ['number', 'name'],
            id: 0,
            data: []
        });

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'combobox',
                    name: 'year',
                    fieldLabel: 'Year',
                    store: yearStore,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'number',
                }
            ],
            dockedItems: [],
            tbar: [{
                        xtype: 'button',
                        action: 'gen',
                        iconCls: 'icon-new',
                        tooltip: 'Generate base on Medical Plafon',
                        text: 'Generate'
                    }]
        });

        me.callParent(arguments);
    }
});