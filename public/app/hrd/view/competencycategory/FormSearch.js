Ext.define('Hrd.view.competencycategory.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.competencycategoryformsearch',
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
                name        : 'competency_category',
                fieldLabel  : 'Competency Category'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});