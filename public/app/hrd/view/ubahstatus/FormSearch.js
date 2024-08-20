Ext.define('Hrd.view.ubahstatus.FormSearch', {
    extend: 'Hrd.library.box.view.FormSearch',
    alias: 'widget.ubahstatusformsearch',
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.template.combobox.Department'],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            
            items: [
                me.templateNameAndDepartment()
                
            ],
            dockedItems: []
        });
        
        /*
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    name:'code',
                    fieldLabel:'Code'
                }
            ],
            dockedItems:[]
        });*/

        me.callParent(arguments);
    }
});