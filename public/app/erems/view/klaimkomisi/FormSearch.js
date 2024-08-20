Ext.define('Erems.view.klaimkomisi.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.klaimkomisiformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
           
            items: [
                
                {
                    xtype: 'textfield',
                    name: 'nomor_pengajuan',
                    fieldLabel: 'Nomor Pengajuan',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    name: 'nomor_invoice_agent',
                    fieldLabel: 'Nomor Invoice Agent',
                    enableKeyEvents: true
                },
               
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
