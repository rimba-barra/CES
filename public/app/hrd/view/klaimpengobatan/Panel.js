Ext.define('Hrd.view.klaimpengobatan.Panel',{
    extend:'Hrd.library.box.view.directviewinput.Panel',
    requires:['Hrd.view.klaimpengobatan.Grid','Hrd.view.klaimpengobatan.FormSearch','Hrd.view.klaimpengobatan.FormData'],
    alias:'widget.klaimpengobatanpanel',
    itemId:'KlaimpengobatanPanel',
    gridPanelName:'klaimpengobatangrid',
    formSearchPanelName:'klaimpengobatanformsearch',
    formDataName:'klaimpengobatanformdata',
    formDataWidth:'100%',
    fsCollapsed:false,
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
                    width: 625
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