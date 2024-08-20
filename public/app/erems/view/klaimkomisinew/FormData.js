Ext.define('Erems.view.klaimkomisinew.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.klaimkomisinewformdata',
    requires: [
		'Erems.library.template.component.Berkascombobox',
		'Erems.library.template.component.Statusberkascombobox'
	],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
//    height: 600,
    width: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'purchaseletter_id',
                    name: 'purchaseletter_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'pricetype_id',
                    name: 'pricetype_id'
                },
                {xtype: 'label', text: 'Proses Komisi?', flex: 1}
				
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'proseskomisi',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Proses'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
    
});

