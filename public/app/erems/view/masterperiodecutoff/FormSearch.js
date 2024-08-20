Ext.define('Erems.view.masterperiodecutoff.FormSearch',{
    extend        :'Erems.library.template.view.FormSearch',
    requires      :[],
    alias         :'widget.masterperiodecutoffformsearch',
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype      : 'xnumericfieldEST',
                    name       : 'periode',
                    fieldLabel : 'Periode',
                    maxLength  : 4,
                    anchor     : '-15',
                    fieldStyle : 'width:60px !important;'
                }
            ],
            dockedItems : me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
