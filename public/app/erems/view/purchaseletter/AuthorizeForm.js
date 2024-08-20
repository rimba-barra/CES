Ext.define('Erems.view.purchaseletter.AuthorizeForm', {
    extend: 'Erems.library.template.view.FormData',
    requires: [],
    alias: 'widget.purchaseletterauthrozieform',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyStyle: 'padding:5px 5px 0',
    initComponent: function() {
        var me = this;
        

        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [{
                    xtype:'label',
                    padding:'20px 0',
                    text:'You must login first to continue this action.'
            },{
                    fieldLabel: 'Username',
                    name: 'username',
                }, {
                    fieldLabel: 'Password',
                    inputType: 'password',
                    name: 'password',
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
                        action: 'login',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-login',
                        text: 'Login'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
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