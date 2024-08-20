Ext.define('Hrd.view.lookup.project.FormData', {
    alias: 'widget.lookupprojectformdata',
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
                    name:'department_id'
                },
                {
                    fieldLabel:'Department Name',
                    name:'department'
                },
                {
                    fieldLabel:'Code',
                    name:'code'
                },
                {
                    fieldLabel:'Description',
                    name:'description'
                },
                {
                    fieldLabel:'Manager',
                    name:'manager'
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});