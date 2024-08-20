Ext.define('Hrd.view.absentrecord.FormToolTransfer', {
    alias: 'widget.absentrecordformtooltransfer',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                  xtype:'container',
                  layout:'hbox',
                 
                  defaults:{
                      xtype:'datefield',
                      labelWidth:50,
                      format:'d/m/Y',
                      flex:1
                  },
                  items:[
                    {
                        fieldLabel:'From',
                        name:'start_day',
                        value:new Date()
                    },
                    {
                        fieldLabel:'To',
                        name:'end_day',
                        labelWidth:20,
                        margin:'0 0 0 20px',
                        value:new Date()
                    }
                  ]
                  
                },
                {
                    xtype: 'checkbox',
                    name:'delete',
                    inputValue: '1',
                    boxLabel: 'Delete temporary absent'
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