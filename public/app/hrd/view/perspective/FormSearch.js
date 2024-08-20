Ext.define('Hrd.view.perspective.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.perspectiveformsearch',
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
                name        : 'perspective',
                fieldLabel  : 'Perspective'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});