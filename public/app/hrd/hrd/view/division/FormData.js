Ext.define('Hrd.view.division.FormData', {
    alias: 'widget.divisionformdata',
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
                    name:'division_id'
                },
                {
                    fieldLabel:'Code',
                    name:'code'
                },
                {
                    fieldLabel:'Division Name',
                    name:'division'
                }
                
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});