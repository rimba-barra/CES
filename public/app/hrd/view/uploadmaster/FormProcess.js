Ext.define('Hrd.view.uploadmaster.FormProcess', {
    alias: 'widget.uploadmasterformprocess',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.uploadmaster.GridProcess','Hrd.view.uploadmaster.GridProcessBanding','Hrd.view.uploadmaster.GridProcessGroup','Hrd.view.uploadmaster.GridProcessJobFamily','Hrd.view.uploadmaster.GridProcessPosition','Hrd.view.uploadmaster.GridProcessEmployee','Hrd.view.uploadmaster.GridProcessCareerTransition'],
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
                                    xtype: 'uploadmasterprocessemployeegrid',
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
                                    xtype: 'uploadmasterprocessgrid',
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
                                    xtype: 'uploadmasterprocessbandinggrid',
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
                                    xtype: 'uploadmasterprocessgroupgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        {
                            title: 'Master - JobFamily',
                            itemId: 'pMasterJobFamilyTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadmasterprocessjobfamilygrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        {
                            title: 'Master - Position',
                            itemId: 'pMasterPositionTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadmasterprocesspositiongrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                        {
                            title: 'Career Transition',
                            itemId: 'pCareerTransitionTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'uploadmasterprocesscareertransitiongrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },
                    ]
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
                        disabled: true,
                        padding: 5,
                        iconCls: 'icon-save',
                        text: 'Process to Cherry'
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