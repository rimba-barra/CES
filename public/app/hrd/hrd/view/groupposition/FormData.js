Ext.define('Hrd.view.groupposition.FormData', {
    alias: 'widget.grouppositionformdata',
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
                    name:'groupposition_id'
                },
                
                {
                    fieldLabel:'Code',
                    name:'code'
                },
                {
                    fieldLabel:'Group Position Name',
                    name:'groupposition'
                },
                {
                    fieldLabel:'Description',
                    name:'description'
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});