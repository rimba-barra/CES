Ext.define('Cashier.library.template.view.FormSearchBrowseCashier', {
    extend: 'Ext.form.Panel',
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    region: 'west',
    split: true,
    maxWidth: 250,
    minWidth: 250,
    width: 250,
    collapsed: false,
    collapsible: true,
    iconCls: 'icon-search',
    title: 'Search',
    id: 'MySuperBrowseWindow',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    generateDefaults: function() {
        var def = {
            labelAlign: 'top',
            labelSeparator: ' ',
            labelClsExtra: 'small',
            fieldStyle: 'margin-bottom:3px;',
            anchor: '100%'
        }
        return def;
    },
    generateDockedItems: function() {
        var dockedItems = [
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
                        action: 'search',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Search',
                        handler: function() {
                            this.up('form').doSearch(this);
                            
                        }
                    },
                   
                     {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return dockedItems;
    },
    doSearch: function(el) {
        var g = el.up('window').down('grid');
        var s = g.getStore();
        var fields = el.up('form').getForm().getFieldValues();
        for (var x in fields) {
            s.getProxy().setExtraParam(x, fields[x]);
        }
        console.log(s.storeId);
        if(s.storeId=='IDselectedAngsuranStore'){
            
            g.down("toolbar [name=temppayval]").setValue("0");
        }
        s.loadPage(1);
    }
});
