Ext.define('Hrd.view.group.FormBrowse', {
    alias: 'widget.groupformbrowse',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.group.GridBrowse'],
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
                    name: 'group_id'
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
                    xtype: 'groupgridbrowse',
                    title: 'DATA GROUP (GOLONGAN)',
                    name: 'gridbrowsegroup',
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