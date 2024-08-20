Ext.define('Hrd.view.leavesubmission.Panel',{
    extend:'Hrd.library.box.view.directviewinput.Panel',
    requires:['Hrd.view.leavesubmission.Grid','Hrd.view.leavesubmission.FormSearch','Hrd.view.leavesubmission.FormData'],
    alias:'widget.leavesubmissionpanel',
    itemId:'LeavesubmissionPanel',
    gridPanelName:'leavesubmissiongrid',
    formSearchPanelName:'leavesubmissionformsearch',
    formDataName:'leavesubmissionformdata',
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
                    width:400
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
                            width:'100%',
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