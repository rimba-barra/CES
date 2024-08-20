Ext.define('Hrd.view.transferapitransaction.FormProcess', {
    alias: 'widget.transferapitransactionformprocess',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.transferapitransaction.GridProcess','Hrd.view.transferapitransaction.GridProcessCutiBesar','Hrd.view.transferapitransaction.GridProcessMedicalClaim','Hrd.view.transferapitransaction.GridProcessOvertime','Hrd.view.transferapitransaction.GridProcessUangMakan','Hrd.view.transferapitransaction.GridProcessUnpaidLeave','Hrd.view.transferapitransaction.GridProcessSaldoCutiBayar','Hrd.view.transferapitransaction.GridProcessPotonganTransport','Hrd.view.transferapitransaction.GridProcessSaldoCutiMinus'],
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
                            title: 'Attendance',
                            itemId: 'pAttendanceTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocessgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Overtime',
                            itemId: 'pOvertimeTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocessovertimegrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Uang Makan Lembur',
                            itemId: 'pUangMakanTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocessuangmakangrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Medical Claim',
                            itemId: 'pMedicalClaimTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocessmedicalclaimgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Unpaid Leave',
                            itemId: 'pUnpaidLeaveTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocessunpaidleavegrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Cuti Besar',
                            itemId: 'pCutiBesarTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocesscutibesargrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Saldo Cuti Dibayarkan',
                            itemId: 'pSaldoCutiBayarTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocesssaldocutibayargrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Potongan Transport',
                            itemId: 'pPotonganTransportTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocesspotongantransportgrid',
                                    height: 380,
                                    width: '100%',
                                    style: 'padding: 10 0 10 0'

                                },
                            ]
                        },

                        {
                            title: 'Saldo Cuti Minus',
                            itemId: 'pSaldoCutiMinusTabID',
                            margin: 10,
                            layout: 'vbox',
                            width: '100%',
                            items: [
                                {
                                    xtype: 'transferapitransactionprocesssaldocutiminusgrid',
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
                        action: 'update_hcms',
                        padding: 5,
                        iconCls: 'icon-save',
                        text: 'Update HCMS'
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