Ext.define('Erems.view.popupcairksng.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popupcairksngformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            items: [{
                    fieldLabel:'Unit Number',
                    name:'unit_unit_number',
                    enableKeyEvents: true
            },{
                    xtype           : 'xnamefieldEST',
                    fieldLabel      :'Salesman Name',
                    name            :'salesman_employee_name',
                    enableKeyEvents : true
            }],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
