Ext.define('Hrd.view.competency.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.competencyformsearch',
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
                name        : 'competency',
                fieldLabel  : 'Competency'
            }, {
                name        : 'competency_category_id',
                fieldLabel  : 'Competency Category'
            }, {
                name        : 'jobfamily_id',
                fieldLabel  : 'Job Family'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});