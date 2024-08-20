Ext.define('Hrd.view.matrixcompetency.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.matrixcompetencyformsearch',
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
            //     name        : 'matrixcompetency_item',
            //     fieldLabel  : 'Key Behaviour'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});