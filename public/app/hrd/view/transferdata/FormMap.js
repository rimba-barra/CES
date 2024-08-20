Ext.define('Hrd.view.transferdata.FormMap', {
    alias: 'widget.transferdataformmap',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.transferdata.GridMap'],
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;



        Ext.applyIf(me, {
            items: [
                {
                   xtype:'hiddenfield',
                   name:'file_name'
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'transferdatagridmap',
                            height: 300,
                            width:'100%',
                            flex: 1
                        },
                        {
                            xtype:'fieldset',
                            margin:'10 0 0 0',
                            title:'',
                            layout:'hbox',
                            items:[
                                {
                                    xtype:'textfield',
                                    name:'periodebase',
                                    margin:'0 5 0 0'
                                },
                                {
                                    xtype:'button',
                                    action:'set_all',
                                    text:'SET ALL PERIODE'
                                }
                            ]
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
                        action: 'process',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
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
    }
});