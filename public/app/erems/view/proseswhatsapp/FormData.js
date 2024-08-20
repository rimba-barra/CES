Ext.define('Erems.view.proseswhatsapp.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.proseswhatsappformdata',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    // height: 300,
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
            },
            items: [ 
                {
                    xtype: 'hiddenfield',
                    name: 'sms_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'customer_customer_id'
                },
                {
                    xtype      : 'xphonenumberfieldEST',
                    name       : 'whatsapp_phonenumber',
                    fieldLabel : 'Phone Number',
                    keepRO     : true
                },
                {
                    xtype      : 'xnotefieldEST',
                    name       : 'notes',
                    fieldLabel : 'Pesan',
                    keepRO     : true,
                    flex       : '1',
                    anchor     : '-5',
                    height     : 175,
                    grow       : true,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

