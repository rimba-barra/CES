Ext.define('Hrd.view.jobfamily.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.jobfamilyformsearch',
    requires        : [],
    initComponent   : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults    : {
                xtype       : 'textfield'
            },
            items       : [{
                name        : 'code',
                fieldLabel  : 'Code'
            }, {
                name        : 'jobfamily',
                fieldLabel  : 'Job Family'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});