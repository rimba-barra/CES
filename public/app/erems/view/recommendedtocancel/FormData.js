Ext.define('Erems.view.recommendedtocancel.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.recommendedtocancelformdata',
    requires: [],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
	//height: 600,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
				{
                    padding   : '10px 0 0 0',
                    layout    : 'hbox',
                    bodyStyle : 'border:0px',
                    items     : [
                        {
                            xtype      : 'xnotefieldEST',
                            fieldLabel : 'Notes Batal',
                            anchor     : '-5',
                            rows       : '9',
                            name       : 'notes_batal',
                            flex       : 1,
                            readOnly   : true
					   }
                    ]
				}
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
                action: 'cancel',
                itemId: 'btnCancel',
                padding: 5,
                width: 75,
                iconCls: 'icon-cancel',
                text: 'Close',
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

