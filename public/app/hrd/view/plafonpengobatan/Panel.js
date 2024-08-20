Ext.define('Hrd.view.plafonpengobatan.Panel',{
    extend:'Hrd.library.box.view.directviewinput.Panel',
    requires:['Hrd.view.plafonpengobatan.Grid','Hrd.view.plafonpengobatan.FormSearch','Hrd.view.plafonpengobatan.FormData'],
    alias:'widget.plafonpengobatanpanel',
    itemId:'PlafonpengobatanPanel',
    gridPanelName:'plafonpengobatangrid',
    formSearchPanelName:'plafonpengobatanformsearch',
    formDataName:'plafonpengobatanformdata',
    formDataWidth: '100%',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            autoScroll: true,
            items: [
                {
                    // xtype:'panel',
                    //html:'hello'
                    xtype: me.gridPanelName,
                    region: 'west',
                    width: 700
                },
                {
                    xtype: 'panel',
                    region: 'center',
                    items: [
                        {
                            xtype: me.formSearchPanelName,
                            region: 'north',
                            split: true,
                        },
                        {
                            xtype: me.formDataName,
                            region: 'south',
                            width: me.formDataWidth
                        }

                    ]
                }

            ]
        });

        me.callParent(arguments);
    }
    
});