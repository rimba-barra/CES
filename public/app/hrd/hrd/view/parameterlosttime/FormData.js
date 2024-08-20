Ext.define('Hrd.view.parameterlosttime.FormData', {
    alias: 'widget.parameterlosttimeformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();




        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'losttime_param_id'
                },
                {
                    xtype: 'combobox',
                    name: 'absenttype_absenttype_id',
                    fieldLabel: 'Absent Type',
                    displayField: cbf.absenttype.d,
                    valueField: cbf.absenttype.v,
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description',
                    readOnly: true,
                    size: 30
                },
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});