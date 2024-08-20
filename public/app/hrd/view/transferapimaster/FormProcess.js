Ext.define('Hrd.view.transferapimaster.FormProcess', {
    alias: 'widget.transferapimasterformprocess',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.transferapimaster.GridProcess','Hrd.view.transferapimaster.GridProcessBanding','Hrd.view.transferapimaster.GridProcessGroup','Hrd.view.transferapimaster.GridProcessJobFamily','Hrd.view.transferapimaster.GridProcessPosition','Hrd.view.transferapimaster.GridProcessEmployee'],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    // height: 500,
    // layout: 'fit',
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype: 'tabpanel',
                    itemId: 'tabID',
                    width: '100%',
                    activeTab: 0, // index or id
                    items: [
                        {
                            title: 'Employee',
                            itemId: 'pEmployeeTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapimasterprocessemployeegrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        {
                            title: 'Master - Department',
                            itemId: 'pMasterDepartmentTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapimasterprocessgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        {
                            title: 'Master - Banding',
                            itemId: 'pMasterBandingTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapimasterprocessbandinggrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        {
                            title: 'Master - Group',
                            itemId: 'pMasterGroupTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapimasterprocessgroupgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        // {
                        //     title: 'Master - JobFamily',
                        //     itemId: 'pMasterJobFamilyTabID',
                        //     margin: 10,
                        //     layout: 'vbox',
                        //     width: '100%',
                        //     items: [
                        //         {
                        //             xtype: 'transferapimasterprocessjobfamilygrid',
                        //             height: 380,
                        //             width: '100%',
                        //             style: 'padding: 10 0 10 0'

                        //         },
                        //     ]
                        // },
                        {
                            title: 'Master - Position',
                            itemId: 'pMasterPositionTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapimasterprocesspositiongrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                    ]
                },
                {
                    xtype:'hiddenfield',
                    fieldLabel:'Process API',
                    name:'process_api'
                },
                {
                    xtype:'hiddenfield',
                    fieldLabel:'Process API Model',
                    name:'process_api_model'
                },
                {
                    xtype:'hiddenfield',
                    fieldLabel:'Log Process Id',
                    name:'process_log_process_id'
                },
            ],
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
                        action: 'process_cherry',
                        padding: 5,
                        iconCls: 'icon-save',
                        text: 'Process to Cherry'
                    },
                    {
                        xtype: 'button',
                        action: 'download_log',
                        padding: 5,
                        iconCls: 'icon-save',
                        text: 'Download Log'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
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