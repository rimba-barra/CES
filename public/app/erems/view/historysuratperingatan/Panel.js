Ext.define('Erems.view.historysuratperingatan.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.historysuratperingatan.Grid', 'Erems.view.historysuratperingatan.FormSearch', 'Erems.view.historysuratperingatan.GridSpr'],
    alias: 'widget.historysuratperingatanpanel',
    itemId: 'SuratperingatanPanel',
    gridPanelName: 'historysuratperingatangrid',
    formSearchPanelName: 'historysuratperingatanformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {

                    xtype: me.formSearchPanelName,
                    region: 'west',
                    split: true,
                    maxWidth: 500,
                    minWidth: 300,
                    width: 300,
                    collapsed: true,
                    collapsible: true,
                    iconCls: 'icon-search',
                    title: 'Search'
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    region: 'center',
                    height: '100%',
                    flex: 1,
                    items: [
                        {
                            xtype: 'fieldset',
                            width: '100%',
                            flex: 1,
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: me.gridPanelName,
                                    height: '100%',
                                    flex: 1
                                },

                            ]
                        },

                        {
                            xtype: 'fieldset',
                            flex: 1,
                            width: '100%',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'historysuratperingatangridspr',
                                    height: '100%',
                                    flex: 1,
                                    itemId: 'schedulepaymentgrid'
                                }
                            ]
                        }
                    ]
                }
                //               
            ]
        });

        me.callParent(arguments);
    }
});
