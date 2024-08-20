Ext.define('Hrd.view.personalischild.FormData', {
    alias: 'widget.personalischildformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
                {
                    xtype:'hiddenfield',
                    name:'employee_id'
                },
                {
                    fieldLabel:'Employee Name',
                    width:400,
                    name:'employee_name'
                },
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});