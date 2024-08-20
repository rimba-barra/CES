Ext.define('Hrd.view.levelcategory.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.levelcategoryformsearch',
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
                name        : 'level_category',
                fieldLabel  : 'Competency Level'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});