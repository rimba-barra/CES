Ext.define('Erems.view.purchaseletterNew.RescheduleListForm', {
    extend: 'Erems.library.template.view.FormData',
    requires: ['Erems.view.purchaseletterNew.Reschedulegrid'],
    alias: 'widget.purchaseletterNewrschlistform',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_purchaseletter_id'
                },
                {
                    xtype:'purchaseletterNewreschedulegrid',
                    height:300
            }],
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
                        padding: 5,
                        width: 75,
                      //  iconCls: 'icon-cancel',
                        text: 'OK',
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