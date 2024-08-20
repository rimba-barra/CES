Ext.define('Hrd.view.overtimeindex.FormData', {
    alias: 'widget.overtimeindexformdata',
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
                    name: 'overtimeindex_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'overtimetype',
                    value:1
                },
                
                {
                    xtype: 'textfield',
                    name: 'hour',
                    fieldLabel: 'Hour',
                    readOnly: true,
                    size: 10
                },
                {
                    xtype: 'textfield',
                    name: 'cut_break',
                    fieldLabel: 'Cut Break',
                    readOnly: true,
                    size: 10
                },
                {
                    xtype: 'textfield',
                    name: 'meal',
                    fieldLabel: 'Meal',
                    readOnly: true,
                    size: 10
                },
                {
                    xtype: 'textfield',
                    name: 'break_limit',
                    fieldLabel: 'Limit Break',
                    readOnly: true,
                    size: 10
                },
            ],
            dockedItems: []

        });

        me.callParent(arguments);
    }

});