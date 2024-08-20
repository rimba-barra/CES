Ext.define('Hrd.view.perspectivepercentage.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.perspectivepercentageformsearch',
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
            //     name        : 'perspectivepercentage_item',
            //     fieldLabel  : 'Key Behaviour'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});