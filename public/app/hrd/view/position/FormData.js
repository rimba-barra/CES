Ext.define('Hrd.view.position.FormData', {
    alias: 'widget.positionformdata',
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
                    name:'position_id'
                },
                {
                    fieldLabel:'Code',
                    name:'position'
                },
                {
                    fieldLabel:'Name',
                    name:'description'
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});