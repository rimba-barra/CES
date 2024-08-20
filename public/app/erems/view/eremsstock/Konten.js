Ext.define('Erems.view.eremsstock.Konten', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.eremsstockkonten',
    
//    requires: ['Erems.template.ComboBoxFields','Erems.view.townplanning.GridUnitHistory'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 0,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    editedRow: -1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                 
                {
                    xtype:'container',
                    html: '<div class="content_data" style=""> </div>',
                    height:'100%'
                },
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    
     generateDockedItem: function() {
        var x = '';
//                [
//        {
//            xtype: 'toolbar',
//            dock: 'bottom',
//            ui: 'footer',
//            layout: {
//                padding: 6,
//                type: 'hbox'
//            },
//            items: [
//            {
//                xtype: 'button',
//                action: 'save',
//                itemId: 'btnSave',
//                padding: 5,
//                width: 75,
//                iconCls: 'icon-save',
//                text: 'Save'
//            },
//            {
//                xtype: 'button',
//                action: 'cancel',
//                itemId: 'btnCancel',
//                padding: 5,
//                width: 75,
//                iconCls: 'icon-cancel',
//                text: 'Cancel',
//                handler: function() {
//                    this.up('window').close();
//                }
//            }
//            ]
//        }
//        ];
        return x;
    },
    
});

