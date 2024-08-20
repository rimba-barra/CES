Ext.define('Hrd.view.prosesgaji.FormGenerate', {
    alias: 'widget.prosesgajiformgenerate',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                   xtype:'container',
                   layout:'hbox',
                   items:[
                       {
                           xtype:'textfield',
                           fieldLabel:'Date/Year',
                           name:'date'
                       },{
                           xtype:'label',
                           padding:'0px 0px 0px 10px',
                           text:''
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
                        action: 'continue',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                       // iconCls: 'icon-save',
                        text: 'Continue'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                       // iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});