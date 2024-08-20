Ext.define('Hrd.view.plafonkaryawan.Panel',{
    extend:'Hrd.library.box.view.directviewinput.Panel',
    requires:['Hrd.view.plafonkaryawan.Grid','Hrd.view.plafonkaryawan.FormSearch','Hrd.view.plafonkaryawan.FormData'],
    alias:'widget.plafonkaryawanpanel',
    itemId:'PlafonkaryawanPanel',
    gridPanelName:'plafonkaryawangrid',
    formSearchPanelName:'plafonkaryawanformsearch',
    formDataName:'plafonkaryawanformdata',
    formDataWidth:'100%',
     fsCollapsed:false,
     initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    // xtype:'panel',
                    //html:'hello'
                    xtype: me.gridPanelName,
                    region: 'west',
                    width:360
                },
                {
                    xtype: 'panel',
                    region:'center',
                    autoScroll:true,
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