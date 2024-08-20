Ext.define('Hrd.view.grouppayroll.FormData', {
    alias: 'widget.grouppayrollformdata',
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
                    name:'grouppayroll_id'
                },
                {
                    fieldLabel:'Group Payroll Name',
                    name:'grouppayroll'
                },
                {
                    fieldLabel:'Code',
                    name:'code'
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