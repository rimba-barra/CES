Ext.define('Hrd.view.mastersk.FormBrowse', {
    alias: 'widget.masterskformbrowse',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.mastersk.GridBrowse'],
    frame: true,
    autoScroll: true,
    height: 400,
    deletedData: {},
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mastersk_id'
                },
                {
                    xtype: 'label',
                    forId: 'lblimportgolongan',
                    text: 'Select for copy  data',
                },
                {
                    xtype: 'splitter',
                    width: '5'
                },
                {
                    xtype: 'masterskgridbrowse',
                    title: 'DATA mastersk (GOLONGAN)',
                    name: 'gridbrowsemastersk',
                    height: 300,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        itemId: 'btnProcess',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                ]
            }
        ];
        return x;
    },
});