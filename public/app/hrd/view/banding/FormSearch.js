Ext.define('Hrd.view.banding.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.bandingformsearch',
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
                name        : 'banding',
                fieldLabel  : 'Banding'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});