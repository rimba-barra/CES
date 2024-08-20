Ext.define('Erems.view.openticket.Iframe',{
    extend: 'Erems.library.template.view.FormData',
    alias:'widget.openticketiframe',
    bindPrefixName:'Openticket',
   // itemId:'',
    newButtonLabel:'New Ticket',
    initComponent: function() {
        var me = this;


        me.callParent(arguments);
    }
});


