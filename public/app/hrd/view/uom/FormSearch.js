Ext.define('Hrd.view.uom.FormSearch', {
    extend          : 'Hrd.library.box.view.FormSearch',
    alias           : 'widget.uomformsearch',
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
                name        : 'uom',
                fieldLabel  : 'Uom'
            }],

            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});