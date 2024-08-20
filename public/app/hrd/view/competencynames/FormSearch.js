Ext.define('Hrd.view.competencynames.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.competencynamesformsearch',
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
            // }, {
            //     name        : 'level_item',
            //     fieldLabel  : 'Key Behaviour'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});