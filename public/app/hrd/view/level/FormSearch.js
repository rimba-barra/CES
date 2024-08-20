Ext.define('Hrd.view.level.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.levelformsearch',
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